"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { DataTable } from "@/components/data-table/data-table";
import { articleColumns } from "./components/article-columns";
import useArticles from "@/queries/use-articles";

export default function ArticlePage() {
  const { data: articles, isLoading } = useArticles();

  const HeaderAction = () => (
    <Button size="sm" asChild>
      <Link href="/dashboard/admin-panel/article/new">
        <Plus className="size-4 mr-2" />
        New Article
      </Link>
    </Button>
  );

  return (
    <>
      <DashboardHeader
        title="Article"
        description="Create and manage articles"
      />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <DataTable
          tableTitle="Articles"
          searchPlaceholder="Search by title..."
          data={articles || []}
          columns={articleColumns}
          headerAction={HeaderAction}
          search="title"
          isLoading={isLoading}
          toolbarComponent={() => <></>}
        />
      </div>
    </>
  );
}
