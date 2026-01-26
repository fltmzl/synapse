"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  EducationForm,
  EducationFormValues
} from "../components/education-form";
import useEducationMutation from "@/mutations/use-education-mutation";

export default function NewEducationPage() {
  const router = useRouter();
  const { createEducationMutation } = useEducationMutation();

  const onSubmit = async (data: EducationFormValues) => {
    await createEducationMutation.mutateAsync(data);
    router.push("/dashboard/admin-panel/educations");
  };

  return (
    <EducationForm
      onSubmit={onSubmit}
      isMutationLoading={createEducationMutation.isPending}
      pageTitle="New Education"
      pageDescription="Create a new educational institution"
    />
  );
}
