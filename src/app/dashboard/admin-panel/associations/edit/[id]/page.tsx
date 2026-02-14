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
import { Timestamp } from "firebase/firestore";

export default function EditAssociationPage() {
  const router = useRouter();
  const { id } = useParams();
  const { data: associations, isLoading } = useAssociations();
  const { updateAssociationMutation } = useAssociationMutation();

  const association = associations?.find((a) => a.id === id);

  const onSubmit = async (data: AssociationFormValues) => {
    await updateAssociationMutation.mutateAsync({
      id: id as string,
      data: {
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
      }
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

  // Convert Firestore Timestamp to date string for the form
  const dateOfCreation = association.dateOfCreation
    ? association.dateOfCreation instanceof Timestamp
      ? association.dateOfCreation.toDate().toISOString().split("T")[0]
      : ""
    : "";

  return (
    <AssociationForm
      initialValues={{
        name: association.name,
        profilePicture: association.profilePicture || "",
        description: association.description || "",
        activity: association.activity || "",
        street: association.street || "",
        zipCode: association.zipCode || "",
        city: association.city || "",
        implantation: association.implantation || "",
        territoryId: association.territoryId || "",
        phone: association.phone || "",
        email: association.email || "",
        website: association.website || "",
        registrationCode: association.registrationCode || "",
        dateOfCreation,
        authorizedRepresentativeId:
          association.authorizedRepresentativeId || "",
        action: {
          numberOfEmployees: association.action?.numberOfEmployees ?? null,
          numberOfMembers: association.action?.numberOfMembers ?? null,
          budget: association.action?.budget ?? null,
          cause: association.action?.cause || "",
          mainProject: association.action?.mainProject || ""
        }
      }}
      onSubmit={onSubmit}
      isMutationLoading={updateAssociationMutation.isPending}
      pageTitle="Edit Association"
      pageDescription={`Edit association: ${association.name}`}
    />
  );
}
