import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERIES } from "@/constants/queries.constant";
import { PoliticalPartyService } from "@/services/political-party.api";
import { toast } from "sonner";
import {
  CreatePoliticalPartyDto,
  UpdatePoliticalPartyDto,
  PoliticalPartyDataFromExcelDto,
  PoliticalPartyPersonRelationsFromExcelDto
} from "@/types/person-relation.type";

export default function usePoliticalPartyMutation() {
  const queryClient = useQueryClient();

  const createPoliticalPartyMutation = useMutation({
    mutationFn: (data: CreatePoliticalPartyDto) =>
      PoliticalPartyService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.POLITICAL_PARTIES] });
      toast.success("Political Party created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create political party");
    }
  });

  const updatePoliticalPartyMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePoliticalPartyDto }) =>
      PoliticalPartyService.update({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.POLITICAL_PARTIES] });
      toast.success("Political Party updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update political party");
    }
  });

  const deletePoliticalPartyMutation = useMutation({
    mutationFn: (id: string) => PoliticalPartyService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.POLITICAL_PARTIES] });
      toast.success("Political Party deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete political party");
    }
  });

  const createManyFromExcelMutation = useMutation({
    mutationFn: (data: PoliticalPartyDataFromExcelDto[]) =>
      PoliticalPartyService.createManyFromExcel(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.POLITICAL_PARTIES] });
      toast.success(data.message || "Political Parties imported successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to import political parties");
    }
  });

  const createManyRelationsFromExcelMutation = useMutation({
    mutationFn: (data: PoliticalPartyPersonRelationsFromExcelDto[]) =>
      PoliticalPartyService.createManyRelationsFromExcel(data),
    onSuccess: (data) => {
      toast.success(data.message || "Relations imported successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to import relations");
    }
  });

  return {
    createPoliticalPartyMutation,
    updatePoliticalPartyMutation,
    deletePoliticalPartyMutation,
    createManyFromExcelMutation,
    createManyRelationsFromExcelMutation
  };
}
