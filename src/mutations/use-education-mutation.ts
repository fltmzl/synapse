import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERIES } from "@/constants/queries.constant";
import { EducationService } from "@/services/education.api";
import { EducationPersonService } from "@/services/education-person.api";
import { toast } from "sonner";
import {
  CreateEducationDto,
  UpdateEducationDto,
  EducationDataFromExcelDto,
  EducationPersonRelationsFromExcelDto
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

  const createManyFromExcelMutation = useMutation({
    mutationFn: (data: EducationDataFromExcelDto[]) =>
      EducationService.createManyFromExcel(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.EDUCATIONS] });
      toast.success(data.message || "Educations imported successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to import educations");
    }
  });

  const createManyRelationsFromExcelMutation = useMutation({
    mutationFn: (data: EducationPersonRelationsFromExcelDto[]) =>
      EducationPersonService.createManyRelationsFromExcel(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.EDUCATIONS] });
      queryClient.invalidateQueries({ queryKey: [QUERIES.PERSONS] });
      toast.success(
        data.message || "Education relations imported successfully"
      );
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to import education relations");
    }
  });

  return {
    createEducationMutation,
    updateEducationMutation,
    deleteEducationMutation,
    createManyFromExcelMutation,
    createManyRelationsFromExcelMutation
  };
}
