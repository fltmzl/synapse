import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERIES } from "@/constants/queries.constant";
import { CompanyService } from "@/services/company.api";
import { toast } from "sonner";
import {
  CreateCompanyDto,
  UpdateCompanyDto
} from "@/types/person-relation.type";

export default function useCompanyMutation() {
  const queryClient = useQueryClient();

  const createCompanyMutation = useMutation({
    mutationFn: (data: CreateCompanyDto) => CompanyService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.COMPANIES] });
      toast.success("Company created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create company");
    }
  });

  const updateCompanyMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCompanyDto }) =>
      CompanyService.update({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.COMPANIES] });
      toast.success("Company updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update company");
    }
  });

  const deleteCompanyMutation = useMutation({
    mutationFn: (id: string) => CompanyService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.COMPANIES] });
      toast.success("Company deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete company");
    }
  });

  return {
    createCompanyMutation,
    updateCompanyMutation,
    deleteCompanyMutation
  };
}
