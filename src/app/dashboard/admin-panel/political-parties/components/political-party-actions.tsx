"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import usePoliticalPartyMutation from "@/mutations/use-political-party-mutation";
import { PoliticalParty } from "@/types/person-relation.type";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface PoliticalPartyActionsProps {
  politicalParty: PoliticalParty;
}

export function PoliticalPartyActions({
  politicalParty
}: PoliticalPartyActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { deletePoliticalPartyMutation } = usePoliticalPartyMutation();

  const handleDelete = () => {
    deletePoliticalPartyMutation.mutate(politicalParty.id);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon-sm" asChild>
          <Link
            href={`/dashboard/admin-panel/political-parties/edit/${politicalParty.id}`}
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={() => setShowDeleteDialog(true)}
        >
          <Trash className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="py-4 px-5">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              political party &quot;{politicalParty.name}&quot; and remove its
              data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button asChild variant="destructive">
              <AlertDialogAction onClick={handleDelete}>
                Delete
              </AlertDialogAction>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
