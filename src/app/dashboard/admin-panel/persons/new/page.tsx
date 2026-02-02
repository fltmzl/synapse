"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { PersonForm, PersonFormValues } from "../components/person-form";
import usePersonMutation from "@/mutations/use-person-mutation";
import {
  CompanyPersonEmploymentType,
  CreatePersonWithRelationsDto
} from "@/types/person-relation.type";

export default function NewPersonPage() {
  const router = useRouter();
  const { createPersonWithRelationsMutation } = usePersonMutation();

  const onSubmit = (data: PersonFormValues) => {
    // Convert string dates to Date objects for the DTO
    const payload: CreatePersonWithRelationsDto = {
      person: {
        name: data.name,
        idNumber: data.idNumber,
        code: data.code,
        phoneNumber: data.phoneNumber,
        countryCode: data.countryCode,
        email: data.email,
        description: data.description,
        profilePicture: data.profilePicture,
        currentJobPosition: data.currentJobPosition,
        categoryId: data.categoryId,
        placeId: data.placeId,
        territoryId: data.territoryId,
        socials: data.socials
      },
      companies: data.companies.map((c) => ({
        ...c,
        startDate: c.startDate ? new Date(c.startDate) : undefined,
        endDate: c.endDate ? new Date(c.endDate) : undefined,
        employmentType: c.employmentType
          ? (c.employmentType as CompanyPersonEmploymentType)
          : undefined
      })),
      educations: data.educations.map((e) => ({
        ...e,
        startDate: e.startDate ? new Date(e.startDate) : undefined,
        endDate: e.endDate ? new Date(e.endDate) : undefined
      })),
      associations: data.associations.map((a) => ({
        ...a,
        startDate: a.startDate ? new Date(a.startDate) : undefined,
        endDate: a.endDate ? new Date(a.endDate) : undefined
      })),
      politicalParties: data.politicalParties
    };

    createPersonWithRelationsMutation.mutate(payload, {
      onSuccess: () => {
        router.push("/dashboard/admin-panel/persons");
      }
    });
  };

  return (
    <PersonForm
      onSubmit={onSubmit}
      isMutationLoading={createPersonWithRelationsMutation.isPending}
      pageTitle="New Person"
      pageDescription="Create a new person record with all relations"
    />
  );
}
