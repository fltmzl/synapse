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
import ProfileForm from "./form/profile-form";
import { cn } from "@/lib/utils";
import ChangePasswordForm from "./form/change-password-form";
import BillingForm from "./form/billing-form";

type Props = {
  image: string;
  username: string;
};

export type SettingMenuType = "profile" | "security" | "billing";

export default function ProfileDekstop({ image, username }: Props) {
  const { closeModal, isOpen, openModal, setIsOpen } = useModal(true);
  const [activeMenu, setActiveMenu] = useState<SettingMenuType>("profile");

  const settingMenus: { slug: SettingMenuType; title: string }[] = [
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

  const getActiveMenuTitle = (activeMenu: SettingMenuType) => {
    switch (activeMenu) {
      case "profile":
        return "Mon Profil";
      case "security":
        return "Changer mon mot de passe";
      case "billing":
        return "Offre et facturation";
      default:
        return "";
    }
  };

  const getActiveMenuComponent = (activeMenu: SettingMenuType) => {
    switch (activeMenu) {
      case "profile":
        return <ProfileForm />;
      case "security":
        return <ChangePasswordForm />;
      case "billing":
        return "Coming Soon";
        return <BillingForm />;
      default:
        return null;
    }
  };

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
            className="flex flex-col lg:flex-row overflow-hidden lg:max-w-[822px]"
          >
            <aside className="p-4 min-w-56">
              <div className="">
                <DialogClose>
                  <XIcon size={24} className="text-muted-foreground" />
                </DialogClose>
              </div>
              <nav className="mt-4 flex flex-row lg:flex-col gap-2 overflow-auto hide-scrollbar w-full">
                {settingMenus.map((menu, index) => (
                  <Button
                    key={index}
                    size="md"
                    variant={
                      activeMenu === menu.slug ? "outline-gray" : "ghost"
                    }
                    onClick={() => setActiveMenu(menu.slug)}
                    className={cn(
                      "font-normal md:flex md:justify-start md:px-2.5",
                      {
                        "border border-transparent": activeMenu !== menu.slug
                      }
                    )}
                  >
                    {menu.title}
                  </Button>
                ))}
              </nav>
            </aside>

            <main className="p-6 border-border border-t lg:border-t-0 lg:border-l w-full">
              <h2 className="text-xl font-medium mb-6">
                {getActiveMenuTitle(activeMenu)}
              </h2>
              <div>{getActiveMenuComponent(activeMenu)}</div>
            </main>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
