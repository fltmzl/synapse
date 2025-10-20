"use client";

import { Headphones, RefreshCcw, XIcon } from "lucide-react";
import * as React from "react";

import ContactUsForm from "@/app/auth/components/contact-us-form";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar
} from "@/components/ui/sidebar";
import useModal from "@/hooks/use-modal";
import { LogoutIcon } from "@/icons/logout-icon";
import SuccessIcon from "@/icons/success-icon";
import { cn } from "@/lib/utils";
import { useOnboardingStore } from "@/stores/onboarding.store";
import { usePathname, useRouter } from "next/navigation";
import BrandLogo from "./brand-logo";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import useRole from "@/hooks/use-role";
import Link from "next/link";
import { DashboardRoundedIcon } from "@/icons/dashboard-rounded-icon";

export function OnboardingSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { toggleSidebar, isMobile } = useSidebar();
  const router = useRouter();
  const { isSuperadmin, loading, role } = useRole();
  const pathname = usePathname();
  const {
    isOpen: isOpenContactUs,
    openModal: openModalContactUs,
    setIsOpen: setIsOpenContactUs,
    closeModal: closeModalContactUs
  } = useModal();

  const data = [
    {
      step: 1,
      title: "Your Why",
      isActive: pathname.includes("/onboarding/step-1")
    },
    {
      step: 2,
      title: "Your Edge",
      isActive: pathname.includes("/onboarding/step-2")
    },
    {
      step: 3,
      title: "Your Tone",
      isActive: pathname.includes("/onboarding/step-3")
    },
    {
      step: 4,
      title: "Your Story",
      isActive: pathname.includes("/onboarding/step-4")
    },
    {
      step: 5,
      title: "Your Presence",
      isActive: pathname.includes("/onboarding/step-5")
    }
  ];

  const { currentStep, resetAll, progress } = useOnboardingStore();

  const getProgressiveSteps = () => progress;

  const isQuestionPage = currentStep > 0;

  const handleLogout = async () => {
    try {
      await signOut(auth);

      router.push("/");
    } catch (err) {
      const error = err as { message: string };

      console.log(error.message);
    }
  };

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader className="pt-6 px-4">
        <div className="flex justify-between items-start">
          <BrandLogo />

          <div className="flex gap-6">
            <button
              className="p-0 text-muted-foreground"
              onClick={handleLogout}
            >
              <LogoutIcon className="size-5" />
            </button>

            {isMobile && (
              <button
                className="p-0 text-muted-foreground lg:hidden"
                onClick={toggleSidebar}
              >
                <XIcon size={20} />
              </button>
            )}
          </div>
        </div>
        {isQuestionPage && <Separator className="mt-4 bg-muted" />}
      </SidebarHeader>
      <SidebarContent className="px-4 pt-5 text-center">
        {pathname !== "/onboarding" && (
          <div>
            <div className="mb-6">
              <div className="flex justify-between mb-3">
                <p>Completion Progress</p>
                <p className="font-semibold text-foreground">
                  {getProgressiveSteps()}%
                </p>
              </div>

              <Progress
                value={getProgressiveSteps()}
                className="w-full bg-[#DEDEDE] h-2"
              />
            </div>

            <div className="grid gap-2">
              {data.map((item) => {
                const isComplete = item.step < currentStep;

                return (
                  <Button
                    variant="outline"
                    className={cn("flex justify-start gap-2.5", {
                      "shadow-[0px_2px_4px_0px_rgba(0,0,0,0.04)]":
                        item.isActive,
                      "bg-[#E9E9E9] text-muted-foreground":
                        !item.isActive && !isComplete
                    })}
                    key={item.title}
                    onClick={() => {
                      router.push(`/onboarding/step-${item.step}`);
                    }}
                  >
                    {isComplete ? (
                      <SuccessIcon withShadow={false} size="md" />
                    ) : (
                      <div
                        className={cn(
                          "size-6 bg-primary text-white rounded-full grid place-content-center text-xs",
                          {
                            "bg-white text-muted-foreground shadow-[0px_2px_4px_0px_rgba(0,0,0,0.04)]":
                              !item.isActive
                          }
                        )}
                      >
                        {item.step}
                      </div>
                    )}
                    <div>{item.title}</div>
                  </Button>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-auto">
          <p className="mb-2.5">Having trouble?</p>
          <AlertDialog open={isOpenContactUs} onOpenChange={setIsOpenContactUs}>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full max-w-[512px] mb-5"
                onClick={openModalContactUs}
              >
                <Headphones size={16} />
                Contact Us
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader className="hidden">
                <AlertDialogTitle>Contact Us Form</AlertDialogTitle>
                <AlertDialogDescription>Contact us form</AlertDialogDescription>
              </AlertDialogHeader>
              <ContactUsForm onClose={closeModalContactUs} />
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {isSuperadmin && (
          <Button asChild>
            <Link href={"/admin-panel"}>
              <DashboardRoundedIcon className="size-3.5" />{" "}
              <span>Admin Panel</span>
            </Link>
          </Button>
        )}

        {isQuestionPage && <Separator />}
      </SidebarContent>

      {isQuestionPage && (
        <SidebarFooter className="pb-6 px-4">
          <Button
            variant="ghost"
            className="text-muted-foreground"
            onClick={() => {
              resetAll();
              router.push("/onboarding/step-1");
            }}
          >
            <RefreshCcw size={16} />
            <span className="text-[#525866]">Restart Questions ?</span>
          </Button>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
