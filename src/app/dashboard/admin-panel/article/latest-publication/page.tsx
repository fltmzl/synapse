"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { DataTable } from "@/components/data-table/data-table";
import { articleColumns } from "./components/article-columns";
import useArticles from "@/queries/use-articles";

export default function LatestPublicationPage() {
  const { data: articles, isLoading } = useArticles({
    sectionCategory: "latest_publication"
  });

  return (
    <>
      <DashboardHeader
        title="Latest Publication / Les dernières publications"
        description="Create and manage latest publications"
        actions={
          <Button size="sm" asChild>
            <Link href="/dashboard/admin-panel/latest-publication/new">
              <Plus className="size-4 mr-2" />
              New Publication
            </Link>
          </Button>
        }
      />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <DataTable
          searchPlaceholder="Search by title..."
          data={articles || []}
          columns={articleColumns}
          headerAction={() => <></>}
          search="title"
          isLoading={isLoading}
          toolbarComponent={() => <></>}
        />
      </div>
    </>
  );
}
