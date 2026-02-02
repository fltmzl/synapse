"use client";

import { Company, CompanyWithDetails } from "@/types/person-relation.type";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";
import { CompanyActions } from "./company-actions";

export const companyColumns: ColumnDef<CompanyWithDetails>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <Link
        href={`/dashboard/admin-panel/companies/edit/${row.original.id}`}
        className="font-medium max-w-[300px] truncate hover:underline"
      >
        {row.getValue("name")}
      </Link>
    )
  },
  // {
  //   accessorKey: "slug",
  //   header: "Slug",
  //   cell: ({ row }) => (
  //     <div className="text-muted-foreground text-xs font-mono">
  //       {row.getValue("slug")}
  //     </div>
  //   )
  // },
  // {
  //   accessorKey: "establishmentDate",
  //   header: "Established",
  //   cell: ({ row }) => {
  //     const date = row.original.establishmentDate?.toDate();
  //     return date ? format(date, "MMM dd, yyyy") : "-";
  //   }
  // },
  // {
  //   accessorKey: "createdAt",
  //   header: "Created",
  //   cell: ({ row }) => {
  //     const date = row.original.createdAt?.toDate();
  //     return date ? format(date, "MMM dd, yyyy") : "-";
  //   }
  // },
  {
    id: "actions",
    cell: ({ row }) => <CompanyActions company={row.original} />
  }
];
