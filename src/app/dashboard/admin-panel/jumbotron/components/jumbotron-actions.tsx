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
import useJumbotronMutation from "@/mutations/use-jumbotron-mutation";
import { Jumbotron } from "@/types/jumbotron.type";
import { Pencil, Trash, Power } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface JumbotronActionsProps {
  jumbotron: Jumbotron;
}

export function JumbotronActions({ jumbotron }: JumbotronActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { deleteJumbotronMutation, setActiveMutation } = useJumbotronMutation();

  const handleDelete = () => {
    deleteJumbotronMutation.mutate(jumbotron.id);
    setShowDeleteDialog(false);
  };

  const handleSetActive = () => {
    setActiveMutation.mutate(jumbotron.id);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        {!jumbotron.isActive && (
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-green-600 hover:text-green-600 hover:bg-green-500/10"
            onClick={handleSetActive}
            disabled={setActiveMutation.isPending}
            title="Set as active"
          >
            <Power className="h-4 w-4" />
            <span className="sr-only">Set Active</span>
          </Button>
        )}
        <Button variant="ghost" size="icon-sm" asChild>
          <Link href={`/dashboard/admin-panel/jumbotron/edit/${jumbotron.id}`}>
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
              jumbotron &quot;{jumbotron.title}&quot;.
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
