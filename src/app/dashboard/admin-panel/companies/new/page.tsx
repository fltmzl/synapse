"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CompanyForm, CompanyFormValues } from "../components/company-form";
import useCompanyMutation from "@/mutations/use-company-mutation";
import { CreateCompanyDto } from "@/types/person-relation.type";

export default function NewCompanyPage() {
  const router = useRouter();
  const { createCompanyMutation, createCompanyWithRepresentativeMutation } =
    useCompanyMutation();

  const onSubmit = async (
    data: CompanyFormValues,
    newRepresentativeName?: string
  ) => {
    if (newRepresentativeName && newRepresentativeName.trim()) {
      // Create company with new representative
      await createCompanyWithRepresentativeMutation.mutateAsync({
        company: {
          ...data,
          establishmentDate: data.establishmentDate
            ? new Date(data.establishmentDate)
            : undefined,
          authorizedRepresentativeId: undefined // Will be set by the service
        },
        representative: {
          name: newRepresentativeName.trim()
        }
      });
    } else {
      // Create company normally
      const payload: CreateCompanyDto = {
        ...data,
        establishmentDate: data.establishmentDate
          ? new Date(data.establishmentDate)
          : undefined
      };
      await createCompanyMutation.mutateAsync(payload);
    }
    router.push("/dashboard/admin-panel/companies");
  };

  return (
    <CompanyForm
      onSubmit={onSubmit}
      isMutationLoading={
        createCompanyMutation.isPending ||
        createCompanyWithRepresentativeMutation.isPending
      }
      pageTitle="New Company"
      pageDescription="Create a new company or organization"
    />
  );
}
