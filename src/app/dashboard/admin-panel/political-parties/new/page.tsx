"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  PoliticalPartyForm,
  PoliticalPartyFormValues
} from "../components/political-party-form";
import usePoliticalPartyMutation from "@/mutations/use-political-party-mutation";

export default function NewPoliticalPartyPage() {
  const router = useRouter();
  const { createPoliticalPartyMutation } = usePoliticalPartyMutation();

  const onSubmit = async (data: PoliticalPartyFormValues) => {
    await createPoliticalPartyMutation.mutateAsync(data);
    router.push("/dashboard/admin-panel/political-parties");
  };

  return (
    <PoliticalPartyForm
      onSubmit={onSubmit}
      isMutationLoading={createPoliticalPartyMutation.isPending}
      pageTitle="New Political Party"
      pageDescription="Create a new political party"
    />
  );
}
