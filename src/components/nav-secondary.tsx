import * as React from "react";

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

export function NavSecondary({
  items,
  ...props
}: {
  items: NavMenu[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const { state } = useSidebar();

  return (
    <SidebarGroup
      className={cn("pt-0 pb-0 mt-auto", {
        "pl-4 px-4": state === "expanded"
      })}
      {...props}
    >
      <SidebarGroupLabel className="text-[#868C98B2] text-[10px] font-semibold p-0 tracking-wider">
        OTHER
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                className={cn(
                  "text-muted-foreground text-sm font-semibold px-2.5"
                )}
                asChild
              >
                <Link href={item.url}>
                  <div className="text-lg">
                    <item.icon />
                  </div>
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
