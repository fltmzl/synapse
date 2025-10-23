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
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  onSuccess?: () => void;
};

export default function ResetPasswordForm({ onSuccess }: Props) {
  const router = useRouter();

  const formSchema = z.object({
    email: z
      .email({ error: "Please enter a valid email" })
      .min(1, "Email is required")
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ""
    },
    mode: "all"
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Submit");
    onSuccess?.();
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

        <Button type="submit" size="lg" className="w-full mt-3">
          Submit
        </Button>
      </form>

      <p className="text-center mt-6">
        Return to
        <Link href="/auth/login" className="underline ms-1 text-primary">
          Sign in
        </Link>
      </p>
    </Form>
  );
}
