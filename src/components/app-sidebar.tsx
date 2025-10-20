/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Bold, PanelRightClose } from "lucide-react";
import * as React from "react";

import { CircularProgress } from "@/app/(protected)/onboarding/components/circular-progress";
import { SearchCommand } from "@/app/(protected)/onboarding/components/search-command";
import UploadDocumentsDialog from "@/app/components/upload-documents-dialog";
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
import { ColorFilterIcon } from "@/icons/color-filter-icon";
import { EditIcon } from "@/icons/edit-icon";
import { FlagIcon } from "@/icons/flag-icon";
import { FoldersIcon } from "@/icons/folders-icon";
import { MessageIcon } from "@/icons/message-icon";
import { ReceiptIcon } from "@/icons/receipt-icon";
import { Settings2Icon } from "@/icons/settings2-icon";
import SuccessIcon from "@/icons/success-icon";
import { cn } from "@/lib/utils";
import { useOnboardingStore } from "@/stores/onboarding.store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "./brand-logo";
import { PinnedChat } from "./pinned-chat";
import { H1 } from "./typography/h1";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";
import useRole from "@/hooks/use-role";
import { useAuthGlobal } from "@/stores/auth-global.store";
import { DashboardRoundedIcon } from "@/icons/dashboard-rounded-icon";

export type NavMenu = {
  title?: string;
  name?: string;
  url: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
  isActive: boolean;
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { toggleSidebar, state } = useSidebar();
  const isClient = useIsClient();
  const { progress } = useOnboardingStore();
  const pathname = usePathname();
  const { isClientUser, loading, isSuperadmin } = useRole();
  const {
    isOpen: isOpenUploadDocs,
    closeModal: closeModalUploadDocs,
    openModal: openModalUploadDocs,
    setIsOpen: setIsOpenUploadDocs
  } = useModal();
  const {
    isOpen: isOpenUploadSuccess,
    closeModal: closeModalUploadSuccess,
    openModal: openModalUploadSuccess,
    setIsOpen: setIsOpenUploadSuccess
  } = useModal();

  const getIsActive = (url: string, exact = false) => {
    if (exact) return pathname === url;
    return pathname.includes(url);
  };

  const data: {
    navSecondary: NavMenu[];
    navMenus: NavMenu[];
  } = {
    navSecondary: [
      ...(!isClientUser
        ? [
            {
              title: "Report",
              url: "/report",
              icon: FlagIcon,
              isActive: getIsActive("/report")
            }
          ]
        : []),
      {
        title: "Settings",
        url: "/settings/general",
        icon: Settings2Icon,
        isActive: getIsActive("/settings")
      }
    ],
    navMenus: [
      ...(!isClientUser
        ? [
            {
              name: "Chat AI",
              url: "/chat",
              icon: MessageIcon,
              isActive: getIsActive("/chat")
            }
          ]
        : []),
      ...(!isClientUser
        ? [
            {
              name: "Draft",
              url: "/draft",
              icon: EditIcon,
              isActive: getIsActive("/draft")
            }
          ]
        : []),
      ...(!isClientUser
        ? [
            {
              name: "My Plan",
              url: "/my-plan",
              icon: ReceiptIcon,
              isActive: getIsActive("/my-plan")
            }
          ]
        : [
            {
              name: "My Brand Plan",
              url: "/my-plan",
              icon: ReceiptIcon,
              isActive: getIsActive("/my-plan")
            }
          ]),
      ...(isClientUser
        ? [
            {
              name: "My Brand Command",
              url: "/my-brand-command",
              icon: ReceiptIcon,
              isActive: getIsActive("/my-brand-command")
            }
          ]
        : []),
      {
        name: "Resources",
        url: "/resources",
        icon: FoldersIcon,
        isActive: getIsActive("/resources")
      }
    ]
  };

  const isCollapsed = state === "collapsed";
  const isShowOnboardingProgress = false;

  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      side="left"
      className="pr-0"
      {...props}
    >
      <SidebarHeader className="py-4 px-4.5">
        <SidebarMenu>
          <SidebarMenuItem>
            <div
              className={cn("flex items-center mb-4", {
                "justify-between": !isCollapsed
              })}
            >
              <div className={cn("text-2xl", { "w-0": isCollapsed })}>
                <BrandLogo />
              </div>
              <button className="p-0 text-muted-foreground">
                <PanelRightClose
                  className="size-4.5 scale-x-[-1]"
                  onClick={toggleSidebar}
                />
              </button>
            </div>

            {/* <div className="mb-2.5">
              <SearchCommand />
            </div> */}
          </SidebarMenuItem>
        </SidebarMenu>
        <Separator className="px-4 bg-muted" />
      </SidebarHeader>

      <SidebarContent>
        {!loading ? (
          <NavMenus menus={data.navMenus} />
        ) : (
          <div className="px-4 space-y-2">
            <Skeleton className="w-full h-8" />
            <Skeleton className="w-full h-8" />
            <Skeleton className="w-full h-8" />
            <Skeleton className="w-full h-8" />
          </div>
        )}

        {!isClientUser && !loading && <PinnedChat />}

        {!loading ? (
          <NavSecondary items={data.navSecondary} />
        ) : (
          <div className="px-4 space-y-2 mt-auto">
            <Skeleton className="w-full h-8" />
            <Skeleton className="w-full h-8" />
          </div>
        )}
      </SidebarContent>

      <SidebarFooter className={cn("gap-4 px-4", { "px-2": isCollapsed })}>
        <Separator className="px-4 bg-muted" />

        {/* <Button size={isCollapsed ? "icon" : "sm"}>
          <ColorFilterIcon className="size-3.5" />{" "}
          <span className={cn("hidden", { "inline-block": !isCollapsed })}>
            My Brand
          </span>
        </Button> */}

        {isSuperadmin && (
          <Button size={isCollapsed ? "icon" : "sm"} asChild>
            <Link href={"/admin-panel"}>
              <DashboardRoundedIcon className="size-3.5" />{" "}
              <span className={cn("hidden", { "inline-block": !isCollapsed })}>
                Admin Panel
              </span>
            </Link>
          </Button>
        )}

        {/* <Button
          size={isCollapsed ? "icon" : "sm"}
          variant="outline"
          onClick={openModalUploadDocs}
        >
          <UploadIcon className="size-3.5" />{" "}
          <span className={cn("hidden", { "inline-block": !isCollapsed })}>
            Uploaded docs
          </span>
        </Button> */}

        {isShowOnboardingProgress && (
          <>
            {isCollapsed ? (
              <div>
                {isClient ? (
                  <CircularProgress showValue size={37} value={90} />
                ) : (
                  <Skeleton className="w-9 h-9 rounded-full" />
                )}
              </div>
            ) : (
              <div className="rounded-md border p-2.5 space-y-2">
                <div className="flex gap-2 justify-between">
                  <p className="font-medium text-muted-foreground text-[11px]">
                    My Brand Completion
                  </p>
                  <div className="font-semibold text-[11px]">90%</div>
                </div>

                {isClient ? (
                  <Progress
                    value={progress}
                    className="w-full bg-[#DEDEDE] h-2"
                  />
                ) : (
                  <Skeleton className="w-full h-2 rounded-full" />
                )}

                <Link
                  href="/onboarding/step-1"
                  className="uppercase text-[10px] font-bold text-primary underline"
                >
                  go to my brand question
                </Link>
              </div>
            )}
          </>
        )}

        <NavUser />

        <UploadDocumentsDialog
          isOpen={isOpenUploadDocs}
          setIsOpen={setIsOpenUploadDocs}
          closeModal={closeModalUploadDocs}
          onSuccess={() => {
            closeModalUploadDocs();
            openModalUploadSuccess();
          }}
        />

        <AlertDialog
          open={isOpenUploadSuccess}
          onOpenChange={setIsOpenUploadSuccess}
        >
          <AlertDialogContent className="sm:max-w-[440px] gap-0">
            <AlertDialogHeader className="hidden">
              <AlertDialogTitle>Upload Form</AlertDialogTitle>
              <AlertDialogDescription>Upload form</AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex flex-col items-center p-6 text-center">
              <div className="mx-auto">
                <SuccessIcon />
              </div>

              <div className="mt-4">
                <H1>Upload successful!</H1>
                <p className="mt-2 font-medium leading-[150%] px-4.5">
                  This document is now available for Brandiie to use in crafting
                  your content. We’ll make sure to integrate this information to
                  better reflect your brand’s.
                </p>
              </div>
            </div>

            <div className="py-4 px-6 flex justify-between gap-2.5 border-t">
              <Button variant="outline" onClick={closeModalUploadSuccess}>
                Back to Main
              </Button>
              <Button
                variant="default"
                onClick={() => {
                  closeModalUploadSuccess();
                  openModalUploadDocs();
                }}
              >
                Upload More
              </Button>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </SidebarFooter>
    </Sidebar>
  );
}
