import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERIES } from "@/constants/queries.constant";
import { PersonService } from "@/services/person.api";
import { toast } from "sonner";
import {
  CreatePersonDto,
  UpdatePersonDto,
  CreatePersonWithRelationsDto,
  UpdatePersonWithRelationsDto,
  CreateManyPersonFromExcelDto
} from "@/types/person-relation.type";

export default function usePersonMutation() {
  const queryClient = useQueryClient();

  const createPersonMutation = useMutation({
    mutationFn: (data: CreatePersonDto) => PersonService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.PERSONS] });
      toast.success("Person created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create person");
    }
  });

  const createPersonWithRelationsMutation = useMutation({
    mutationFn: (data: CreatePersonWithRelationsDto) =>
      PersonService.createWithRelations(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.PERSONS] });
      toast.success("Person and relations created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create person with relations");
    }
  });

  const updatePersonMutation = useMutation({
    mutationFn: ({
      id,
      data
    }: {
      id: string;
      data: UpdatePersonDto | UpdatePersonWithRelationsDto;
    }) => PersonService.update({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.PERSONS] });
      toast.success("Person updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update person");
    }
  });

  const deletePersonMutation = useMutation({
    mutationFn: (id: string) => PersonService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.PERSONS] });
      toast.success("Person deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete person");
    }
  });

  const createManyFromExcelMutation = useMutation({
    mutationFn: (data: CreateManyPersonFromExcelDto[]) =>
      PersonService.createManyFromExcel(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.PERSONS] });
      toast.success(data.message || "Persons imported successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to import persons");
    }
  });

  return {
    createPersonMutation,
    createPersonWithRelationsMutation,
    updatePersonMutation,
    deletePersonMutation,
    createManyFromExcelMutation
  };
}
