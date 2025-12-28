"use client";

import { Badge } from "@/components/ui/badge";
import { Article } from "@/types/article.type";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArticleActions } from "./article-actions";
import Image from "next/image";

export const articleColumns: ColumnDef<Article>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`/dashboard/admin-panel/latest-publication/edit/${row.original.id}`}
        className="font-medium max-w-[100px] truncate hover:underline"
      >
        {row.getValue("title")}
      </Link>
    )
  },
  {
    accessorKey: "coverImage",
    header: "Cover Image",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {row.original.coverImage ? (
          <Image
            src={row.getValue("coverImage") as string}
            alt={row.getValue("title") as string}
            width={50}
            height={50}
            className="rounded-sm object-contain bg-muted"
          />
        ) : (
          <div className="bg-muted w-13 h-9 rounded-sm text-muted-foreground text-[7px] grid place-content-center">
            No Cover
          </div>
        )}
      </div>
    )
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <div className="text-muted-foreground max-w-[200px] truncate">
        {row.getValue("category") || "-"}
      </div>
    )
  },
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => (
      <div className="text-muted-foreground max-w-[200px] truncate">
        {row.getValue("slug")}
      </div>
    )
  },
  {
    accessorKey: "isPublished",
    header: "Status",
    cell: ({ row }) => {
      const isPublished = row.getValue("isPublished") as boolean;
      return (
        <Badge variant={isPublished ? "default" : "secondary"}>
          {isPublished ? "Published" : "Draft"}
        </Badge>
      );
    }
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      const tags = row.original.tags || [];
      return (
        <div className="flex flex-wrap gap-1 max-w-[200px]">
          {tags.length > 0 ? (
            tags.map((tag) => (
              <Badge key={tag} variant="outline" className="">
                {tag}
              </Badge>
            ))
          ) : (
            <span className="text-muted-foreground text-xs">-</span>
          )}
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
    accessorKey: "updatedAt",
    header: "Edited",
    cell: ({ row }) => {
      const date = row.original.updatedAt?.toDate();
      return date ? format(date, "MMM dd, yyyy") : "-";
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <ArticleActions article={row.original} />
  }
];
