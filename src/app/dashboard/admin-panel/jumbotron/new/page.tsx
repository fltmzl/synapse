"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  JumbotronForm,
  JumbotronFormValues
} from "../components/jumbotron-form";
import useJumbotronMutation from "@/mutations/use-jumbotron-mutation";

export default function NewJumbotronPage() {
  const router = useRouter();
  const { createJumbotronMutation } = useJumbotronMutation();

  const onSubmit = async (data: JumbotronFormValues) => {
    await createJumbotronMutation.mutateAsync(data);
    router.push("/dashboard/admin-panel/jumbotron");
  };

  return (
    <JumbotronForm
      onSubmit={onSubmit}
      isMutationLoading={createJumbotronMutation.isPending}
      pageTitle="New Jumbotron"
      pageDescription="Create a new hero media for the landing page"
    />
  );
}
