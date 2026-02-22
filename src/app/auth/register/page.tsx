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
import { useState } from "react";
import AuthLayout from "../auth-layout";
import RegisterForm from "./form/register-form";
import { XIcon } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

  const handleRegisterSuccess = () => setIsRegisterSuccess(true);

  if (isRegisterSuccess) {
    return (
      <div className="min-h-dvh grid place-content-center px-5">
        <Empty className="gap-8">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SuccessIcon />
            </EmptyMedia>
            <EmptyTitle className="text-xl lg:text-3xl mt-8 min-w-max">
              Account Created Successfully!
            </EmptyTitle>
            <EmptyDescription className="leading-[140%] min-w-max">
              Welcome aboard, Jan 👋 <br className="lg:hidden" />
              Your Synapse account is now ready.
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
          <Link href="/auth/login">
            <XIcon />
          </Link>
        </Button>

        <div className="mt-20 lg:mt-0">
          <BrandLogo />
        </div>

        <div>
          <h1 className="text-xl lg:text-3xl font-medium">Almost There!</h1>
          <p className="mt-4">
            You’ve chosen your plan — now let’s set up your account.With just a
            few details, you’ll unlock access to insights, connections, and
            tools tailored to your needs.
          </p>
        </div>
      </div>

      <main>
        <Card className="py-8 lg:py-12 px-6 lg:px-10 rounded-2lg">
          <CardTitle className="text-xl lg:text-2xl text-center tracking-tight font-medium">
            Create your account
          </CardTitle>
          <div>
            <RegisterForm onSuccess={handleRegisterSuccess} />
          </div>
        </Card>
      </main>
    </AuthLayout>
  );
}
