import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERIES } from "@/constants/queries.constant";
import { CompanyService } from "@/services/company.api";
import { toast } from "sonner";
import { CreateCompanyDto } from "@/types/person-relation.type";

export default function useCompanyMutation() {
  const queryClient = useQueryClient();

  const createCompanyMutation = useMutation({
    mutationFn: (name: string) => CompanyService.create({ name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.COMPANIES] });
      toast.success("Company created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create company");
    }
  });

  return { createCompanyMutation };
}
