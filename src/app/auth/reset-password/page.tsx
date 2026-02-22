"use client";

import BrandLogo from "@/components/brand-logo";
import { Card, CardTitle } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from "@/components/ui/empty";
import InboxIcon from "@/icons/inbox-icon";
import Link from "next/link";
import { useState } from "react";
import AuthLayout from "../auth-layout";
import ResetPasswordForm from "./form/reset-password-form";

export default function RegisterPage() {
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleEmailSendSuccess = () => setIsEmailSent(true);

  if (isEmailSent) {
    return (
      <div className="min-h-dvh grid place-content-center px-5">
        <Empty className="gap-8">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <InboxIcon />
            </EmptyMedia>
            <EmptyTitle className="text-xl lg:text-3xl mt-8 min-w-max text-center">
              Vérifiez votre boîte mail
            </EmptyTitle>
            <EmptyDescription className="leading-[140%] min-w-max text-center">
              Un lien de réinitialisation vous a été envoyé. <br />
              Veuillez consulter votre boîte de réception.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <p className="text-center">
              <Link href="/auth/login" className="text-primary font-medium">
                Retourner à la page de connexion
              </Link>
            </p>
          </EmptyContent>
        </Empty>
      </div>
    );
  }

  return (
    <AuthLayout>
      <div className="flex flex-col items-start gap-6 lg:gap-12">
        <div className="mt-20 lg:mt-0">
          <BrandLogo />
        </div>

        <div>
          <h1 className="text-xl lg:text-3xl font-medium">
            Mot de passe oublié ?
          </h1>
          <p className="mt-4">
            Saisissez votre adresse e-mail et nous vous enverrons un lien pour
            réinitialiser votre mot de passe.
          </p>
        </div>
      </div>

      <main>
        <Card className="py-8 lg:py-12 px-6 lg:px-10 rounded-2lg">
          <CardTitle className="text-xl lg:text-2xl text-center tracking-tight font-medium">
            Entrez votre e-mail
          </CardTitle>
          <div>
            <ResetPasswordForm onSuccess={handleEmailSendSuccess} />
          </div>
        </Card>
      </main>
    </AuthLayout>
  );
}
