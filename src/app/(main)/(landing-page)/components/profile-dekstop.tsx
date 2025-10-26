"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import useModal from "@/hooks/use-modal";
import { LogoutIcon } from "@/icons/logout-icon";
import { SettingsIcon, XIcon } from "lucide-react";
import { useState } from "react";

type Props = {
  image: string;
  username: string;
};

export default function ProfileDekstop({ image, username }: Props) {
  const { closeModal, isOpen, openModal, setIsOpen } = useModal(true);
  const [activeMenu, setActiveMenu] = useState("profile");

  const settingMenus = [
    {
      slug: "profile",
      title: "My profile"
    },
    {
      slug: "security",
      title: "Sécurité"
    },
    {
      slug: "billing",
      title: "Offre et facturation"
    }
  ];

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="hidden md:block w-12 h-12">
            <AvatarImage src={image} alt={username} />
            <AvatarFallback>{username.charAt(0)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[146px] rounded-[4px]">
          <DropdownMenuItem className="font-medium" onClick={openModal}>
            <SettingsIcon /> Setting
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" className="font-medium">
            <LogoutIcon />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogHeader className="sr-only">
            <DialogTitle>Setting</DialogTitle>
          </DialogHeader>
          <DialogContent
            showCloseButton={false}
            className="flex flex-col lg:flex-row overflow-hidden"
          >
            <aside className="p-4">
              <div className="">
                <DialogClose>
                  <XIcon size={24} className="text-muted-foreground" />
                </DialogClose>
              </div>
              <nav className="mt-4 flex flex-row gap-2 overflow-auto hide-scrollbar w-full">
                {settingMenus.map((menu, index) => (
                  <Button
                    key={index}
                    size="md"
                    variant={
                      activeMenu === menu.slug ? "outline-gray" : "ghost"
                    }
                    className="font-normal"
                  >
                    {menu.title}
                  </Button>
                ))}
              </nav>
            </aside>
            <main>
              <h2>Mon Profil</h2>
            </main>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
