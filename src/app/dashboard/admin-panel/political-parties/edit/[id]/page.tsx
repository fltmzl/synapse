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

export default function EditPoliticalPartyPage() {
  const router = useRouter();
  const { id } = useParams();
  const { data: politicalParties, isLoading } = usePoliticalParties();
  const { updatePoliticalPartyMutation } = usePoliticalPartyMutation();

  const politicalParty = politicalParties?.find((p) => p.id === id);

  const onSubmit = async (data: PoliticalPartyFormValues) => {
    await updatePoliticalPartyMutation.mutateAsync({
      id: id as string,
      data
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

  return (
    <PoliticalPartyForm
      initialValues={{
        name: politicalParty.name,
        profilePicture: politicalParty.profilePicture || ""
      }}
      onSubmit={onSubmit}
      isMutationLoading={updatePoliticalPartyMutation.isPending}
      pageTitle="Edit Political Party"
      pageDescription={`Edit party: ${politicalParty.name}`}
    />
  );
}
