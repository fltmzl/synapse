"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { DataTable } from "@/components/data-table/data-table";
import { personColumns } from "./components/person-columns";
import usePersons from "@/queries/use-persons";

export default function PersonsPage() {
  const { data: persons, isLoading } = usePersons();

  return (
    <>
      <DashboardHeader
        title="Persons"
        description="Manage persons and their relations"
        actions={
          <Button size="sm" asChild>
            <Link href="/dashboard/admin-panel/persons/new">
              <Plus className="size-4 mr-2" />
              New Person
            </Link>
          </Button>
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
        />
      </div>
    </>
  );
}
