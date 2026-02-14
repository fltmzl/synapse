"use client";

import PasswordStrengthMeter from "@/components/password-strength-meter";
import ToggleVisiblePassword from "@/components/toggle-visible-password";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import usePasswordStrength from "@/hooks/use-password-strength";
import { EyeIcon } from "@/icons/eye-icon";
import { EyeOffIcon } from "@/icons/eye-off-icon";
import { passwordValidation } from "@/lib/common-validation";
import { PasswordStrengthUtil } from "@/lib/password-strength";
import { useChangePasswordMutation } from "@/mutations/use-auth-mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  onSuccess?: () => void;
};

export default function ChangePasswordForm({ onSuccess }: Props) {
  const router = useRouter();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const { passwordStrength, setPasswordStrength } = usePasswordStrength();

  const { mutate: changePassword, isPending: isLoading } =
    useChangePasswordMutation();

  const formSchema = z
    .object({
      currentPassword: z.string().min(1, "Current password is required"),
      password: passwordValidation,
      confirmPassword: z.string().min(1, "Confirm password is required")
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match"
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: ""
    },
    mode: "all"
  });

  const handlePasswordChange = (value: string) => {
    form.setValue("password", value, { shouldValidate: true });
    setPasswordStrength(PasswordStrengthUtil.getPasswordStrength(value));
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    changePassword(
      {
        currentPassword: values.currentPassword,
        newPassword: values.password
      },
      {
        onSuccess: () => {
          form.reset();
          onSuccess?.();
        },
        onError: (error) => {
          if (error instanceof FirebaseError) {
            if (error.code === "auth/invalid-credentials") {
              form.setError("currentPassword", {
                message: "Invalid Password"
              });
            }
          }
        }
      }
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="label-required">
                Mot de passe actuel
              </FormLabel>
              <FormControl>
                <div className="relative group">
                  <Input
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Entrez votre mot de passe..."
                    {...field}
                  />

                  <ToggleVisiblePassword
                    showPassword={showCurrentPassword}
                    setShowPassword={setShowCurrentPassword}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="label-required">
                Nouveau mot de passe
              </FormLabel>
              <FormControl>
                <div className="relative group">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Entrez votre nouveau mot de passe..."
                    {...field}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                  />

                  <ToggleVisiblePassword
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />
                </div>
              </FormControl>

              <PasswordStrengthMeter passwordStrength={passwordStrength} />

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="label-required">
                Confirmer mon nouveau mot de passe
              </FormLabel>
              <FormControl>
                <div className="relative group">
                  <Input
                    type={showRepeatPassword ? "text" : "password"}
                    placeholder="Ressaisissez votre nouveau mot de passe..."
                    {...field}
                  />

                  <ToggleVisiblePassword
                    showPassword={showRepeatPassword}
                    setShowPassword={setShowRepeatPassword}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-6 lg:mt-[100px] text-end">
          <Button
            size="sm"
            variant="default"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Change password"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
