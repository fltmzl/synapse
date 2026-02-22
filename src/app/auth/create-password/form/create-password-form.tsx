"use client";

import PasswordStrengthMeter from "@/components/password-strength-meter";
import SimpleErrorMessage from "@/components/simple-error-message";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { QUERIES } from "@/constants/queries.constant";
import usePasswordStrength from "@/hooks/use-password-strength";
import { EyeIcon } from "@/icons/eye-icon";
import { EyeOffIcon } from "@/icons/eye-off-icon";
import { GoogleIcon } from "@/icons/google-icon";
import { passwordValidation } from "@/lib/common-validation";
import { PasswordStrengthUtil } from "@/lib/password-strength";
import { cn } from "@/lib/utils";
import { useResetPasswordMutation } from "@/mutations/use-auth-mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  oobCode: string;
  onSuccess?: () => void;
};

export default function CreatePasswordForm({ oobCode, onSuccess }: Props) {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const { passwordStrength, setPasswordStrength } = usePasswordStrength();

  const resetPasswordMutation = useResetPasswordMutation();

  const formSchema = z
    .object({
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
      password: "",
      confirmPassword: ""
    },
    mode: "all"
  });

  const handlePasswordChange = (value: string) => {
    form.setValue("password", value, { shouldValidate: true });
    setPasswordStrength(PasswordStrengthUtil.getPasswordStrength(value));
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    resetPasswordMutation.mutate(
      {
        oobCode,
        newPassword: values.password
      },
      {
        onSuccess: () => {
          onSuccess?.();
        }
      }
    );
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="label-required">Password</FormLabel>
              <FormControl>
                <div className="relative group">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Entrez votre nouveau mot de passe..."
                    {...field}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                  </button>
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
              <FormLabel className="label-required">Confirm Password</FormLabel>
              <FormControl>
                <div className="relative group">
                  <Input
                    type={showRepeatPassword ? "text" : "password"}
                    placeholder="Ressaisissez votre nouveau mot de passe..."
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowRepeatPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors"
                    tabIndex={-1}
                  >
                    {showRepeatPassword ? <EyeIcon /> : <EyeOffIcon />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="lg"
          className="w-full mt-6"
          disabled={!form.formState.isValid || resetPasswordMutation.isPending}
        >
          {resetPasswordMutation.isPending ? "Updating..." : "Reset Password"}
        </Button>
      </form>

      <p className="text-center mt-6 text-sm">
        Return to
        <Link href="/auth/login" className="underline ms-1 text-primary">
          Sign in
        </Link>
      </p>
    </Form>
  );
}
