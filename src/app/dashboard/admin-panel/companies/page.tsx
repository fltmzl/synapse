"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { companyColumns } from "./components/company-columns";
import useCompanies from "@/queries/use-companies";

import { ColumnFiltersState } from "@tanstack/react-table";
import { useDebounce } from "@/hooks/use-debounce";

export default function CompaniesPage() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 50 });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const searchFilter =
    (columnFilters.find((f) => f.id === "name")?.value as string) || "";
  const debouncedSearch = useDebounce(searchFilter, 500);

  const { data: companiesResponse, isLoading } = useCompanies({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    search: debouncedSearch
  });

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [debouncedSearch]);

  const companies = companiesResponse?.data ?? [];
  const total = companiesResponse?.total ?? 0;

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
          tableOptions={{
            manualPagination: true,
            pageCount: Math.ceil(total / pagination.pageSize),
            manualFiltering: true,
            state: { pagination, columnFilters },
            onPaginationChange: setPagination,
            onColumnFiltersChange: setColumnFilters
          }}
        />
      </div>
    </>
  );
}
