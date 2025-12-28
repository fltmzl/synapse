"use client";

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
import { EyeIcon } from "@/icons/eye-icon";
import { EyeOffIcon } from "@/icons/eye-off-icon";
import { GoogleIcon } from "@/icons/google-icon";
import { passwordValidation } from "@/lib/common-validation";
import { cn } from "@/lib/utils";
import { useRegister } from "@/mutations/use-register";
import { CountryCodeService } from "@/services/country-code.api";
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
  onSuccess?: () => void;
};

export default function RegisterForm({ onSuccess }: Props) {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const registerMutation = useRegister();

  const {
    data: countryCodes,
    isLoading: isLoadingCountryCodes,
    isError: isErrorCountryCodes
  } = useQuery({
    queryFn: CountryCodeService.getAll,
    queryKey: [QUERIES.COUNTRY_CODES],
    select: (data) => CountryCodeService.mapCountryToSelectOptions(data)
  });

  const formSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    email: z.string().min(1, "Email is required"),
    // password: passwordValidation,
    // confirmPassword: z.string().min(1, "Confirm password is required"),
    countryCode: z.string()
  });
  // .refine((data) => data.password === data.confirmPassword, {
  //   path: ["confirmPassword"],
  //   message: "Passwords do not match"
  // });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      // password: "",
      // confirmPassword: "",
      countryCode: "+1-US"
    },
    mode: "all"
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSuccess?.();
    // registerMutation.mutate(values, {
    //   onSuccess: () => {
    //     router.push("/auth/register-success?email=" + values.email);
    //   },
    //   onError: (error: unknown) => {
    //     const err = error as { code: string };

    //     if (err.code === "auth/email-already-in-use") {
    //       form.setError("email", { message: "Email already in use" });
    //     } else {
    //       console.log(error);
    //     }
    //   }
    // });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="label-required">Prénom</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="label-required">Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormItem>
          <FormLabel className="label-required">Numéro de téléphone</FormLabel>
          <div className="flex">
            <FormField
              control={form.control}
              name="countryCode"
              render={({ field }) => {
                if (isLoadingCountryCodes)
                  return (
                    <Skeleton className="py-2 px-3 w-20 rounded-l-lg rounded-r-none" />
                  );

                if (!countryCodes || isErrorCountryCodes)
                  return <SimpleErrorMessage message="Something went wrong" />;

                const selectedValue = field.value
                  ? countryCodes.find(
                      (country) =>
                        `${country.value}-${country.code}` === field.value
                    )
                  : "Select country";

                return (
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-fit justify-between p-2 text-xs rounded-l-lg rounded-r-none border-r-0",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {typeof selectedValue === "string" ? (
                            selectedValue
                          ) : (
                            <div className="flex items-center gap-2">
                              <div className="relative min-w-[18px] aspect-square rounded-full overflow-hidden">
                                <Image
                                  src={selectedValue?.flag || ""}
                                  alt={selectedValue?.label || ""}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <span className="text-xs">
                                {selectedValue?.value}
                              </span>
                            </div>
                          )}
                          <ChevronDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-[200px] p-0"
                      side="bottom"
                      align="start"
                    >
                      <Command>
                        <CommandInput placeholder="Search..." className="h-9" />
                        <CommandList>
                          <CommandEmpty>Not found</CommandEmpty>
                          <CommandGroup className="p-2 max-h-40 overflow-auto scrollbar-custom">
                            {countryCodes.map((country, index) => (
                              <CommandItem
                                value={country.label}
                                key={country.value + index}
                                onSelect={() => {
                                  form.setValue(
                                    "countryCode",
                                    `${country.value}-${country.code}`
                                  );
                                  form.setValue("phoneNumber", country.value);
                                }}
                                className="p-2"
                              >
                                <div className="relative min-w-[18px] aspect-square rounded-full overflow-hidden">
                                  <Image
                                    src={country.flag}
                                    alt={country.label}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <span className="text-xs">{country.label}</span>
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    `${country.value}-${country.code}` ===
                                      field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                );
              }}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormControl>
                  <Input
                    placeholder="Enter phone number"
                    className="rounded-l-none"
                    {...field}
                  />
                </FormControl>
              )}
            />
          </div>
          <FormMessage />
        </FormItem>

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

        {/* <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
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
              <FormDescription>
                Must be at least 8 characters, include a number and a special
                character.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repeat Password</FormLabel>
              <FormControl>
                <div className="relative group">
                  <Input
                    type={showRepeatPassword ? "text" : "password"}
                    placeholder="Enter your password"
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
        /> */}

        <Button
          type="submit"
          size="lg"
          className="w-full mt-6"
          disabled={!form.formState.isValid}
        >
          Continue
        </Button>
      </form>

      {/* <p className="text-center">or Register using</p>

      <div className="grid gap-4">
        <Button
          variant="outline"
          className="rounded-2lg"
          onClick={handleGoogleLogin}
        >
          <GoogleIcon />
          Google
        </Button>
      </div>
      <p className="text-center">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-foreground underline">
          Login
        </Link>
      </p> */}
    </Form>
  );
}
