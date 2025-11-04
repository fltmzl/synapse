"use client";

import { PanelRightClose } from "lucide-react";
import * as React from "react";

import { NavMenus } from "@/components/nav-menus";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar";
import useIsClient from "@/hooks/use-is-client";
import useModal from "@/hooks/use-modal";
import { DashboardRoundedIcon } from "@/icons/dashboard-rounded-icon";
import { EditIcon } from "@/icons/edit-icon";
import { FlagIcon } from "@/icons/flag-icon";
import { FoldersIcon } from "@/icons/folders-icon";
import { MessageIcon } from "@/icons/message-icon";
import { ReceiptIcon } from "@/icons/receipt-icon";
import { Settings2Icon } from "@/icons/settings2-icon";
import SuccessIcon from "@/icons/success-icon";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "./brand-logo";
import { PinnedChat } from "./pinned-chat";
import { H1 } from "./typography/h1";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";

export type NavMenu = {
  title?: string;
  name?: string;
  url: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
  isActive: boolean;
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { toggleSidebar, state } = useSidebar();

  // const getIsActive = (url: string, exact = false) => {
  //   if (exact) return pathname === url;
  //   return pathname.includes(url);
  // };

  const data = [];

  const isCollapsed = state === "collapsed";

  return null;
}
