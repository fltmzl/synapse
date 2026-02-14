"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { DataTable } from "@/components/data-table/data-table";
import { jumbotronColumns } from "./components/jumbotron-columns";
import useJumbotrons from "@/queries/use-jumbotrons";

export default function JumbotronPage() {
  const { data: jumbotrons, isLoading } = useJumbotrons();

  return (
    <>
      <DashboardHeader
        title="Jumbotron"
        description="Manage the hero media displayed on the landing page"
        actions={
          <Button size="sm" asChild>
            <Link href="/dashboard/admin-panel/jumbotron/new">
              <Plus className="size-4 mr-2" />
              New Jumbotron
            </Link>
          </Button>
        }
      />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <DataTable
          searchPlaceholder="Search by title..."
          data={jumbotrons || []}
          columns={jumbotronColumns}
          headerAction={() => <></>}
          search="title"
          isLoading={isLoading}
          toolbarComponent={() => <></>}
        />
      </div>
    </>
  );
}
