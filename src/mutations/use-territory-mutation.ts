import { QUERIES } from "@/constants/queries.constant";
import { TerritoryService } from "@/services/territory.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useTerritoryMutation() {
  const queryClient = useQueryClient();

  const createTerritoryMutation = useMutation({
    mutationFn: (name: string) => TerritoryService.create({ name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.TERRITORIES] });
      toast.success("Territory created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create territory");
    }
  });

  const deleteTerritoryMutation = useMutation({
    mutationFn: TerritoryService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.TERRITORIES] });
      toast.success("Territory deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete territory");
    }
  });

  return {
    createTerritoryMutation,
    deleteTerritoryMutation
  };
}
