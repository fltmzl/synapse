import { QUERIES } from "@/constants/queries.constant";
import { JumbotronService } from "@/services/jumbotron.api";
import { CreateJumbotronDto, UpdateJumbotronDto } from "@/types/jumbotron.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useJumbotronMutation() {
  const queryClient = useQueryClient();

  const createJumbotronMutation = useMutation({
    mutationFn: (data: CreateJumbotronDto) => JumbotronService.create(data),
    onSuccess: () => {
      toast.success("Jumbotron created successfully");
      queryClient.invalidateQueries({ queryKey: [QUERIES.JUMBOTRONS] });
    },
    onError: () => {
      toast.error("Failed to create jumbotron");
    }
  });

  const updateJumbotronMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateJumbotronDto }) =>
      JumbotronService.update(id, data),
    onSuccess: () => {
      toast.success("Jumbotron updated successfully");
      queryClient.invalidateQueries({ queryKey: [QUERIES.JUMBOTRONS] });
    },
    onError: () => {
      toast.error("Failed to update jumbotron");
    }
  });

  const deleteJumbotronMutation = useMutation({
    mutationFn: (id: string) => JumbotronService.delete(id),
    onSuccess: () => {
      toast.success("Jumbotron deleted successfully");
      queryClient.invalidateQueries({ queryKey: [QUERIES.JUMBOTRONS] });
    },
    onError: () => {
      toast.error("Failed to delete jumbotron");
    }
  });

  const setActiveMutation = useMutation({
    mutationFn: (id: string) => JumbotronService.setActive(id),
    onSuccess: () => {
      toast.success("Jumbotron activated successfully");
      queryClient.invalidateQueries({ queryKey: [QUERIES.JUMBOTRONS] });
    },
    onError: () => {
      toast.error("Failed to activate jumbotron");
    }
  });

  return {
    createJumbotronMutation,
    updateJumbotronMutation,
    deleteJumbotronMutation,
    setActiveMutation
  };
}
