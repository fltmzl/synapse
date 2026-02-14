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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Flag,
  Info,
  Save,
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Globe,
  Calendar,
  Users,
  ShieldCheck
} from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useUnsavedChanges } from "@/hooks/use-unsaved-changes";
import { DashboardHeader } from "@/components/dashboard-header";
import { Spinner } from "@/components/spinner";
import { ImageUpload } from "@/components/ui/image-upload";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from "@/components/ui/input-group";
import { ComboboxCreate } from "@/components/ui/combobox-create";
import useTerritories from "@/queries/use-territories";
import useTerritoryMutation from "@/mutations/use-territory-mutation";
import usePersons from "@/queries/use-persons";

const DESCRIPTION_MAX_LENGTH = 500;

export const politicalPartyFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  profilePicture: z.string().optional(),
  description: z.string().max(DESCRIPTION_MAX_LENGTH).optional(),
  street: z.string().optional(),
  zipCode: z.string().optional(),
  city: z.string().optional(),
  implantation: z.string().optional(),
  territoryId: z.string().optional(),
  phone: z.string().optional(),
  email: z.email("Invalid email").optional().or(z.literal("")),
  website: z.url("Invalid URL").optional().or(z.literal("")),
  registrationCode: z.string().optional(),
  dateOfCreation: z.string().optional(),
  authorizedRepresentativeId: z.string().optional(),
  members: z.object({
    numberOfMembers: z.number().min(0).nullable(),
    numberOfCandidates: z.number().min(0).nullable(),
    numberOfElected: z.number().min(0).nullable()
  })
});

export type PoliticalPartyFormValues = z.infer<typeof politicalPartyFormSchema>;

type PoliticalPartyFormProps = {
  initialValues?: PoliticalPartyFormValues;
  isMutationLoading?: boolean;
  onSubmit: (
    data: PoliticalPartyFormValues,
    newRepresentativeName?: string
  ) => void | Promise<void>;
  pageTitle: string;
  pageDescription: string;
};

export function PoliticalPartyForm({
  initialValues,
  isMutationLoading,
  onSubmit,
  pageTitle,
  pageDescription
}: PoliticalPartyFormProps) {
  const form = useForm<PoliticalPartyFormValues>({
    resolver: zodResolver(politicalPartyFormSchema),
    defaultValues: initialValues || {
      name: "",
      profilePicture: "",
      description: "",
      street: "",
      zipCode: "",
      city: "",
      implantation: "",
      territoryId: "",
      phone: "",
      email: "",
      website: "",
      registrationCode: "",
      dateOfCreation: "",
      authorizedRepresentativeId: "",
      members: {
        numberOfMembers: null,
        numberOfCandidates: null,
        numberOfElected: null
      }
    },
    mode: "all"
  });

  useUnsavedChanges(form.formState.isDirty);

  const { data: territories = [], isLoading: isTerritoriesLoading } =
    useTerritories();
  const { createTerritoryMutation } = useTerritoryMutation();

  const { data: persons = [], isLoading: isPersonsLoading } = usePersons();
  const [newRepresentativeName, setNewRepresentativeName] = React.useState("");

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

  const territoryOptions = React.useMemo(
    () => territories.map((t) => ({ value: t.id, label: t.name })),
    [territories]
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
            onClick={form.handleSubmit((data: PoliticalPartyFormValues) =>
              onSubmit(data, newRepresentativeName)
            )}
            disabled={isMutationLoading}
          >
            {isMutationLoading ? <Spinner /> : <Save className="size-4 mr-2" />}
            Save Political Party
          </Button>
        }
      />

      <div className="flex flex-1 flex-col p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data: PoliticalPartyFormValues) =>
              onSubmit(data, newRepresentativeName)
            )}
            className="space-y-8 w-full max-w-4xl mx-auto"
          >
            <Link
              href="/dashboard/admin-panel/political-parties"
              className="flex items-center text-secondary text-sm w-fit hover:underline"
            >
              <ArrowLeft className="size-4 mr-2" />
              Back to political parties
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Left Column - Main Info */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Flag className="size-5 text-primary" />
                      <CardTitle>Basic Information</CardTitle>
                    </div>
                    <CardDescription className="mt-1">
                      General information about the political party
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                      <FormField
                        control={form.control}
                        name="profilePicture"
                        render={({ field }) => (
                          <FormItem>
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
                                Party Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. Republican Party"
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
                          name="registrationCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Registration Code</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. W123456789"
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
                                    setNewRepresentativeName("");
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
                              placeholder="Brief description of the political party..."
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
                      <CardTitle>Contact Information</CardTitle>
                    </div>
                    <CardDescription className="mt-1">
                      How to reach the political party
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
                                  placeholder="contact@party.com"
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
                        name="phone"
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
                                placeholder="https://www.party.com"
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
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Users className="size-5 text-primary" />
                      <CardTitle>Members</CardTitle>
                    </div>
                    <CardDescription className="mt-1">
                      Membership statistics for the political party
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="members.numberOfMembers"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Members</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={0}
                                placeholder="0"
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
                        name="members.numberOfCandidates"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Candidates</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={0}
                                placeholder="0"
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
                        name="members.numberOfElected"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Elected</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={0}
                                placeholder="0"
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

              {/* Right Column - Location & Classification */}
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
                      name="street"
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
                      name="dateOfCreation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Creation</FormLabel>
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
                    <div className="text-sm text-muted-foreground">
                      Political Parties are used to track the political
                      affiliations of persons in the system.
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
