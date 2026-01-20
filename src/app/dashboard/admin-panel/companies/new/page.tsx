"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CompanyForm, CompanyFormValues } from "../components/company-form";
import useCompanyMutation from "@/mutations/use-company-mutation";
import { CreateCompanyDto } from "@/types/person-relation.type";

export default function NewCompanyPage() {
  const router = useRouter();
  const { createCompanyMutation } = useCompanyMutation();

  const onSubmit = async (data: CompanyFormValues) => {
    const payload: CreateCompanyDto = {
      ...data,
      establishmentDate: data.establishmentDate
        ? new Date(data.establishmentDate)
        : undefined
    };

    createCompanyMutation.mutate(payload, {
      onSuccess: () => {
        router.push("/dashboard/admin-panel/companies");
      }
    });
  };

  return (
    <CompanyForm
      onSubmit={onSubmit}
      isMutationLoading={createCompanyMutation.isPending}
      pageTitle="New Company"
      pageDescription="Create a new company or organization"
    />
  );
}
