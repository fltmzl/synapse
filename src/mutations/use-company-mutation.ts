import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERIES } from "@/constants/queries.constant";
import { CompanyService } from "@/services/company.api";
import { toast } from "sonner";
import {
  CreateCompanyDto,
  UpdateCompanyDto,
  CreateCompanyWithRepresentativeDto,
  UpdateCompanyWithRepresentativeDto
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

  const createCompanyWithRepresentativeMutation = useMutation({
    mutationFn: (data: CreateCompanyWithRepresentativeDto) =>
      CompanyService.createWithRepresentative(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.COMPANIES] });
      queryClient.invalidateQueries({ queryKey: [QUERIES.PERSONS] });
      toast.success(
        "Company and authorized representative created successfully"
      );
    },
    onError: (error: Error) => {
      toast.error(
        error.message || "Failed to create company with representative"
      );
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

  const updateCompanyWithRepresentativeMutation = useMutation({
    mutationFn: (data: UpdateCompanyWithRepresentativeDto) =>
      CompanyService.updateWithRepresentative(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.COMPANIES] });
      queryClient.invalidateQueries({ queryKey: [QUERIES.PERSONS] });
      toast.success(
        "Company updated and authorized representative created successfully"
      );
    },
    onError: (error: Error) => {
      toast.error(
        error.message || "Failed to update company with representative"
      );
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
    createCompanyWithRepresentativeMutation,
    updateCompanyMutation,
    updateCompanyWithRepresentativeMutation,
    deleteCompanyMutation
  };
}
