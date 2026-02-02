"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { DataTable } from "@/components/data-table/data-table";
import { companyColumns } from "./components/company-columns";
import useCompanies from "@/queries/use-companies";

export default function CompaniesPage() {
  const { data: companiesResponse, isLoading } = useCompanies();
  const companies = companiesResponse?.data ?? [];

  return (
    <>
      <DashboardHeader
        title="Companies"
        description="Manage companies and organizations"
        actions={
          <Button size="sm" asChild>
            <Link href="/dashboard/admin-panel/companies/new">
              <Plus className="size-4 mr-2" />
              New Company
            </Link>
          </Button>
        }
      />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <DataTable
          searchPlaceholder="Search by name..."
          data={companies || []}
          columns={companyColumns}
          headerAction={() => <></>}
          search="name"
          isLoading={isLoading}
          toolbarComponent={() => <></>}
        />
      </div>
    </>
  );
}
