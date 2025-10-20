import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar";
import { MessageCircle2Icon } from "@/icons/message-circle-2-icon";
import { PlusIcon } from "@/icons/plus-icon";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function PinnedChat() {
  const { state } = useSidebar();
  const items: { title: string; url: string }[] = [
    // {
    //   title: "Custom platform solution",
    //   url: "/"
    // },
    // {
    //   title: "Investment insights monetization ideas",
    //   url: "/"
    // },
    // {
    //   title: "Remind me of my brand values",
    //   url: "/"
    // }
  ];

  return (
    <SidebarGroup
      className={cn("pt-0 pb-0", {
        "pl-4 px-4": state === "expanded"
      })}
    >
      <SidebarGroupLabel className="text-[#868C98B2] text-[10px] font-semibold p-0 flex justify-between pr-2 tracking-wider">
        <span>PINNED CHAT</span>

        <button className="text-sm text-muted-foreground">
          <PlusIcon />
        </button>
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                className={cn("text-primary font-semibold px-2.5")}
                asChild
              >
                <Link href={item.url}>
                  <div className="text-lg">
                    <MessageCircle2Icon />
                  </div>
                  <span className="text-xs">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
