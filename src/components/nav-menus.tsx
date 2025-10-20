"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { NavMenu } from "./app-sidebar";

export function NavMenus({ menus, ...props }: { menus: NavMenu[] }) {
  const { state } = useSidebar();

  return (
    <SidebarGroup
      className={cn("pt-0", {
        "pl-4 px-4": state === "expanded"
      })}
      {...props}
    >
      <SidebarGroupLabel className="text-[#868C98B2] text-[10px] font-semibold p-0 tracking-wider">
        MAIN MENU
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {menus.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                className={cn(
                  "text-muted-foreground text-sm font-semibold px-2.5",
                  {
                    "bg-secondary-light text-primary": item.isActive
                  }
                )}
                asChild
              >
                <Link href={item.url}>
                  <div className="text-lg">
                    <item.icon />
                  </div>
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
