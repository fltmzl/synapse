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
  const { updateCompanyMutation, updateCompanyWithRepresentativeMutation } =
    useCompanyMutation();

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
    zipCode: company.zipCode || "",
    city: company.city || "",
    implantation: company.implantation || "",
    categoryId: company.categoryId || "",
    placeId: company.placeId || "",
    territoryId: company.territoryId || "",
    establishmentDate:
      company.establishmentDate?.toDate?.()?.toISOString()?.split("T")[0] || "",
    sirenCode: company.sirenCode || "",
    legalStatus: company.legalStatus || "",
    nafCode: company.nafCode || "",
    activity: company.activity || "",
    economicalNumbers: {
      capital:
        company.economicalNumbers?.capital !== undefined &&
        company.economicalNumbers?.capital !== null &&
        company.economicalNumbers?.capital !== ""
          ? Number(company.economicalNumbers.capital)
          : null,
      financial_result:
        company.economicalNumbers?.financial_result !== undefined &&
        company.economicalNumbers?.financial_result !== null &&
        company.economicalNumbers?.financial_result !== ""
          ? Number(company.economicalNumbers.financial_result)
          : null,
      margin:
        company.economicalNumbers?.margin !== undefined &&
        company.economicalNumbers?.margin !== null &&
        company.economicalNumbers?.margin !== ""
          ? Number(company.economicalNumbers.margin)
          : null,
      number_of_employees:
        company.economicalNumbers?.number_of_employees !== undefined &&
        company.economicalNumbers?.number_of_employees !== null &&
        company.economicalNumbers?.number_of_employees !== ""
          ? Number(company.economicalNumbers.number_of_employees)
          : null,
      operating_profit:
        company.economicalNumbers?.operating_profit !== undefined &&
        company.economicalNumbers?.operating_profit !== null &&
        company.economicalNumbers?.operating_profit !== ""
          ? Number(company.economicalNumbers.operating_profit)
          : null,
      turnover:
        company.economicalNumbers?.turnover !== undefined &&
        company.economicalNumbers?.turnover !== null &&
        company.economicalNumbers?.turnover !== ""
          ? Number(company.economicalNumbers.turnover)
          : null
    },
    socials: {
      whatsapp: company.socials?.whatsapp || "",
      linkedin: company.socials?.linkedin || "",
      twitter: company.socials?.twitter || "",
      facebook: company.socials?.facebook || "",
      instagram: company.socials?.instagram || ""
    },
    authorizedRepresentativeId: company.authorizedRepresentativeId || ""
  };

  const onSubmit = async (
    data: CompanyFormValues,
    newRepresentativeName?: string
  ) => {
    if (newRepresentativeName && newRepresentativeName.trim()) {
      // Update company with new representative
      await updateCompanyWithRepresentativeMutation.mutateAsync({
        companyId: id,
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
      // Update company normally
      const payload: UpdateCompanyDto = {
        ...data,
        establishmentDate: data.establishmentDate
          ? new Date(data.establishmentDate)
          : undefined
      };

      await updateCompanyMutation.mutateAsync({ id, data: payload });
    }
    router.push("/dashboard/admin-panel/companies");
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <CompanyForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        isMutationLoading={
          updateCompanyMutation.isPending ||
          updateCompanyWithRepresentativeMutation.isPending
        }
        pageTitle="Edit Company"
        pageDescription={`Edit details for ${company.name}`}
      />
    </div>
  );
}
