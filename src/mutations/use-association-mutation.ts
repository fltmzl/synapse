import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERIES } from "@/constants/queries.constant";
import { AssociationService } from "@/services/association.api";
import { toast } from "sonner";
import {
  CreateAssociationDto,
  UpdateAssociationDto
} from "@/types/person-relation.type";

export default function useAssociationMutation() {
  const queryClient = useQueryClient();

  const createAssociationMutation = useMutation({
    mutationFn: (data: CreateAssociationDto) => AssociationService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.ASSOCIATIONS] });
      toast.success("Association created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create association");
    }
  });

  const updateAssociationMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAssociationDto }) =>
      AssociationService.update({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.ASSOCIATIONS] });
      toast.success("Association updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update association");
    }
  });

  const deleteAssociationMutation = useMutation({
    mutationFn: (id: string) => AssociationService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.ASSOCIATIONS] });
      toast.success("Association deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete association");
    }
  });

  return {
    createAssociationMutation,
    updateAssociationMutation,
    deleteAssociationMutation
  };
}
