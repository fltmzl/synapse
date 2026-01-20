import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERIES } from "@/constants/queries.constant";
import { EducationService } from "@/services/education.api";
import { toast } from "sonner";

export default function useEducationMutation() {
  const queryClient = useQueryClient();

  const createEducationMutation = useMutation({
    mutationFn: (name: string) => EducationService.create({ name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.EDUCATIONS] });
      toast.success("Education created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create education");
    }
  });

  return { createEducationMutation };
}
