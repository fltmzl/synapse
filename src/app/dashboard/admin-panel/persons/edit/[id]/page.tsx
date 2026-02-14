/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { PersonForm, PersonFormValues } from "../../components/person-form";
import usePersonMutation from "@/mutations/use-person-mutation";
import usePerson from "@/queries/use-person";
import { Spinner } from "@/components/spinner";

export default function EditPersonPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.id as string;

  const { data: person, isLoading } = usePerson(slug);
  const { updatePersonMutation } = usePersonMutation();

  const onSubmit = (data: PersonFormValues) => {
    const {
      companies,
      educations,
      associations,
      politicalParties,
      ...personData
    } = data;

    updatePersonMutation.mutate(
      {
        id: person?.id || "",
        data: {
          person: personData,
          companies: companies.map((c) => ({
            ...c,
            employmentType: c.employmentType as any,
            startDate: c.startDate ? new Date(c.startDate) : undefined,
            endDate: c.endDate ? new Date(c.endDate) : undefined
          })),
          educations: educations.map((e) => ({
            ...e,
            startDate: e.startDate ? new Date(e.startDate) : undefined,
            endDate: e.endDate ? new Date(e.endDate) : undefined
          })),
          associations: associations.map((a) => ({
            ...a,
            startDate: a.startDate ? new Date(a.startDate) : undefined,
            endDate: a.endDate ? new Date(a.endDate) : undefined
          })),
          politicalParties: politicalParties.map((p) => ({
            ...p,
            title: p.title || ""
          }))
        }
      },
      {
        onSuccess: () => {
          router.push("/dashboard/admin-panel/persons");
        }
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (!person) {
    return (
      <div className="flex h-[400px] items-center justify-center text-muted-foreground">
        Person not found.
      </div>
    );
  }

  // Map person data to form values
  const initialValues: PersonFormValues = {
    name: person.name,
    idNumber: person.idNumber || "",
    code: person.code || "",
    phoneNumber: person.phoneNumber || "",
    countryCode: person.countryCode || "",
    email: person.email || "",
    description: person.description || "",
    profilePicture: person.profilePicture || "",
    currentJobPosition: person.currentJobPosition || "",
    categoryId: person.categoryId || "",
    placeId: person.placeId || "",
    territoryId: person.territoryId || "",
    socials: {
      whatsapp: person.socials?.whatsapp || "",
      linkedin: person.socials?.linkedin || "",
      twitter: person.socials?.twitter || "",
      facebook: person.socials?.facebook || "",
      instagram: person.socials?.instagram || ""
    },
    companies:
      person.companies?.map((c) => ({
        companyId: c.companyId,
        title: c.title || "",
        startDate: c.startDate?.toDate?.()?.toISOString()?.split("T")[0] || "",
        endDate: c.endDate?.toDate?.()?.toISOString()?.split("T")[0] || "",
        locationType: c.locationType || "",
        employmentType: c.employmentType || "",
        description: c.description || ""
      })) || [],
    educations:
      person.educations?.map((e) => ({
        educationId: e.educationId,
        major: e.major || "",
        startDate: e.startDate?.toDate?.()?.toISOString()?.split("T")[0] || "",
        endDate: e.endDate?.toDate?.()?.toISOString()?.split("T")[0] || "",
        gpa: e.gpa
      })) || [],
    associations:
      person.associations?.map((a) => ({
        associationId: a.associationId,
        startDate: a.startDate?.toDate?.()?.toISOString()?.split("T")[0] || "",
        endDate: a.endDate?.toDate?.()?.toISOString()?.split("T")[0] || ""
      })) || [],
    politicalParties:
      person.politicalParties?.map((p) => ({
        politicalPartyId: p.politicalPartyId,
        type: p.type,
        title: p.title
      })) || []
  };

  return (
    <PersonForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      isMutationLoading={updatePersonMutation.isPending}
      pageTitle={`Edit Person: ${person.name}`}
      pageDescription="Update person information and socials"
    />
  );
}
