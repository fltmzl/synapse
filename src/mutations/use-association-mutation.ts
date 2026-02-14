import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERIES } from "@/constants/queries.constant";
import { AssociationService } from "@/services/association.api";
import { AssociationPersonService } from "@/services/association-person.api";
import { toast } from "sonner";
import {
  CreateAssociationDto,
  UpdateAssociationDto,
  AssociationDataFromExcelDto,
  AssociationPersonRelationsFromExcelDto
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

  const createManyFromExcelMutation = useMutation({
    mutationFn: (data: AssociationDataFromExcelDto[]) =>
      AssociationService.createManyFromExcel(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.ASSOCIATIONS] });
      toast.success(data.message || "Associations imported successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to import associations");
    }
  });

  const createManyRelationsFromExcelMutation = useMutation({
    mutationFn: (data: AssociationPersonRelationsFromExcelDto[]) =>
      AssociationPersonService.createManyRelationsFromExcel(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.ASSOCIATIONS] });
      queryClient.invalidateQueries({ queryKey: [QUERIES.PERSONS] });
      toast.success(
        data.message || "Association relations imported successfully"
      );
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to import association relations");
    }
  });

  return {
    createAssociationMutation,
    updateAssociationMutation,
    deleteAssociationMutation,
    createManyFromExcelMutation,
    createManyRelationsFromExcelMutation
  };
}
