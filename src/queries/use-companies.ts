import { useQuery } from "@tanstack/react-query";
import { QUERIES } from "@/constants/queries.constant";
import { CompanyService } from "@/services/company.api";

export default function useCompanies(filters?: {
  categoryIds?: string[];
  territoryIds?: string[];
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  return useQuery({
    queryKey: [QUERIES.COMPANIES, filters],
    queryFn: () => CompanyService.getAll(filters)
  });
}
