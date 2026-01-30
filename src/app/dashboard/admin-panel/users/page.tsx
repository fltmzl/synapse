"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { DataTable } from "@/components/data-table/data-table";
import { userColumns } from "./components/user-columns";
import useUsers from "@/queries/use-users";

export default function UsersPage() {
  const { data: users, isLoading } = useUsers();

  return (
    <>
      <DashboardHeader
        title="Users"
        description="Manage system users"
        actions={
          <Button size="sm" asChild>
            <Link href="/dashboard/admin-panel/users/new">
              <Plus className="size-4 mr-2" />
              New User
            </Link>
          </Button>
        }
      />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <DataTable
          searchPlaceholder="Search by name..."
          data={users || []}
          columns={userColumns}
          headerAction={() => <></>}
          search="firstName"
          isLoading={isLoading}
          toolbarComponent={() => <></>}
        />
      </div>
    </>
  );
}
