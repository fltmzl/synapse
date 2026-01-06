"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { DataTable } from "@/components/data-table/data-table";
import { videoColumns } from "./components/video-columns";
import useVideos from "@/queries/use-videos";

export default function VideoReelsPage() {
  const { data: videos, isLoading } = useVideos();

  return (
    <>
      <DashboardHeader
        title="Video Reels"
        description="Manage your TikTok/Reels style videos"
        actions={
          <Button size="sm" asChild>
            <Link href="/dashboard/admin-panel/video-reels/new">
              <Plus className="size-4 mr-2" />
              New Video
            </Link>
          </Button>
        }
      />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <DataTable
          searchPlaceholder="Search by title..."
          data={videos || []}
          columns={videoColumns}
          headerAction={() => <></>}
          search="title"
          isLoading={isLoading}
          toolbarComponent={() => <></>}
        />
      </div>
    </>
  );
}
