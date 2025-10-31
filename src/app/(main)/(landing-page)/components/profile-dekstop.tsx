"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import useModal from "@/hooks/use-modal";
import { LogoutIcon } from "@/icons/logout-icon";
import { SettingsIcon } from "lucide-react";
import ProfileDialog from "./dialog/profile-dialog";

type Props = {
  image: string;
  username: string;
};

export default function ProfileDekstop({ image, username }: Props) {
  const { isOpen, openModal, setIsOpen } = useModal(false);

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

      {isOpen && <ProfileDialog isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
}
