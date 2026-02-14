"use client";
import React from "react";
import { useRouter, useParams } from "next/navigation";
import {
  JumbotronForm,
  JumbotronFormValues
} from "../../components/jumbotron-form";
import useJumbotronMutation from "@/mutations/use-jumbotron-mutation";
import useJumbotrons from "@/queries/use-jumbotrons";
import { Spinner } from "@/components/spinner";

export default function EditJumbotronPage() {
  const router = useRouter();
  const { id } = useParams();
  const { data: jumbotrons, isLoading } = useJumbotrons();
  const { updateJumbotronMutation } = useJumbotronMutation();

  const jumbotron = jumbotrons?.find((j) => j.id === id);

  const onSubmit = async (data: JumbotronFormValues) => {
    await updateJumbotronMutation.mutateAsync({
      id: id as string,
      data
    });
    router.push("/dashboard/admin-panel/jumbotron");
  };

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (!jumbotron) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <p className="text-muted-foreground">Jumbotron not found</p>
      </div>
    );
  }

  return (
    <JumbotronForm
      initialValues={{
        title: jumbotron.title,
        mediaType: jumbotron.mediaType,
        mediaUrl: jumbotron.mediaUrl,
        thumbnailUrl: jumbotron.thumbnailUrl || "",
        isActive: jumbotron.isActive
      }}
      onSubmit={onSubmit}
      isMutationLoading={updateJumbotronMutation.isPending}
      pageTitle="Edit Jumbotron"
      pageDescription={`Edit: ${jumbotron.title}`}
    />
  );
}
