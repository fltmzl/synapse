"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
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
  ArrowLeft
} from "lucide-react";
import React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
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
  email: z.email("Invalid email").optional().or(z.literal("")),
  website: z.url("Invalid URL").optional().or(z.literal("")),
  description: z.string().max(DESCRIPTION_MAX_LENGTH).optional(),
  profilePicture: z.string().optional(),
  address: z.string().optional(),
  categoryId: z.string().optional(),
  placeId: z.string().optional(),
  territoryId: z.string().optional(),
  establishmentDate: z.string().optional(),
  socials: z
    .object({
      whatsapp: z.string().optional(),
      linkedin: z.string().optional(),
      twitter: z.string().optional(),
      facebook: z.string().optional(),
      instagram: z.string().optional()
    })
    .optional()
});

export type CompanyFormValues = z.infer<typeof companyFormSchema>;

type CompanyFormProps = {
  initialValues?: CompanyFormValues;
  isMutationLoading?: boolean;
  onSubmit: (data: CompanyFormValues) => void | Promise<void>;
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
      categoryId: "",
      placeId: "",
      territoryId: "",
      establishmentDate: "",
      socials: {
        whatsapp: "",
        linkedin: "",
        twitter: "",
        facebook: "",
        instagram: ""
      }
    },
    mode: "all"
  });

  useUnsavedChanges(form.formState.isDirty);

  const { data: categories = [], isLoading: isCategoriesLoading } =
    useCategories();
  const { createCategoryMutation } = useCategoryMutation();

  const { data: territories = [], isLoading: isTerritoriesLoading } =
    useTerritories();
  const { createTerritoryMutation } = useTerritoryMutation();

  const { data: places = [], isLoading: isPlacesLoading } = usePlaces();
  const { createPlaceMutation } = usePlaceMutation();

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

  return (
    <>
      <DashboardHeader
        title={pageTitle}
        description={pageDescription}
        actions={
          <Button
            size="sm"
            onClick={form.handleSubmit(onSubmit)}
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
            onSubmit={form.handleSubmit(onSubmit)}
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
              </div>

              {/* Right Column - Classification & Meta */}
              <div className="flex flex-col gap-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Info className="size-5 text-primary" />
                      <CardTitle>Classification</CardTitle>
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
                                <Calendar />
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
                      <MapPin className="size-5 text-primary" />
                      <CardTitle>Location</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="grid gap-4">
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

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Address</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Street address, city, postal code..."
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
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
