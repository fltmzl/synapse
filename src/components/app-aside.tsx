"use client";

import * as React from "react";

import {
  HistoryChatGroup,
  HistoryChatItem
} from "@/app/components/history-chat";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar
} from "@/components/ui/sidebar";
import { useListenSessions } from "@/hooks/queries/use-listen-sessions";
import useIsClient from "@/hooks/use-is-client";
import HistoryImage from "@/icons/image/history.svg";
import { PlusIcon } from "@/icons/plus-icon";
import { SearchSmIcon } from "@/icons/search-sm-icon";
import { groupSessions } from "@/lib/utils";
import { format } from "date-fns";
import { PanelRightClose } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function AppAside({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const isClient = useIsClient();
  const router = useRouter();
  const { toggleSidebar } = useSidebar("aside");
  const { sessions } = useListenSessions();

  const groupedSession = groupSessions(sessions);

  const isHistoryEmpty = !sessions.length;

  const goToChat = () => router.push("/chat");

  if (!isClient) {
    return <div className="h-full min-w-[16rem]"></div>;
  }

  return (
    <Sidebar
      sidebarType="aside"
      variant="inset"
      collapsible="offcanvas"
      side="right"
      className="pl-0 py-3 h-screen"
      {...props}
    >
      <SidebarHeader className="pt-6 lg:pt-2 px-4 gap-4">
        <div className="flex justify-between gap-4">
          <h3 className="text-base font-semibold">History Chat</h3>

          <button className="text-muted-foreground" onClick={toggleSidebar}>
            <PanelRightClose className="size-4.5" />
          </button>
        </div>

        {!isHistoryEmpty && (
          <div>
            <div className="relative">
              <SearchSmIcon className="text-muted-foreground absolute top-1/2 -translate-y-1/2 left-3" />
              <Input placeholder="Search" className="pl-9" />
            </div>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="py-4 px-4">
        {isHistoryEmpty ? (
          <div className="text-center flex flex-col items-center mt-20 px-3">
            <Image src={HistoryImage} alt="history" />
            <h3 className="text-sm font-semibold text-primary">
              There’s nothing in your history
            </h3>
            <p className="text-[11px] leading-[150%] mt-1.5">
              Your activity will show up here once you start posting, saving, or
              exploring.
            </p>

            <Button className="w-full mt-4" onClick={goToChat}>
              <PlusIcon />
              New Chat
            </Button>
          </div>
        ) : (
          <>
            {Object.entries(groupedSession).map(([label, items]) => (
              <HistoryChatGroup key={label} title={label}>
                {items.map((s) => (
                  <HistoryChatItem
                    key={s.id}
                    link={`/chat/${s.id}`}
                    title={s.title}
                    description={`${label}, ${format(
                      s.createdAt ? s.createdAt.toDate() : new Date(),
                      "hh:mm a"
                    )}`}
                  />
                ))}
              </HistoryChatGroup>
            ))}
          </>
        )}
      </SidebarContent>

      {!isHistoryEmpty && (
        <SidebarFooter className="p-4 pb-6 lg:pb-3" onClick={goToChat}>
          <Button>
            <PlusIcon />
            New Chat
          </Button>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
