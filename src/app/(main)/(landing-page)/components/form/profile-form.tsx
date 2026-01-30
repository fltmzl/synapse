import InfoField from "@/components/info-field";
import SimpleErrorMessage from "@/components/simple-error-message";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { EditIcon } from "@/icons/edit-icon";
import { cn } from "@/lib/utils";
import useCountryCodeDropdownData from "@/queries/use-country-code-dropdown-data";
import useMyProfile from "@/queries/use-my-profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronDown } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  email: z.email("Invalid email address").min(1, "Email is required"),
  countryCode: z.string().optional(),
  photoURL: z.string().optional().nullable()
});

export default function ProfileForm() {
  const { data: myProfile } = useMyProfile();
  const {
    data: countryCodes,
    isLoading: isLoadingCountryCodes,
    isError: isErrorCountryCodes
  } = useCountryCodeDropdownData();
  const [isEditMode, setIsEditMode] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      countryCode: "+33",
      photoURL: null,
      phoneNumber: ""
    }
  });
  const [photo, setPhoto] = useState<
    (File & { preview: string }) | string | null
  >(form.getValues("photoURL") || null);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Submitted:", data);
    setIsEditMode(false);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      const fileWithPreview = Object.assign(file, { preview });
      setPhoto(fileWithPreview);
    }
  };

  const photoSrc = typeof photo === "string" ? photo : photo?.preview;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-4 items-center mb-6">
          <Avatar className="size-16">
            <AvatarImage
              src={photoSrc}
              alt="profile photo"
              className="object-cover"
            />
            {/* <AvatarFallback>{user?.displayName?.charAt(0)}</AvatarFallback> */}
            <AvatarFallback>{"John".charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex gap-2.5">
            <Button
              className="cursor-pointer py-2"
              type="button"
              variant="outline"
              size="sm"
              asChild
            >
              <label htmlFor="profile-photo">
                {photoSrc ? "Change image" : "Add image"}
              </label>
            </Button>
            <input
              type="file"
              id="profile-photo"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {isEditMode ? (
            <>
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="label-required">Prénom</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
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
                      <Input placeholder="Your Name" {...field} />
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
                    <FormLabel className="label-required">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel className="label-required">
                  Numéro de téléphone
                </FormLabel>
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
                                      {selectedValue?.flag ? (
                                        <Image
                                          src={selectedValue.flag}
                                          alt={selectedValue?.label || ""}
                                          fill
                                          className="object-cover"
                                        />
                                      ) : (
                                        <div className="min-w-5 aspect-square bg-muted-foreground/40" />
                                      )}
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
                          placeholder="Input your phone"
                          className="rounded-l-none"
                          {...field}
                        />
                      </FormControl>
                    )}
                  />
                </div>
                <FormMessage />
              </FormItem>
            </>
          ) : (
            <>
              <InfoField label="Prénom" value={form.getValues("firstName")} />
              <InfoField label="Nom" value={form.getValues("lastName")} />
              <InfoField label="Email" value={form.getValues("email")} />
              <InfoField
                label="Numéro de téléphone"
                value={
                  form.getValues("countryCode") + form.getValues("phoneNumber")
                }
              />
            </>
          )}
        </div>

        {isEditMode ? (
          <div className="mt-6 lg:mt-[106px] text-end">
            <Button size="sm" variant="default" type="submit">
              Save changes
            </Button>
          </div>
        ) : (
          <div className="mt-6 lg:mt-[146px] text-end">
            <Button
              size="sm"
              variant="outline"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setIsEditMode(true);
              }}
            >
              Edit <EditIcon className="mb-1" />
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
