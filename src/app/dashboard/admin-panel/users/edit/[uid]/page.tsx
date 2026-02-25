"use client";

import useUserById from "@/queries/use-user-by-id";
import { UserForm } from "../../components/user-form";
import { Skeleton } from "@/components/ui/skeleton";
import { use } from "react";

export default function EditUserPage({
  params
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = use(params);
  const { data: user, isLoading } = useUserById(uid);

  if (isLoading) {
    return (
      <div className="p-8 space-y-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-64 w-full max-w-4xl mx-auto" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">User not found</h1>
        <p className="text-muted-foreground">
          The user you are looking for does not exist.
        </p>
      </div>
    );
  }

  return <UserForm mode="edit" user={user} />;
}
