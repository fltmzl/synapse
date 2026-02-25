"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  changePasswordSchema,
  updateUserSchema,
  userSchema
} from "@/schema/user.schema";
import { User } from "@/types/user.type";
import useUserMutation from "@/mutations/use-user-mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { ArrowLeft, Check, ChevronDown, Lock, Save } from "lucide-react";
import Image from "next/image";
import { CountryCodeService } from "@/services/country-code.api";
import { QUERIES } from "@/constants/queries.constant";
import { Skeleton } from "@/components/ui/skeleton";
import SimpleErrorMessage from "@/components/simple-error-message";
import { cn } from "@/lib/tiptap-utils";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard-header";
import { Spinner } from "@/components/spinner";
import { UserService } from "@/services/user.api";
import { EyeIcon } from "@/icons/eye-icon";
import { EyeOffIcon } from "@/icons/eye-off-icon";
import { useState } from "react";

interface UserFormProps {
  mode?: "create" | "edit";
  user?: User;
}

export function UserForm({ mode = "create", user }: UserFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isEdit = mode === "edit";

  const { updateUserMutation, changePasswordMutation } = useUserMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    data: countryCodes,
    isLoading: isLoadingCountryCodes,
    isError: isErrorCountryCodes
  } = useQuery({
    queryFn: CountryCodeService.getAll,
    queryKey: [QUERIES.COUNTRY_CODES],
    select: (data) => CountryCodeService.mapCountryToSelectOptions(data)
  });

  const form = useForm<z.infer<typeof userSchema>>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(isEdit ? updateUserSchema : userSchema) as any,
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      password: "",
      role: user?.role || "paid_user",
      phoneNumber: user?.phoneNumber || "",
      countryCode: user?.countryCode || "+1-US"
    }
  });

  const changePasswordForm = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: ""
    }
  });

  const createMutation = useMutation({
    mutationFn: (values: z.infer<typeof userSchema>) =>
      UserService.create(values),
    onSuccess: () => {
      toast.success("User created successfully");
      queryClient.invalidateQueries({ queryKey: [QUERIES.USERS] });
      router.push("/dashboard/admin-panel/users");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Failed to create user");
    }
  });

  function onSubmit(values: z.infer<typeof userSchema>) {
    if (isEdit && user?.uid) {
      updateUserMutation.mutate(
        { uid: user.uid, payload: values },
        {
          onSuccess: () => {
            router.push("/dashboard/admin-panel/users");
          }
        }
      );
    } else {
      createMutation.mutate(values);
    }
  }

  function onChangePassword(values: z.infer<typeof changePasswordSchema>) {
    if (user?.uid) {
      changePasswordMutation.mutate(
        {
          uid: user.uid,
          newPassword: values.newPassword
        },
        {
          onSuccess: () => {
            changePasswordForm.reset();
          }
        }
      );
    }
  }

  return (
    <>
      <DashboardHeader
        title={isEdit ? "Edit User" : "Create User"}
        description={
          isEdit ? "Update user information" : "Add a new user to the system"
        }
        actions={
          <Button
            size="sm"
            onClick={form.handleSubmit(onSubmit)}
            disabled={createMutation.isPending || updateUserMutation.isPending}
          >
            {createMutation.isPending || updateUserMutation.isPending ? (
              <Spinner />
            ) : (
              <Save className="size-4 mr-2" />
            )}
            {isEdit ? "Update User" : "Save User"}
          </Button>
        }
      />

      <div className="space-y-8 w-full max-w-4xl mx-auto mt-5 p-4">
        <Link
          href="/dashboard/admin-panel/users"
          className="flex items-center text-secondary text-sm w-fit hover:underline"
        >
          <ArrowLeft className="size-4 mr-2" />
          Back to users
        </Link>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
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
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!isEdit && (
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="******"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors"
                            tabIndex={-1}
                          >
                            {showPassword ? (
                              <EyeIcon className="size-4" />
                            ) : (
                              <EyeOffIcon className="size-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormItem>
                <FormLabel className="label-required">Phone Number</FormLabel>
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
                        return (
                          <SimpleErrorMessage message="Something went wrong" />
                        );

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
                              <CommandInput
                                placeholder="Search..."
                                className="h-9"
                              />
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
                                        form.setValue(
                                          "phoneNumber",
                                          country.value
                                        );
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
                                      <span className="text-xs">
                                        {country.label}
                                      </span>
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
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="paid_user">Paid User</SelectItem>
                        <SelectItem value="regular_user">
                          Regular User
                        </SelectItem>
                        <SelectItem value="superadmin">Superadmin</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              disabled={
                createMutation.isPending || updateUserMutation.isPending
              }
            >
              {createMutation.isPending || updateUserMutation.isPending
                ? "Saving..."
                : isEdit
                  ? "Update User"
                  : "Create User"}
            </Button>
          </form>
        </Form>

        {isEdit && (
          <div className="pt-6 border-t">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="change-password">
                <AccordionTrigger className="text-destructive hover:no-underline">
                  <div className="flex items-center">
                    <Lock className="size-4 mr-2" />
                    Change User Password
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 px-1">
                  <Form {...changePasswordForm}>
                    <form
                      onSubmit={changePasswordForm.handleSubmit(
                        onChangePassword
                      )}
                      className="space-y-4"
                    >
                      <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                          control={changePasswordForm.control}
                          name="newPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>New Password</FormLabel>
                              <FormControl>
                                <div className="relative group">
                                  <Input
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="******"
                                    {...field}
                                  />
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setShowNewPassword((prev) => !prev)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors"
                                    tabIndex={-1}
                                  >
                                    {showNewPassword ? (
                                      <EyeIcon className="size-4" />
                                    ) : (
                                      <EyeOffIcon className="size-4" />
                                    )}
                                  </button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={changePasswordForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <div className="relative group">
                                  <Input
                                    type={
                                      showConfirmPassword ? "text" : "password"
                                    }
                                    placeholder="******"
                                    {...field}
                                  />
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setShowConfirmPassword((prev) => !prev)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors"
                                    tabIndex={-1}
                                  >
                                    {showConfirmPassword ? (
                                      <EyeIcon className="size-4" />
                                    ) : (
                                      <EyeOffIcon className="size-4" />
                                    )}
                                  </button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button
                        type="submit"
                        variant="destructive"
                        disabled={changePasswordMutation.isPending}
                      >
                        {changePasswordMutation.isPending ? (
                          <Spinner />
                        ) : (
                          "Change Password"
                        )}
                      </Button>
                    </form>
                  </Form>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </div>
    </>
  );
}
