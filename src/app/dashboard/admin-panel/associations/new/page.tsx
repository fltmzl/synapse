"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  AssociationForm,
  AssociationFormValues
} from "../components/association-form";
import useAssociationMutation from "@/mutations/use-association-mutation";

export default function NewAssociationPage() {
  const router = useRouter();
  const { createAssociationMutation } = useAssociationMutation();

  const onSubmit = async (data: AssociationFormValues) => {
    await createAssociationMutation.mutateAsync({
      ...data,
      dateOfCreation: data.dateOfCreation
        ? new Date(data.dateOfCreation)
        : undefined,
      action: {
        numberOfEmployees: data.action?.numberOfEmployees ?? 0,
        numberOfMembers: data.action?.numberOfMembers ?? 0,
        budget: data.action?.budget ?? 0,
        cause: data.action?.cause || "",
        mainProject: data.action?.mainProject || ""
      }
    });
    router.push("/dashboard/admin-panel/associations");
  };

  return (
    <AssociationForm
      onSubmit={onSubmit}
      isMutationLoading={createAssociationMutation.isPending}
      pageTitle="New Association"
      pageDescription="Create a new association"
    />
  );
}
