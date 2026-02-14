"use client";
import React from "react";
import { useRouter, useParams } from "next/navigation";
import {
  PoliticalPartyForm,
  PoliticalPartyFormValues
} from "../../components/political-party-form";
import usePoliticalPartyMutation from "@/mutations/use-political-party-mutation";
import usePoliticalParties from "@/queries/use-political-parties";
import { Spinner } from "@/components/spinner";
import { Timestamp } from "firebase/firestore";

export default function EditPoliticalPartyPage() {
  const router = useRouter();
  const { id } = useParams();
  const { data: politicalParties, isLoading } = usePoliticalParties();
  const { updatePoliticalPartyMutation } = usePoliticalPartyMutation();

  const politicalParty = politicalParties?.find((p) => p.id === id);

  const onSubmit = async (data: PoliticalPartyFormValues) => {
    await updatePoliticalPartyMutation.mutateAsync({
      id: id as string,
      data: {
        ...data,
        dateOfCreation: data.dateOfCreation
          ? new Date(data.dateOfCreation)
          : undefined,
        members: {
          numberOfMembers: data.members?.numberOfMembers ?? 0,
          numberOfCandidates: data.members?.numberOfCandidates ?? 0,
          numberOfElected: data.members?.numberOfElected ?? 0
        }
      }
    });
    router.push("/dashboard/admin-panel/political-parties");
  };

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (!politicalParty) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <p className="text-muted-foreground">Political Party not found</p>
      </div>
    );
  }

  // Convert Firestore Timestamp to date string for the form
  const dateOfCreation = politicalParty.dateOfCreation
    ? politicalParty.dateOfCreation instanceof Timestamp
      ? politicalParty.dateOfCreation.toDate().toISOString().split("T")[0]
      : ""
    : "";

  return (
    <PoliticalPartyForm
      initialValues={{
        name: politicalParty.name,
        profilePicture: politicalParty.profilePicture || "",
        description: politicalParty.description || "",
        street: politicalParty.street || "",
        zipCode: politicalParty.zipCode || "",
        city: politicalParty.city || "",
        implantation: politicalParty.implantation || "",
        territoryId: politicalParty.territoryId || "",
        phone: politicalParty.phone || "",
        email: politicalParty.email || "",
        website: politicalParty.website || "",
        registrationCode: politicalParty.registrationCode || "",
        dateOfCreation,
        authorizedRepresentativeId:
          politicalParty.authorizedRepresentativeId || "",
        members: {
          numberOfMembers: politicalParty.members?.numberOfMembers ?? null,
          numberOfCandidates:
            politicalParty.members?.numberOfCandidates ?? null,
          numberOfElected: politicalParty.members?.numberOfElected ?? null
        }
      }}
      onSubmit={onSubmit}
      isMutationLoading={updatePoliticalPartyMutation.isPending}
      pageTitle="Edit Political Party"
      pageDescription={`Edit party: ${politicalParty.name}`}
    />
  );
}
