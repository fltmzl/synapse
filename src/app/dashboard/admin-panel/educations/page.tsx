"use client";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { DataTable } from "@/components/data-table/data-table";
import { educationColumns } from "./components/education-columns";
import useEducations from "@/queries/use-educations";

export default function EducationsPage() {
  const { data: educations, isLoading } = useEducations();

  return (
    <>
      <DashboardHeader
        title="Educations"
        description="Manage educational institutions"
        actions={
          <Button size="sm" asChild>
            <Link href="/dashboard/admin-panel/educations/new">
              <Plus className="size-4 mr-2" />
              New Education
            </Link>
          </Button>
        }
      />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <DataTable
          searchPlaceholder="Search by name..."
          data={educations || []}
          columns={educationColumns}
          headerAction={() => <></>}
          search="name"
          isLoading={isLoading}
          toolbarComponent={() => <></>}
        />
      </div>
    </>
  );
}
