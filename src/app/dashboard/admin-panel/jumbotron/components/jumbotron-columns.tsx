"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Jumbotron } from "@/types/jumbotron.type";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { JumbotronActions } from "./jumbotron-actions";

export const jumbotronColumns: ColumnDef<Jumbotron>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <span className="font-medium">{row.original.title}</span>
  },
  {
    accessorKey: "mediaType",
    header: "Type",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.original.mediaType}
      </Badge>
    )
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) =>
      row.original.isActive ? (
        <Badge className="bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/10">
          Active
        </Badge>
      ) : (
        <Badge variant="secondary">Inactive</Badge>
      )
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = row.original.createdAt;
      if (!date) return "-";
      try {
        return format(date.toDate(), "MMM dd, yyyy");
      } catch {
        return "-";
      }
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <JumbotronActions jumbotron={row.original} />
  }
];
