"use client";

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
import { EyeIcon } from "@/icons/eye-icon";
import { EyeOffIcon } from "@/icons/eye-off-icon";
import { GoogleIcon } from "@/icons/google-icon";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const formSchema = z.object({
    email: z
      .email({ error: "Please enter a valid email" })
      .min(1, "Email is required"),
    password: z.string().min(1, "Password is required")
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
    mode: "all"
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Submit");
    // try {
    //   const user = await AuthService.loginWithEmail({
    //     email: values.email,
    //     password: values.password
    //   });

    //   router.push("/onboarding");
    // } catch (err) {
    //   form.setError("password", { message: "Invalid email or password" });
    // }
  };

  const handleGoogleLogin = async () => {
    console.log("Google Login");
    // try {
    //   const user = await AuthService.loginWithGoogle();
    //   if (user) router.push("/onboarding");
    // } catch (error) {
    //   console.error("Google login error:", error);
    // }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="label-required">Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email address" {...field} />
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
              <FormLabel className="label-required">Mot de passe</FormLabel>
              <FormControl>
                <div className="relative group">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...field}
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
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="text-end">
          <Link
            href={"/auth/forgot-password"}
            className="text-sm tracking-tight text-primary"
          >
            Forgot Password ?
          </Link>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full mt-3"
          disabled={!form.formState.isValid}
        >
          Sign in
        </Button>
      </form>

      <div className="flex items-center gap-4 my-6">
        <div className="border-b w-full"></div>
        <p className="text-center min-w-max">or continue with</p>
        <div className="border-b w-full"></div>
      </div>

      <div className="grid gap-4">
        <Button
          size="lg"
          variant="outline"
          className="rounded-lg"
          onClick={handleGoogleLogin}
        >
          <GoogleIcon />
          Google account
        </Button>
      </div>

      <p className="text-center mt-6">
        Vous n&rsquo;avez pas de compte?
        <Link href="/auth/register" className="underline ms-1 text-primary">
          Souscrire
        </Link>
      </p>
    </Form>
  );
}
