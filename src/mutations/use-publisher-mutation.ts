import { QUERIES } from "@/constants/queries.constant";
import { PublisherService } from "@/services/publisher.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function usePublisherMutation() {
  const queryClient = useQueryClient();

  const createPublisherMutation = useMutation({
    mutationFn: (name: string) => PublisherService.create({ name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.PUBLISHERS] });
      toast.success("Publisher created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create publisher");
    }
  });

  const deletePublisherMutation = useMutation({
    mutationFn: PublisherService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.PUBLISHERS] });
      toast.success("Publisher deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete publisher");
    }
  });

  return {
    createPublisherMutation,
    deletePublisherMutation
  };
}
