"use client";
import React from "react";
import { useRouter, useParams } from "next/navigation";
import {
  AssociationForm,
  AssociationFormValues
} from "../../components/association-form";
import useAssociationMutation from "@/mutations/use-association-mutation";
import useAssociations from "@/queries/use-associations";
import { Spinner } from "@/components/spinner";

export default function EditAssociationPage() {
  const router = useRouter();
  const { id } = useParams();
  const { data: associations, isLoading } = useAssociations();
  const { updateAssociationMutation } = useAssociationMutation();

  const association = associations?.find((a) => a.id === id);

  const onSubmit = async (data: AssociationFormValues) => {
    await updateAssociationMutation.mutateAsync({
      id: id as string,
      data
    });
    router.push("/dashboard/admin-panel/associations");
  };

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (!association) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <p className="text-muted-foreground">Association not found</p>
      </div>
    );
  }

  return (
    <AssociationForm
      initialValues={{
        name: association.name,
        profilePicture: association.profilePicture || "",
        link: association.link || ""
      }}
      onSubmit={onSubmit}
      isMutationLoading={updateAssociationMutation.isPending}
      pageTitle="Edit Association"
      pageDescription={`Edit association: ${association.name}`}
    />
  );
}
