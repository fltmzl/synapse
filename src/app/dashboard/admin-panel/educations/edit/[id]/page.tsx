"use client";
import React from "react";
import { useRouter, useParams } from "next/navigation";
import {
  EducationForm,
  EducationFormValues
} from "../../components/education-form";
import useEducationMutation from "@/mutations/use-education-mutation";
import useEducations from "@/queries/use-educations";
import { Spinner } from "@/components/spinner";
import { Timestamp } from "firebase/firestore";

export default function EditEducationPage() {
  const router = useRouter();
  const { id } = useParams();
  const { data: educations, isLoading } = useEducations();
  const { updateEducationMutation } = useEducationMutation();

  const education = educations?.find((e) => e.id === id);

  const onSubmit = async (data: EducationFormValues) => {
    await updateEducationMutation.mutateAsync({
      id: id as string,
      data: {
        ...data,
        dateOfCreation: data.dateOfCreation
          ? new Date(data.dateOfCreation)
          : undefined
      }
    });
    router.push("/dashboard/admin-panel/educations");
  };

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (!education) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <p className="text-muted-foreground">Education not found</p>
      </div>
    );
  }

  // Convert Firestore Timestamp to date string for the form
  const dateOfCreation = education.dateOfCreation
    ? education.dateOfCreation instanceof Timestamp
      ? education.dateOfCreation.toDate().toISOString().split("T")[0]
      : ""
    : "";

  return (
    <EducationForm
      initialValues={{
        name: education.name,
        profilePicture: education.profilePicture || "",
        description: education.description || "",
        street: education.street || "",
        zipCode: education.zipCode || "",
        city: education.city || "",
        implantation: education.implantation || "",
        territoryId: education.territoryId || "",
        phone: education.phone || "",
        email: education.email || "",
        website: education.website || "",
        registrationCode: education.registrationCode || "",
        dateOfCreation,
        authorizedRepresentativeId: education.authorizedRepresentativeId || ""
      }}
      onSubmit={onSubmit}
      isMutationLoading={updateEducationMutation.isPending}
      pageTitle="Edit Education"
      pageDescription={`Edit institution: ${education.name}`}
    />
  );
}
