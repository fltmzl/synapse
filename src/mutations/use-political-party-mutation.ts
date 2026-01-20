import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERIES } from "@/constants/queries.constant";
import { PoliticalPartyService } from "@/services/political-party.api";
import { toast } from "sonner";

export default function usePoliticalPartyMutation() {
  const queryClient = useQueryClient();

  const createPoliticalPartyMutation = useMutation({
    mutationFn: (name: string) => PoliticalPartyService.create({ name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.POLITICAL_PARTIES] });
      toast.success("Political Party created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create political party");
    }
  });

  return { createPoliticalPartyMutation };
}
