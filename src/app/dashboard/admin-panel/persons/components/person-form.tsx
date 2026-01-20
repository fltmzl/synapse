"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Briefcase,
  GraduationCap,
  Users,
  Flag
} from "lucide-react";
import React from "react";
import { useForm, useFieldArray, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useUnsavedChanges } from "@/hooks/use-unsaved-changes";
import { UnsavedChangesDialog } from "@/components/ui/unsaved-changes-dialog";
import { ComboboxCreate } from "@/components/ui/combobox-create";
import useCategories from "@/queries/use-categories";
import useCategoryMutation from "@/mutations/use-category-mutation";
import useTerritories from "@/queries/use-territories";
import useTerritoryMutation from "@/mutations/use-territory-mutation";
import usePlaces from "@/queries/use-places";
import usePlaceMutation from "@/mutations/use-place-mutation";
import useCompanies from "@/queries/use-companies";
import useEducations from "@/queries/use-educations";
import useEducationMutation from "@/mutations/use-education-mutation";
import useAssociations from "@/queries/use-associations";
import useAssociationMutation from "@/mutations/use-association-mutation";
import usePoliticalParties from "@/queries/use-political-parties";
import usePoliticalPartyMutation from "@/mutations/use-political-party-mutation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import useCompanyMutation from "@/mutations/use-company-mutation";

const DESCRIPTION_MAX_LENGTH = 1000;

export interface PersonFormValues {
  name: string;
  idNumber?: string;
  code?: string;
  phoneNumber?: string;
  countryCode?: string;
  email?: string;
  description?: string;
  profilePicture?: string;
  currentJobPosition?: string;
  categoryId?: string;
  placeId?: string;
  territoryId?: string;
  socials?: {
    whatsapp?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  companies: {
    companyId: string;
    title?: string;
    startDate?: string;
    endDate?: string;
    locationType?: string;
    employmentType?: string;
    description?: string;
  }[];
  educations: {
    educationId: string;
    major?: string;
    startDate?: string;
    endDate?: string;
    gpa?: number;
  }[];
  associations: {
    associationId: string;
    startDate?: string;
    endDate?: string;
  }[];
  politicalParties: {
    politicalPartyId: string;
    type: "supports" | "opposes";
  }[];
}

export const personFormSchema: z.ZodType<PersonFormValues> = z.object({
  name: z.string().min(1, "Name is required"),
  idNumber: z.string().optional(),
  code: z.string().optional(),
  phoneNumber: z.string().optional(),
  countryCode: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  description: z.string().max(DESCRIPTION_MAX_LENGTH).optional(),
  profilePicture: z.string().optional(),
  currentJobPosition: z.string().optional(),
  categoryId: z.string().optional(),
  placeId: z.string().optional(),
  territoryId: z.string().optional(),
  socials: z
    .object({
      whatsapp: z.string().optional(),
      linkedin: z.string().optional(),
      twitter: z.string().optional(),
      facebook: z.string().optional(),
      instagram: z.string().optional()
    })
    .optional(),
  companies: z.array(
    z.object({
      companyId: z.string().min(1, "Company is required"),
      title: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      locationType: z.string().optional(),
      employmentType: z.string().optional(),
      description: z.string().optional()
    })
  ),
  educations: z.array(
    z.object({
      educationId: z.string().min(1, "Education is required"),
      major: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      gpa: z.coerce.number().optional()
    })
  ),
  associations: z.array(
    z.object({
      associationId: z.string().min(1, "Association is required"),
      startDate: z.string().optional(),
      endDate: z.string().optional()
    })
  ),
  politicalParties: z.array(
    z.object({
      politicalPartyId: z.string().min(1, "Political Party is required"),
      type: z.enum(["supports", "opposes"])
    })
  )
});

type PersonFormProps = {
  initialValues?: PersonFormValues;
  isMutationLoading?: boolean;
  onSubmit: (data: PersonFormValues) => void | Promise<void>;
  pageTitle: string;
  pageDescription: string;
};

export function PersonForm({
  initialValues,
  isMutationLoading,
  onSubmit,
  pageTitle,
  pageDescription
}: PersonFormProps) {
  const form: UseFormReturn<PersonFormValues> = useForm<PersonFormValues>({
    resolver: zodResolver(personFormSchema) as any,
    defaultValues: initialValues || {
      name: "",
      idNumber: "",
      code: "",
      phoneNumber: "",
      countryCode: "",
      email: "",
      description: "",
      profilePicture: "",
      currentJobPosition: "",
      categoryId: "",
      placeId: "",
      territoryId: "",
      socials: {
        whatsapp: "",
        linkedin: "",
        twitter: "",
        facebook: "",
        instagram: ""
      },
      companies: [],
      educations: [],
      associations: [],
      politicalParties: []
    },
    mode: "all"
  });

  const {
    fields: companyFields,
    append: appendCompany,
    remove: removeCompany
  } = useFieldArray<PersonFormValues, "companies">({
    control: form.control,
    name: "companies"
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation
  } = useFieldArray<PersonFormValues, "educations">({
    control: form.control,
    name: "educations"
  });

  const {
    fields: associationFields,
    append: appendAssociation,
    remove: removeAssociation
  } = useFieldArray<PersonFormValues, "associations">({
    control: form.control,
    name: "associations"
  });

  const {
    fields: politicalPartyFields,
    append: appendPoliticalParty,
    remove: removePoliticalParty
  } = useFieldArray<PersonFormValues, "politicalParties">({
    control: form.control,
    name: "politicalParties"
  });

  const { data: categories = [], isLoading: isCategoriesLoading } =
    useCategories();
  const { createCategoryMutation } = useCategoryMutation();

  const { data: territories = [], isLoading: isTerritoriesLoading } =
    useTerritories();
  const { createTerritoryMutation } = useTerritoryMutation();

  const { data: places = [], isLoading: isPlacesLoading } = usePlaces();
  const { createPlaceMutation } = usePlaceMutation();

  const { data: companies = [], isLoading: isCompaniesLoading } =
    useCompanies();
  const { createCompanyMutation } = useCompanyMutation();

  const { data: educations = [], isLoading: isEducationsLoading } =
    useEducations();
  const { createEducationMutation } = useEducationMutation();

  const { data: associations = [], isLoading: isAssociationsLoading } =
    useAssociations();
  const { createAssociationMutation } = useAssociationMutation();

  const { data: politicalParties = [], isLoading: isPoliticalPartiesLoading } =
    usePoliticalParties();
  const { createPoliticalPartyMutation } = usePoliticalPartyMutation();

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

  const companyOptions = React.useMemo(
    () => companies.map((c) => ({ value: c.id, label: c.name })),
    [companies]
  );

  const educationOptions = React.useMemo(
    () => educations.map((e) => ({ value: e.id, label: e.name })),
    [educations]
  );

  const associationOptions = React.useMemo(
    () => associations.map((a) => ({ value: a.id, label: a.name })),
    [associations]
  );

  const politicalPartyOptions = React.useMemo(
    () => politicalParties.map((p) => ({ value: p.id, label: p.name })),
    [politicalParties]
  );

  const { showPrompt, confirmNavigation, cancelNavigation } = useUnsavedChanges(
    form.formState.isDirty
  );

  return (
    <>
      <UnsavedChangesDialog
        open={showPrompt}
        onConfirm={confirmNavigation}
        onCancel={cancelNavigation}
      />
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
            Save Person
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
              href="/dashboard/admin-panel/persons"
              className="flex items-center text-secondary text-sm w-fit hover:underline"
            >
              <ArrowLeft className="size-4 mr-2" />
              Back to persons
            </Link>

            {/* Profile Header Section */}
            <Card className="border-none shadow-none bg-transparent py-0">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                  <FormField
                    control={form.control}
                    name="profilePicture"
                    render={({ field }) => (
                      <FormItem className="flex-shrink-0">
                        <FormControl>
                          <ImageUpload
                            value={field.value}
                            onChange={field.onChange}
                            variant="circle"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <FormField
                      control={form.control}
                      name="idNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-medium">
                            ID Number
                          </FormLabel>
                          <FormControl>
                            <InputGroup>
                              <InputGroupInput
                                placeholder="Enter ID number"
                                {...field}
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
                          <FormLabel className="font-medium">Code</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter internal code"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-8">
              {/* Personal Information */}
              <Card>
                <CardHeader className="border-b pb-4">
                  <CardTitle className="text-lg">
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="label-required font-medium">
                            Name
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. John Doe" {...field} />
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
                          <FormLabel className="font-medium">Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. john.doe@example.com"
                              {...field}
                            />
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
                          <FormLabel className="font-medium">
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. 06 12 34 56 78"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="currentJobPosition"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-medium">
                            Current Job Position
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Software Engineer"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Biography */}
              <Card>
                <CardHeader className="border-b pb-4">
                  <CardTitle className="text-lg">Biography</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="e.g. A passionate software engineer with 5 years of experience..."
                            className="resize-none"
                            rows={6}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Basic Relations */}
              <Card>
                <CardHeader className="border-b pb-4">
                  <CardTitle className="text-lg">Basic Relations</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="territoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-medium">
                            Territory
                          </FormLabel>
                          <FormControl>
                            <ComboboxCreate
                              options={territoryOptions}
                              value={field.value}
                              onValueChange={field.onChange}
                              onCreate={(name) => {
                                createTerritoryMutation.mutate(name, {
                                  onSuccess: (newTerritory) => {
                                    if (newTerritory)
                                      field.onChange(newTerritory.id);
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
                          <FormLabel className="font-medium">Place</FormLabel>
                          <FormControl>
                            <ComboboxCreate
                              options={placeOptions}
                              value={field.value}
                              onValueChange={field.onChange}
                              onCreate={(name) => {
                                createPlaceMutation.mutate(name, {
                                  onSuccess: (newPlace) => {
                                    if (newPlace) field.onChange(newPlace.id);
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
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-medium">
                            Category
                          </FormLabel>
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
                  </div>
                </CardContent>
              </Card>

              {/* Work Experience (Companies) */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-2">
                    <Briefcase className="size-5 text-primary" />
                    <CardTitle className="text-lg">Work Experience</CardTitle>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      appendCompany({
                        companyId: "",
                        title: "",
                        startDate: "",
                        endDate: "",
                        employmentType: "",
                        locationType: "",
                        description: ""
                      })
                    }
                  >
                    <Plus className="size-4 mr-2" />
                    Add Experience
                  </Button>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  {companyFields.map((field, index) => (
                    <div key={field.id} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold">
                          Experience #{index + 1}
                        </h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => removeCompany(index)}
                        >
                          <Trash2 className="size-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`companies.${index}.companyId`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="label-required">
                                Company
                              </FormLabel>
                              <FormControl>
                                <ComboboxCreate
                                  options={companyOptions}
                                  value={field.value}
                                  onValueChange={field.onChange}
                                  onCreate={(name) => {
                                    createCompanyMutation.mutate(name, {
                                      onSuccess: (newCompany) => {
                                        if (newCompany)
                                          field.onChange(newCompany.id);
                                      }
                                    });
                                  }}
                                  placeholder="Select company"
                                  isCreating={createCompanyMutation.isPending}
                                  disabled={isCompaniesLoading}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`companies.${index}.title`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Job Title</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. CEO" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`companies.${index}.startDate`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Start Date</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`companies.${index}.endDate`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>End Date</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      {index < companyFields.length - 1 && (
                        <Separator className="my-4" />
                      )}
                    </div>
                  ))}
                  {companyFields.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No work experience added yet.
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Education */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="size-5 text-primary" />
                    <CardTitle className="text-lg">Education</CardTitle>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      appendEducation({
                        educationId: "",
                        major: "",
                        startDate: "",
                        endDate: "",
                        gpa: 0
                      })
                    }
                  >
                    <Plus className="size-4 mr-2" />
                    Add Education
                  </Button>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  {educationFields.map((field, index) => (
                    <div key={field.id} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold">
                          Education #{index + 1}
                        </h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => removeEducation(index)}
                        >
                          <Trash2 className="size-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`educations.${index}.educationId`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="label-required">
                                Institution
                              </FormLabel>
                              <FormControl>
                                <ComboboxCreate
                                  options={educationOptions}
                                  value={field.value}
                                  onValueChange={field.onChange}
                                  onCreate={(name) => {
                                    createEducationMutation.mutate(name, {
                                      onSuccess: (newEdu) => {
                                        if (newEdu) field.onChange(newEdu.id);
                                      }
                                    });
                                  }}
                                  placeholder="Select institution"
                                  isCreating={createEducationMutation.isPending}
                                  disabled={isEducationsLoading}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`educations.${index}.major`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Major</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. Computer Science"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`educations.${index}.startDate`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Start Date</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`educations.${index}.endDate`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>End Date</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      {index < educationFields.length - 1 && (
                        <Separator className="my-4" />
                      )}
                    </div>
                  ))}
                  {educationFields.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No education added yet.
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Associations */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-2">
                    <Users className="size-5 text-primary" />
                    <CardTitle className="text-lg">Associations</CardTitle>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      appendAssociation({
                        associationId: "",
                        startDate: "",
                        endDate: ""
                      })
                    }
                  >
                    <Plus className="size-4 mr-2" />
                    Add Association
                  </Button>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  {associationFields.map((field, index) => (
                    <div key={field.id} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold">
                          Association #{index + 1}
                        </h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => removeAssociation(index)}
                        >
                          <Trash2 className="size-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`associations.${index}.associationId`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="label-required">
                                Association
                              </FormLabel>
                              <FormControl>
                                <ComboboxCreate
                                  options={associationOptions}
                                  value={field.value}
                                  onValueChange={field.onChange}
                                  onCreate={(name) => {
                                    createAssociationMutation.mutate(name, {
                                      onSuccess: (newAssoc) => {
                                        if (newAssoc)
                                          field.onChange(newAssoc.id);
                                      }
                                    });
                                  }}
                                  placeholder="Select association"
                                  isCreating={
                                    createAssociationMutation.isPending
                                  }
                                  disabled={isAssociationsLoading}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <FormField
                            control={form.control}
                            name={`associations.${index}.startDate`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`associations.${index}.endDate`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>End Date</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      {index < associationFields.length - 1 && (
                        <Separator className="my-4" />
                      )}
                    </div>
                  ))}
                  {associationFields.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No associations added yet.
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Political Parties */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-2">
                    <Flag className="size-5 text-primary" />
                    <CardTitle className="text-lg">Political Parties</CardTitle>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      appendPoliticalParty({
                        politicalPartyId: "",
                        type: "supports"
                      })
                    }
                  >
                    <Plus className="size-4 mr-2" />
                    Add Party
                  </Button>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  {politicalPartyFields.map((field, index) => (
                    <div key={field.id} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold">
                          Party Relation #{index + 1}
                        </h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => removePoliticalParty(index)}
                        >
                          <Trash2 className="size-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`politicalParties.${index}.politicalPartyId`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="label-required">
                                Political Party
                              </FormLabel>
                              <FormControl>
                                <ComboboxCreate
                                  options={politicalPartyOptions}
                                  value={field.value}
                                  onValueChange={field.onChange}
                                  onCreate={(name) => {
                                    createPoliticalPartyMutation.mutate(name, {
                                      onSuccess: (newParty) => {
                                        if (newParty)
                                          field.onChange(newParty.id);
                                      }
                                    });
                                  }}
                                  placeholder="Select party"
                                  isCreating={
                                    createPoliticalPartyMutation.isPending
                                  }
                                  disabled={isPoliticalPartiesLoading}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`politicalParties.${index}.type`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="label-required">
                                Relation Type
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="supports">
                                    Supports
                                  </SelectItem>
                                  <SelectItem value="opposes">
                                    Opposes
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      {index < politicalPartyFields.length - 1 && (
                        <Separator className="my-4" />
                      )}
                    </div>
                  ))}
                  {politicalPartyFields.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No political party relations added yet.
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card>
                <CardHeader className="border-b pb-4">
                  <CardTitle className="text-lg">Social Media</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="socials.whatsapp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-medium text-xs">
                            WhatsApp
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 628123456789" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="socials.linkedin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-medium text-xs">
                            LinkedIn
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. https://linkedin.com/in/johndoe"
                              {...field}
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
                          <FormLabel className="font-medium text-xs">
                            Twitter
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. https://twitter.com/johndoe"
                              {...field}
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
                          <FormLabel className="font-medium text-xs">
                            Facebook
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. https://facebook.com/johndoe"
                              {...field}
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
                          <FormLabel className="font-medium text-xs">
                            Instagram
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. https://instagram.com/johndoe"
                              {...field}
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
          </form>
        </Form>
      </div>
    </>
  );
}
