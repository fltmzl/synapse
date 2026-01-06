import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERIES } from "@/constants/queries.constant";
import { PersonService } from "@/services/person.api";
import { toast } from "sonner";

export default function usePersonMutation() {
  const queryClient = useQueryClient();

  const createPersonMutation = useMutation({
    mutationFn: (name: string) => PersonService.create({ name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.PERSONS] });
      toast.success("Person created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create person");
    }
  });

  const deletePersonMutation = useMutation({
    mutationFn: (id: string) => PersonService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.PERSONS] });
      toast.success("Person deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete person");
    }
  });

  return { createPersonMutation, deletePersonMutation };
}
