"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { ImportDialog } from "./components/import-dialog";
import { DataTable } from "@/components/data-table/data-table";
import { personColumns } from "./components/person-columns";
import usePersonsPaginated from "@/queries/use-persons-paginated";

import { ColumnFiltersState } from "@tanstack/react-table";
import { useDebounce } from "@/hooks/use-debounce";

export default function PersonsPage() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 50 });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const searchFilter =
    (columnFilters.find((f) => f.id === "name")?.value as string) || "";
  const debouncedSearch = useDebounce(searchFilter, 500);

  const { data: personsResponse, isLoading } = usePersonsPaginated({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    search: debouncedSearch
  });

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [debouncedSearch]);

  const persons = personsResponse?.data ?? [];
  const total = personsResponse?.total ?? 0;

  return (
    <>
      <DashboardHeader
        title="Persons"
        description="Manage persons and their relations"
        actions={
          <div className="flex items-center gap-2">
            <ImportDialog />
            <Button size="sm" asChild>
              <Link href="/dashboard/admin-panel/persons/new">
                <Plus className="size-4 mr-2" />
                New Person
              </Link>
            </Button>
          </div>
        }
      />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <DataTable
          searchPlaceholder="Search by name..."
          data={persons || []}
          columns={personColumns}
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
