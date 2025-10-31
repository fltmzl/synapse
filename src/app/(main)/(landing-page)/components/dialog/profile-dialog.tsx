import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import { useState } from "react";
import BillingForm from "../form/billing-form";
import ChangePasswordForm from "../form/change-password-form";
import ProfileForm from "../form/profile-form";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type SettingMenuType = "profile" | "security" | "billing";

export default function ProfileDialog({ isOpen, setIsOpen }: Props) {
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
        return <BillingForm />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogHeader className="sr-only">
        <DialogTitle>Setting</DialogTitle>
      </DialogHeader>
      <DialogContent
        showCloseButton={false}
        className="flex flex-col lg:flex-row overflow-hidden lg:max-w-[852px]"
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
                variant={activeMenu === menu.slug ? "outline-gray" : "ghost"}
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

            <Button
              variant="ghost"
              className={cn(
                "text-destructive hover:text-destructive font-normal md:flex md:justify-start md:px-2.5"
              )}
            >
              Logout
            </Button>
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
  );
}
