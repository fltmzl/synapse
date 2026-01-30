"use client";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { DataTable } from "@/components/data-table/data-table";
import { politicalPartyColumns } from "./components/political-party-columns";
import usePoliticalParties from "@/queries/use-political-parties";

export default function PoliticalPartiesPage() {
  const { data: politicalParties, isLoading } = usePoliticalParties();

  return (
    <>
      <DashboardHeader
        title="Political Parties"
        description="Manage political parties"
        actions={
          <Button size="sm" asChild>
            <Link href="/dashboard/admin-panel/political-parties/new">
              <Plus className="size-4 mr-2" />
              New Political Party
            </Link>
          </Button>
        }
      />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <DataTable
          searchPlaceholder="Search by name..."
          data={politicalParties || []}
          columns={politicalPartyColumns}
          headerAction={() => <></>}
          search="name"
          isLoading={isLoading}
          toolbarComponent={() => <></>}
        />
      </div>
    </>
  );
}
