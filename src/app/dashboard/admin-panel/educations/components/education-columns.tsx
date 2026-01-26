"use client";
import { Education } from "@/types/person-relation.type";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";
import { EducationActions } from "./education-actions";

export const educationColumns: ColumnDef<Education>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <Link
        href={`/dashboard/admin-panel/educations/edit/${row.original.id}`}
        className="font-medium max-w-[300px] truncate hover:underline"
      >
        {row.getValue("name")}
      </Link>
    )
  },
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => (
      <div className="text-muted-foreground text-xs font-mono">
        {row.getValue("slug")}
      </div>
    )
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
    cell: ({ row }) => <EducationActions education={row.original} />
  }
];
