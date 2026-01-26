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

export default function EditEducationPage() {
  const router = useRouter();
  const { id } = useParams();
  const { data: educations, isLoading } = useEducations();
  const { updateEducationMutation } = useEducationMutation();

  const education = educations?.find((e) => e.id === id);

  const onSubmit = async (data: EducationFormValues) => {
    await updateEducationMutation.mutateAsync({
      id: id as string,
      data
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

  return (
    <EducationForm
      initialValues={{
        name: education.name,
        description: education.description || "",
        profilePicture: education.profilePicture || "",
        link: education.link || ""
      }}
      onSubmit={onSubmit}
      isMutationLoading={updateEducationMutation.isPending}
      pageTitle="Edit Education"
      pageDescription={`Edit institution: ${education.name}`}
    />
  );
}
