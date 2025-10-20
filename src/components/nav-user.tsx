"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar";
import { auth } from "@/firebase/config";
import useSubscribe from "@/hooks/use-subscribe";
import { cn } from "@/lib/utils";
import { useAuthGlobal } from "@/stores/auth-global.store";
import { signOut } from "firebase/auth";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";

export function NavUser() {
  const router = useRouter();
  const { user, loading } = useAuthGlobal();
  const { state, isMobile } = useSidebar();
  const { getSubsribePlan } = useSubscribe();
  const [userPlan, setUserPlan] = useState("");
  const isCollapsed = state === "collapsed";

  useEffect(() => {
    if (!user || loading) return;

    const fetchUserPlan = async () => {
      const plan = await getSubsribePlan();
      setUserPlan(plan);
    };

    fetchUserPlan();
  }, [user, loading]);

  const handleLogout = async () => {
    try {
      await signOut(auth);

      router.push("/");
    } catch (err) {
      const error = err as { message: string };

      console.log(error.message);
    }
  };

  if (loading && !user) {
    return null;
  }

  if (!user) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem
        className={cn("border border-border rounded-lg", {
          "border-none": isCollapsed
        })}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage src={user.photoURL || ""} alt="@leerob" />
                <AvatarFallback className="rounded-full">
                  {user.displayName?.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="grid gap-0.5 flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-foreground">
                  {user.displayName}
                </span>
                <span className="truncate text-[11px] font-medium text-muted-foreground">
                  {userPlan}
                </span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-36 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
