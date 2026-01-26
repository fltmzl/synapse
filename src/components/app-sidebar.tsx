"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  LayoutDashboard,
  Settings,
  Users,
  FileText,
  BarChart3,
  Package,
  ShoppingCart,
  Inbox,
  UserCircle,
  Bell,
  HelpCircle,
  Shield,
  Database,
  Ticket,
  PanelLeft,
  Video,
  Building2,
  GraduationCap,
  Flag
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarTrigger,
  SidebarRail,
  useSidebar
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import BrandLogo from "./brand-logo";

export type NavMenu = {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  items: { title: string; url: string }[];
};

// Define menu structure with submenus
const menuItems: NavMenu[] = [
  {
    title: "Top of the day",
    url: "/dashboard/admin-panel/article",
    icon: FileText,
    items: []
  },
  {
    title: "Latest Publication",
    url: "/dashboard/admin-panel/article/latest-publication",
    icon: FileText,
    items: []
  },
  {
    title: "News",
    url: "/dashboard/admin-panel/article/news",
    icon: FileText,
    items: []
  },
  {
    title: "Business Corner",
    url: "/dashboard/admin-panel/article/business-corner",
    icon: FileText,
    items: []
  },
  {
    title: "Video Reels",
    url: "/dashboard/admin-panel/video-reels",
    icon: Video,
    items: []
  },
  {
    title: "Persons",
    url: "/dashboard/admin-panel/persons",
    icon: Users,
    items: []
  },
  {
    title: "Companies",
    url: "/dashboard/admin-panel/companies",
    icon: Building2,
    items: []
  },
  {
    title: "Educations",
    url: "/dashboard/admin-panel/educations",
    icon: GraduationCap,
    items: []
  },
  {
    title: "Political Parties",
    url: "/dashboard/admin-panel/political-parties",
    icon: Flag,
    items: []
  },
  {
    title: "Associations",
    url: "/dashboard/admin-panel/associations",
    icon: Users,
    items: []
  }
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { state } = useSidebar();

  // Check if a menu item or its submenu is active
  const isMenuActive = (item: (typeof menuItems)[0]) => {
    // Exact match for Dashboard menu only
    if (item.url === "/dashboard") {
      return pathname === "/dashboard";
    }

    // Check if any submenu is active (exact match)
    if (item.items.length > 0) {
      if (item.items.some((subItem) => pathname === subItem.url)) return true;
    }

    // For other menus, check exact match first
    if (pathname === item.url) return true;

    // Check if pathname starts with the menu url (for nested routes)
    if (pathname.startsWith(item.url + "/")) {
      const otherMatches = menuItems.filter(
        (mi) =>
          mi.url !== item.url &&
          pathname.startsWith(mi.url) &&
          mi.url.length > item.url.length
      );
      return otherMatches.length === 0;
    }

    return false;
  };

  // Check if submenu item is active
  const isSubMenuActive = (url: string) => {
    return pathname === url;
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2">
              <SidebarMenuButton
                size="lg"
                asChild
                className={cn("flex-1", { hidden: state === "collapsed" })}
              >
                <Link href="/dashboard">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <LayoutDashboard className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Synapse</span>
                    <span className="truncate text-xs text-muted-foreground">
                      Admin Dashboard
                    </span>
                  </div>
                </Link>
              </SidebarMenuButton>
              <SidebarTrigger className="ml-auto" />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider">
            Content Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = isMenuActive(item);
                const hasSubmenu = item.items.length > 0;

                return (
                  <SidebarMenuItem key={item.title}>
                    {hasSubmenu ? (
                      <Collapsible
                        defaultOpen={isActive}
                        className="group/collapsible"
                      >
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            tooltip={item.title}
                            isActive={isActive}
                          >
                            <item.icon className="size-4" />
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((subItem) => {
                              const isSubActive = isSubMenuActive(subItem.url);
                              return (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton
                                    asChild
                                    isActive={isSubActive}
                                  >
                                    <Link href={subItem.url}>
                                      <span>{subItem.title}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              );
                            })}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        isActive={isActive}
                      >
                        <Link href={item.url}>
                          <item.icon className="size-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Profile"
              size="lg"
              isActive={pathname === "/dashboard/profile"}
              className={cn(
                "transition-all duration-200",
                pathname === "/dashboard/profile" &&
                  "bg-primary/10 text-primary font-semibold"
              )}
            >
              <Link href="/dashboard/profile" className="flex gap-5">
                <UserCircle
                  className={cn("size-5", {
                    "mx-auto": state === "collapsed"
                  })}
                />
                <div
                  className={cn("flex flex-col gap-0.5 leading-none", {
                    hidden: state === "collapsed"
                  })}
                >
                  <span className="font-semibold">Admin User</span>
                  <span className="text-xs text-muted-foreground">
                    admin@synapse.com
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
