import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERIES } from "@/constants/queries.constant";
import { EducationService } from "@/services/education.api";
import { toast } from "sonner";
import {
  CreateEducationDto,
  UpdateEducationDto
} from "@/types/person-relation.type";

export default function useEducationMutation() {
  const queryClient = useQueryClient();

  const createEducationMutation = useMutation({
    mutationFn: (data: CreateEducationDto) => EducationService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.EDUCATIONS] });
      toast.success("Education created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create education");
    }
  });

  const updateEducationMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateEducationDto }) =>
      EducationService.update({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.EDUCATIONS] });
      toast.success("Education updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update education");
    }
  });

  const deleteEducationMutation = useMutation({
    mutationFn: (id: string) => EducationService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.EDUCATIONS] });
      toast.success("Education deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete education");
    }
  });

  return {
    createEducationMutation,
    updateEducationMutation,
    deleteEducationMutation
  };
}
