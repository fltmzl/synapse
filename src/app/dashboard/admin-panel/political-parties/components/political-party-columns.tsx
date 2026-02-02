"use client";
import { PoliticalParty } from "@/types/person-relation.type";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";
import { PoliticalPartyActions } from "./political-party-actions";

export const politicalPartyColumns: ColumnDef<PoliticalParty>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <Link
        href={`/dashboard/admin-panel/political-parties/edit/${row.original.id}`}
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
    cell: ({ row }) => <PoliticalPartyActions politicalParty={row.original} />
  }
];
