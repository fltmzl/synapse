"use client";

import { Person } from "@/types/person-relation.type";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";
import { PersonActions } from "./person-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const personColumns: ColumnDef<Person>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="size-8">
          <AvatarImage
            src={row.original.profilePicture}
            alt={row.original.name}
          />
          <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <Link
          href={`/dashboard/admin-panel/persons/edit/${row.original.slug}`}
          className="font-medium max-w-[200px] truncate hover:underline"
        >
          {row.getValue("name")}
        </Link>
      </div>
    )
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="text-muted-foreground max-w-[200px] truncate">
        {row.getValue("email") || "-"}
      </div>
    )
  },
  {
    accessorKey: "currentJobPosition",
    header: "Position",
    cell: ({ row }) => (
      <div className="text-muted-foreground max-w-[200px] truncate">
        {row.getValue("currentJobPosition") || "-"}
      </div>
    )
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone",
    cell: ({ row }) => (
      <div className="text-muted-foreground">
        {row.getValue("phoneNumber") || "-"}
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
    cell: ({ row }) => <PersonActions person={row.original} />
  }
];
