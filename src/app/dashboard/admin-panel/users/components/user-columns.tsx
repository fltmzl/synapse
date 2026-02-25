"use client";

import { User } from "@/types/user.type";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { UserActions } from "./user-actions";

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "firstName",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-medium">
        {row.original.firstName} {row.original.lastName}
      </div>
    )
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("email")}</div>
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      return <Badge variant="outline">{role}</Badge>;
    }
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone",
    cell: ({ row }) => {
      const phone = row.original.phoneNumber;
      const code = row.original.countryCode;
      return phone ? (
        <div>
          {code ? `(${code}) ` : ""}
          {phone}
        </div>
      ) : (
        "-"
      );
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <UserActions user={row.original} />
  }
];
