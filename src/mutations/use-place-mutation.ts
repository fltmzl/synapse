import { QUERIES } from "@/constants/queries.constant";
import { PlaceService } from "@/services/place.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function usePlaceMutation() {
  const queryClient = useQueryClient();

  const createPlaceMutation = useMutation({
    mutationFn: (name: string) => PlaceService.create({ name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.PLACES] });
      toast.success("Place created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create place");
    }
  });

  const deletePlaceMutation = useMutation({
    mutationFn: PlaceService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.PLACES] });
      toast.success("Place deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete place");
    }
  });

  return {
    createPlaceMutation,
    deletePlaceMutation
  };
}
