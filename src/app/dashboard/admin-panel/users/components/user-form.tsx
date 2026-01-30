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
import { userSchema } from "@/schema/user.schema";
import { UserService } from "@/services/user.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { ArrowLeft, Check, ChevronDown, Save } from "lucide-react";
import Image from "next/image";
import { CountryCodeService } from "@/services/country-code.api";
import { QUERIES } from "@/constants/queries.constant";
import { Skeleton } from "@/components/ui/skeleton";
import SimpleErrorMessage from "@/components/simple-error-message";
import { cn } from "@/lib/tiptap-utils";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard-header";
import { Spinner } from "@/components/spinner";

const formSchema = userSchema;

type FormValues = z.infer<typeof formSchema>;

export function UserForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: countryCodes,
    isLoading: isLoadingCountryCodes,
    isError: isErrorCountryCodes
  } = useQuery({
    queryFn: CountryCodeService.getAll,
    queryKey: [QUERIES.COUNTRY_CODES],
    select: (data) => CountryCodeService.mapCountryToSelectOptions(data)
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "paid_user",
      phoneNumber: "",
      countryCode: "+1-US"
    }
  });

  const mutation = useMutation({
    mutationFn: (values: FormValues) => UserService.create(values),
    onSuccess: () => {
      toast.success("User created successfully");
      queryClient.invalidateQueries({ queryKey: [QUERIES.USERS] });
      router.push("/dashboard/admin-panel/users");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Failed to create user");
    }
  });

  function onSubmit(values: FormValues) {
    mutation.mutate(values);
  }

  return (
    <>
      <DashboardHeader
        title="Create User"
        description="Add a new user to the system"
        actions={
          <Button
            size="sm"
            onClick={form.handleSubmit(onSubmit)}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <Spinner />
            ) : (
              <Save className="size-4 mr-2" />
            )}
            Save User
          </Button>
        }
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full max-w-4xl mx-auto mt-5 p-4"
        >
          <Link
            href="/dashboard/admin-panel/users"
            className="flex items-center text-secondary text-sm w-fit hover:underline"
          >
            <ArrowLeft className="size-4 mr-2" />
            Back to users
          </Link>

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

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      <SelectItem value="regular_user">Regular User</SelectItem>
                      <SelectItem value="superadmin">Superadmin</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Creating..." : "Create User"}
          </Button>
        </form>
      </Form>
    </>
  );
}
