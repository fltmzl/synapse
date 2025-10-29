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
            <EmptyTitle className="text-xl lg:text-3xl mt-8 min-w-max">
              Consultez votre boite
            </EmptyTitle>
            <EmptyDescription className="leading-[140%] min-w-max">
              Consultez votre boite mail de référence, un lien de <br />{" "}
              connexion vous a été envoyé par assurer votre accès
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <p>
              Vous n&apos;avez rien reçu?{" "}
              <Link href="/auth/login" className="text-primary font-medium">
                Contactez nous
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
            Mot de passe oublié?
          </h1>
          <p className="mt-4">
            Enter your email address and we will send you the link to reset your
            password
          </p>
        </div>
      </div>

      <main>
        <Card className="py-8 lg:py-12 px-6 lg:px-10 rounded-2lg">
          <CardTitle className="text-xl lg:text-2xl text-center tracking-tight font-medium">
            Entrez votre email
          </CardTitle>
          <div>
            <ResetPasswordForm onSuccess={handleEmailSendSuccess} />
          </div>
        </Card>
      </main>
    </AuthLayout>
  );
}
