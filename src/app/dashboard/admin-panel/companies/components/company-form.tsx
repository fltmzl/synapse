"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  Hash,
  Info,
  Camera,
  Save,
  ArrowLeft,
  Coins,
  ShieldCheck,
  FileText,
  Activity
} from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useUnsavedChanges } from "@/hooks/use-unsaved-changes";
import useCategories from "@/queries/use-categories";
import useCategoryMutation from "@/mutations/use-category-mutation";
import useTerritories from "@/queries/use-territories";
import useTerritoryMutation from "@/mutations/use-territory-mutation";
import usePlaces from "@/queries/use-places";
import usePlaceMutation from "@/mutations/use-place-mutation";
import { ImageUpload } from "@/components/ui/image-upload";
import { ComboboxCreate } from "@/components/ui/combobox-create";
import usePersons from "@/queries/use-persons";
import { DashboardHeader } from "@/components/dashboard-header";
import { Spinner } from "@/components/spinner";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from "@/components/ui/input-group";

const DESCRIPTION_MAX_LENGTH = 500;

export const companyFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  idNumber: z.string().optional(),
  code: z.string().optional(),
  phoneNumber: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  description: z.string().max(DESCRIPTION_MAX_LENGTH).optional(),
  profilePicture: z.string().optional(),
  address: z.string().optional(),
  zipCode: z.string().optional(),
  city: z.string().optional(),
  implantation: z.string().optional(),
  categoryId: z.string().optional(),
  placeId: z.string().optional(),
  territoryId: z.string().optional(),
  establishmentDate: z.string().optional(),
  sirenCode: z.string().optional(),
  legalStatus: z.string().optional(),
  nafCode: z.string().optional(),
  activity: z.string().optional(),
  economicalNumbers: z.object({
    capital: z.number().nullable(),
    financial_result: z.number().nullable(),
    margin: z.number().nullable(),
    number_of_employees: z.number().nullable(),
    operating_profit: z.number().nullable(),
    turnover: z.number().nullable()
  }),
  socials: z.object({
    whatsapp: z.string().optional(),
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    facebook: z.string().optional(),
    instagram: z.string().optional()
  }),
  authorizedRepresentativeId: z.string().optional()
});

export type CompanyFormValues = z.infer<typeof companyFormSchema>;

type CompanyFormProps = {
  initialValues?: CompanyFormValues;
  isMutationLoading?: boolean;
  onSubmit: (
    data: CompanyFormValues,
    newRepresentativeName?: string
  ) => void | Promise<void>;
  pageTitle: string;
  pageDescription: string;
};

export function CompanyForm({
  initialValues,
  isMutationLoading,
  onSubmit,
  pageTitle,
  pageDescription
}: CompanyFormProps) {
  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: initialValues || {
      name: "",
      idNumber: "",
      code: "",
      phoneNumber: "",
      email: "",
      website: "",
      description: "",
      profilePicture: "",
      address: "",
      zipCode: "",
      city: "",
      implantation: "",
      categoryId: "",
      placeId: "",
      territoryId: "",
      establishmentDate: "",
      sirenCode: "",
      legalStatus: "",
      nafCode: "",
      activity: "",
      economicalNumbers: {
        capital: null,
        financial_result: null,
        margin: null,
        number_of_employees: null,
        operating_profit: null,
        turnover: null
      },
      socials: {
        whatsapp: "",
        linkedin: "",
        twitter: "",
        facebook: "",
        instagram: ""
      },
      authorizedRepresentativeId: ""
    },
    mode: "all"
  });

  useUnsavedChanges(form.formState.isDirty);

  const { data: categories = [], isLoading: isCategoriesLoading } =
    useCategories();
  const { createCategoryMutation } = useCategoryMutation();

  const { data: persons = [], isLoading: isPersonsLoading } = usePersons();
  const [newRepresentativeName, setNewRepresentativeName] = React.useState("");

  const { data: territories = [], isLoading: isTerritoriesLoading } =
    useTerritories();
  const { createTerritoryMutation } = useTerritoryMutation();

  const { data: places = [], isLoading: isPlacesLoading } = usePlaces();
  const { createPlaceMutation } = usePlaceMutation();

  const territoryId = form.watch("territoryId");

  React.useEffect(() => {
    if (territoryId) {
      const selectedTerritory = territories.find((t) => t.id === territoryId);
      if (selectedTerritory) {
        form.setValue("implantation", selectedTerritory.name);
      }
    } else {
      form.setValue("implantation", "");
    }
  }, [territoryId, territories, form]);

  const categoryOptions = React.useMemo(
    () => categories.map((cat) => ({ value: cat.id, label: cat.name })),
    [categories]
  );

  const territoryOptions = React.useMemo(
    () => territories.map((t) => ({ value: t.id, label: t.name })),
    [territories]
  );

  const placeOptions = React.useMemo(
    () => places.map((p) => ({ value: p.id, label: p.name })),
    [places]
  );

  const personOptions = React.useMemo(
    () => persons.map((p) => ({ value: p.id, label: p.name })),
    [persons]
  );

  return (
    <>
      <DashboardHeader
        title={pageTitle}
        description={pageDescription}
        actions={
          <Button
            size="sm"
            onClick={form.handleSubmit((data: CompanyFormValues) =>
              onSubmit(data, newRepresentativeName)
            )}
            disabled={isMutationLoading}
          >
            {isMutationLoading ? <Spinner /> : <Save className="size-4 mr-2" />}
            Save Company
          </Button>
        }
      />

      <div className="flex flex-1 flex-col p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data: CompanyFormValues) =>
              onSubmit(data, newRepresentativeName)
            )}
            className="space-y-8 w-full max-w-4xl mx-auto"
          >
            <Link
              href="/dashboard/admin-panel/companies"
              className="flex items-center text-secondary text-sm w-fit hover:underline"
            >
              <ArrowLeft className="size-4 mr-2" />
              Back to companies
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Left Column - Main Info */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Building2 className="size-5 text-primary" />
                      <CardTitle>Basic Information</CardTitle>
                    </div>
                    <CardDescription className="mt-1">
                      General information about the company
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                      <FormField
                        control={form.control}
                        name="profilePicture"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Logo</FormLabel>
                            <FormControl>
                              <ImageUpload
                                variant="circle"
                                value={field.value}
                                onChange={field.onChange}
                                disabled={isMutationLoading}
                                className="w-32 h-32 rounded-lg"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex-1 grid gap-4 w-full">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="label-required">
                                Company Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. Acme Corp"
                                  {...field}
                                  disabled={isMutationLoading}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="idNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>ID Number</FormLabel>
                                <FormControl>
                                  <InputGroup>
                                    <InputGroupInput
                                      placeholder="Registration number"
                                      {...field}
                                      disabled={isMutationLoading}
                                    />
                                    <InputGroupAddon className="bg-background px-2 py-0.5 rounded-sm translate-x-1">
                                      #
                                    </InputGroupAddon>
                                  </InputGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Internal Code</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input
                                      placeholder="Internal reference"
                                      {...field}
                                      disabled={isMutationLoading}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="authorizedRepresentativeId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Authorized Representative</FormLabel>
                              <FormControl>
                                <ComboboxCreate
                                  options={personOptions}
                                  value={field.value}
                                  onValueChange={(val) => {
                                    field.onChange(val);
                                    setNewRepresentativeName(""); // Clear new name if existing selected
                                  }}
                                  onCreate={(name) => {
                                    setNewRepresentativeName(name);
                                    field.onChange(name);
                                  }}
                                  placeholder="Select representative"
                                  disabled={
                                    isPersonsLoading || isMutationLoading
                                  }
                                  createText="Create new person"
                                />
                              </FormControl>
                              {newRepresentativeName && (
                                <FormDescription className="text-primary font-medium">
                                  Will create new person:{" "}
                                  {newRepresentativeName}
                                </FormDescription>
                              )}
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between items-center">
                            <FormLabel>Description</FormLabel>
                            <span className="text-[10px] text-muted-foreground">
                              {field.value?.length || 0}/
                              {DESCRIPTION_MAX_LENGTH}
                            </span>
                          </div>
                          <FormControl>
                            <Textarea
                              placeholder="Brief description of the company..."
                              className="min-h-[100px] resize-none"
                              {...field}
                              disabled={isMutationLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Phone className="size-5 text-primary" />
                      <CardTitle>Contact & Online Presence</CardTitle>
                    </div>
                    <CardDescription className="mt-1">
                      How to reach the company and its social links
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <InputGroup>
                                <InputGroupInput
                                  placeholder="contact@company.com"
                                  {...field}
                                  disabled={isMutationLoading}
                                />
                                <InputGroupAddon className="bg-background px-2 py-0.5 rounded-sm translate-x-1">
                                  <Mail />
                                </InputGroupAddon>
                              </InputGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <InputGroup>
                                <InputGroupInput
                                  placeholder="+33 6 12 34 56 78"
                                  {...field}
                                  disabled={isMutationLoading}
                                />
                                <InputGroupAddon className="bg-background px-2 py-0.5 rounded-sm translate-x-1">
                                  <Phone />
                                </InputGroupAddon>
                              </InputGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <InputGroup>
                              <InputGroupInput
                                placeholder="https://www.company.com"
                                {...field}
                                disabled={isMutationLoading}
                              />
                              <InputGroupAddon className="bg-background px-2 py-0.5 rounded-sm translate-x-1">
                                <Globe />
                              </InputGroupAddon>
                            </InputGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                      <FormField
                        control={form.control}
                        name="socials.linkedin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>LinkedIn</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="LinkedIn URL"
                                {...field}
                                disabled={isMutationLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="socials.twitter"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Twitter / X</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Twitter URL"
                                {...field}
                                disabled={isMutationLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="socials.facebook"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Facebook</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Facebook URL"
                                {...field}
                                disabled={isMutationLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="socials.instagram"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Instagram</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Instagram URL"
                                {...field}
                                disabled={isMutationLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="size-5 text-primary" />
                      <CardTitle>Legal & Administrative</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="sirenCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>SIREN Code</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. 123456789"
                                {...field}
                                disabled={isMutationLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="nafCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>NAF Code</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. 64.99Z"
                                {...field}
                                disabled={isMutationLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="legalStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Legal Status</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. SA à conseil d'administration"
                              {...field}
                              disabled={isMutationLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="activity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Activity</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe company activity..."
                              className="min-h-[80px] resize-none"
                              {...field}
                              disabled={isMutationLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Classification & Location */}
              <div className="flex flex-col gap-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <MapPin className="size-5 text-primary" />
                      <CardTitle>Location</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="pb-4 border-b grid gap-4">
                      <FormField
                        control={form.control}
                        name="territoryId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Territory</FormLabel>
                            <FormControl>
                              <ComboboxCreate
                                options={territoryOptions}
                                value={field.value}
                                onValueChange={field.onChange}
                                onCreate={(name) => {
                                  createTerritoryMutation.mutate(name, {
                                    onSuccess: (newT) => {
                                      if (newT) field.onChange(newT.id);
                                    }
                                  });
                                }}
                                placeholder="Select territory"
                                isCreating={createTerritoryMutation.isPending}
                                disabled={isTerritoriesLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="placeId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Place</FormLabel>
                            <FormControl>
                              <ComboboxCreate
                                options={placeOptions}
                                value={field.value}
                                onValueChange={field.onChange}
                                onCreate={(name) => {
                                  createPlaceMutation.mutate(name, {
                                    onSuccess: (newP) => {
                                      if (newP) field.onChange(newP.id);
                                    }
                                  });
                                }}
                                placeholder="Select place"
                                isCreating={createPlaceMutation.isPending}
                                disabled={isPlacesLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Hiding implantation as it is auto-filled by territory name */}
                    <div className="hidden">
                      <FormField
                        control={form.control}
                        name="implantation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Implantation</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. CRETEIL"
                                {...field}
                                disabled={isMutationLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Zip Code</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="94120"
                                {...field}
                                disabled={isMutationLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="FONTENAY-SOUS-BOIS"
                                {...field}
                                disabled={isMutationLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="6 ALLEE DES SABLONS"
                              className="min-h-[60px] resize-none"
                              {...field}
                              disabled={isMutationLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Info className="size-5 text-primary" />
                      <CardTitle>Classification & Dates</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <ComboboxCreate
                              options={categoryOptions}
                              value={field.value}
                              onValueChange={field.onChange}
                              onCreate={(name) => {
                                createCategoryMutation.mutate(name, {
                                  onSuccess: (newCat) => {
                                    if (newCat) field.onChange(newCat.id);
                                  }
                                });
                              }}
                              placeholder="Select category"
                              isCreating={createCategoryMutation.isPending}
                              disabled={isCategoriesLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="establishmentDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Establishment Date</FormLabel>
                          <FormControl>
                            <InputGroup>
                              <InputGroupInput
                                type="date"
                                {...field}
                                disabled={isMutationLoading}
                              />
                              <InputGroupAddon className="bg-background px-2 py-0.5 rounded-sm translate-x-1">
                                <Calendar className="size-4" />
                              </InputGroupAddon>
                            </InputGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Coins className="size-5 text-primary" />
                      <CardTitle>Financial Data</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="economicalNumbers.capital"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Capital</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="0"
                                {...field}
                                value={field.value ?? ""}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value === ""
                                      ? null
                                      : Number(e.target.value)
                                  )
                                }
                                disabled={isMutationLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="economicalNumbers.turnover"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Turnover</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="0"
                                {...field}
                                value={field.value ?? ""}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value === ""
                                      ? null
                                      : Number(e.target.value)
                                  )
                                }
                                disabled={isMutationLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="economicalNumbers.financial_result"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Financial Result</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="0"
                                {...field}
                                value={field.value ?? ""}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value === ""
                                      ? null
                                      : Number(e.target.value)
                                  )
                                }
                                disabled={isMutationLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="economicalNumbers.operating_profit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Operating Profit</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="0"
                                {...field}
                                value={field.value ?? ""}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value === ""
                                      ? null
                                      : Number(e.target.value)
                                  )
                                }
                                disabled={isMutationLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="economicalNumbers.number_of_employees"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Employees</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="0"
                                {...field}
                                value={field.value ?? ""}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value === ""
                                      ? null
                                      : Number(e.target.value)
                                  )
                                }
                                disabled={isMutationLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="economicalNumbers.margin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Margin</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="0"
                                {...field}
                                value={field.value ?? ""}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value === ""
                                      ? null
                                      : Number(e.target.value)
                                  )
                                }
                                disabled={isMutationLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
