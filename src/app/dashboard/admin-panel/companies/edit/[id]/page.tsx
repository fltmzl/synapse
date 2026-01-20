"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { CompanyForm, CompanyFormValues } from "../../components/company-form";
import useCompanyMutation from "@/mutations/use-company-mutation";
import useCompany from "@/queries/use-company";
import { UpdateCompanyDto } from "@/types/person-relation.type";

export default function EditCompanyPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { data: company, isLoading } = useCompany(id);
  const { updateCompanyMutation } = useCompanyMutation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Company not found</h2>
          <p className="text-muted-foreground">
            The company you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  const initialValues: CompanyFormValues = {
    name: company.name,
    idNumber: company.idNumber || "",
    code: company.code || "",
    phoneNumber: company.phoneNumber || "",
    email: company.email || "",
    website: company.website || "",
    description: company.description || "",
    profilePicture: company.profilePicture || "",
    address: company.address || "",
    categoryId: company.categoryId || "",
    placeId: company.placeId || "",
    territoryId: company.territoryId || "",
    establishmentDate:
      company.establishmentDate?.toDate?.()?.toISOString()?.split("T")[0] || "",
    socials: {
      whatsapp: company.socials?.whatsapp || "",
      linkedin: company.socials?.linkedin || "",
      twitter: company.socials?.twitter || "",
      facebook: company.socials?.facebook || "",
      instagram: company.socials?.instagram || ""
    }
  };

  const onSubmit = async (data: CompanyFormValues) => {
    const payload: UpdateCompanyDto = {
      ...data,
      establishmentDate: data.establishmentDate
        ? new Date(data.establishmentDate)
        : undefined
    };

    updateCompanyMutation.mutate(
      { id, data: payload },
      {
        onSuccess: () => {
          router.push("/dashboard/admin-panel/companies");
        }
      }
    );
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <CompanyForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        isMutationLoading={updateCompanyMutation.isPending}
        pageTitle="Edit Company"
        pageDescription={`Edit details for ${company.name}`}
      />
    </div>
  );
}
