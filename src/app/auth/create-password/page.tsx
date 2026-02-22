"use client";

import BrandLogo from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from "@/components/ui/empty";
import SuccessIcon from "@/icons/success-icon";
import { Loader2, XIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AuthService } from "@/services/auth.api";
import AuthLayout from "../auth-layout";
import CreatePasswordForm from "./form/create-password-form";

export default function CreatePasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const oobCode = searchParams.get("oobCode");

  const [isCreatePasswordSuccess, setIsCreatePasswordSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!oobCode) {
      toast.error("Invalid or missing password reset code.", {
        position: "top-center"
      });
      router.push("/auth/login");
      return;
    }

    const verifyCode = async () => {
      try {
        await AuthService.verifyPasswordResetCode(oobCode);
        setLoading(false);
      } catch (error) {
        console.error("Verification error:", error);
        toast.error("Reset link is invalid or expired.", {
          position: "top-center"
        });
        router.push("/auth/login");
      }
    };

    verifyCode();
  }, [oobCode, router]);

  const handleCreatePasswordSuccess = () => setIsCreatePasswordSuccess(true);

  if (loading) {
    return (
      <div className="min-h-dvh grid place-content-center px-5">
        <Loader2 className="size-12 animate-spin text-primary/70" />
      </div>
    );
  }

  if (isCreatePasswordSuccess) {
    return (
      <div className="min-h-dvh grid place-content-center px-5">
        <Empty className="gap-8">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SuccessIcon />
            </EmptyMedia>
            <EmptyTitle className="text-xl lg:text-3xl mt-8 min-w-max">
              Password reset complete
            </EmptyTitle>
            <EmptyDescription className="leading-[140%] min-w-max">
              Password updated. Your account is now more secure.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button className="font-normal px-3 lg:px-5 py-2 lg:py-3.5">
              <Link href="/auth/login">Go to main page</Link>
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    );
  }

  return (
    <AuthLayout>
      <div className="flex flex-col items-start gap-6 lg:gap-12">
        <Button
          size="icon"
          variant="outline"
          className="size-10 rounded-sm absolute top-0 left-5 xl:-left-21"
        >
          <XIcon />
        </Button>

        <div className="mt-20 lg:mt-0">
          <BrandLogo />
        </div>

        <div>
          <h1 className="text-xl lg:text-3xl font-medium">
            Entrez votre nouveau mot de passe
          </h1>
          <p className="mt-4">
            For your security, please choose a strong password that you haven’t
            used before.
          </p>
        </div>
      </div>

      <main>
        <Card className="py-8 lg:py-12 px-6 lg:px-10 rounded-2lg">
          <CardTitle className="text-xl lg:text-2xl text-center tracking-tight font-medium">
            Créer un mot de passe
          </CardTitle>
          <div>
            <CreatePasswordForm
              oobCode={oobCode!}
              onSuccess={handleCreatePasswordSuccess}
            />
          </div>
        </Card>
      </main>
    </AuthLayout>
  );
}
