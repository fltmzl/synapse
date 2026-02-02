"use client";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { DataTable } from "@/components/data-table/data-table";
import { associationColumns } from "./components/association-columns";
import useAssociations from "@/queries/use-associations";

export default function AssociationsPage() {
  const { data: associations, isLoading } = useAssociations();

  return (
    <>
      <DashboardHeader
        title="Associations"
        description="Manage associations"
        actions={
          <Button size="sm" asChild>
            <Link href="/dashboard/admin-panel/associations/new">
              <Plus className="size-4 mr-2" />
              New Association
            </Link>
          </Button>
        }
      />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <DataTable
          searchPlaceholder="Search by name..."
          data={associations || []}
          columns={associationColumns}
          headerAction={() => <></>}
          search="name"
          isLoading={isLoading}
          toolbarComponent={() => <></>}
        />
      </div>
    </>
  );
}
