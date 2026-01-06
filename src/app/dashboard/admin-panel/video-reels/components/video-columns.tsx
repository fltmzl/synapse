"use client";

import { Video } from "@/types/video.type";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";
import { VideoActions } from "./video-actions";

export const videoColumns: ColumnDef<Video>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`/dashboard/admin-panel/video-reels/edit/${row.original.id}`}
        className="font-medium max-w-[200px] truncate hover:underline"
      >
        {row.getValue("title")}
      </Link>
    )
  },
  {
    accessorKey: "videoUrl",
    header: "Video URL",
    cell: ({ row }) => (
      <div className="text-muted-foreground max-w-[300px] truncate">
        {row.getValue("videoUrl")}
      </div>
    )
  },
  {
    accessorKey: "viewCount",
    header: "Views",
    cell: ({ row }) => (
      <div className="text-muted-foreground">
        {row.getValue("viewCount") || 0}
      </div>
    )
  },
  {
    accessorKey: "shareCount",
    header: "Shares",
    cell: ({ row }) => (
      <div className="text-muted-foreground">
        {row.getValue("shareCount") || 0}
      </div>
    )
  },
  {
    accessorKey: "engagementScore",
    header: "Score",
    cell: ({ row }) => (
      <div className="text-muted-foreground">
        {row.getValue("engagementScore") || 0}
      </div>
    )
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      const tags = row.original.tags || [];
      return (
        <div className="flex flex-wrap gap-1 max-w-[200px]">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-muted rounded-full text-[10px] font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      );
    }
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = row.original.createdAt?.toDate();
      return date ? format(date, "MMM dd, yyyy") : "-";
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <VideoActions video={row.original} />
  }
];
