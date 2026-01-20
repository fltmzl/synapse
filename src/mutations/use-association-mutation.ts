import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERIES } from "@/constants/queries.constant";
import { AssociationService } from "@/services/association.api";
import { toast } from "sonner";

export default function useAssociationMutation() {
  const queryClient = useQueryClient();

  const createAssociationMutation = useMutation({
    mutationFn: (name: string) => AssociationService.create({ name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.ASSOCIATIONS] });
      toast.success("Association created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create association");
    }
  });

  return { createAssociationMutation };
}
