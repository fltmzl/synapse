import { useQuery } from "@tanstack/react-query";
import { QUERIES } from "@/constants/queries.constant";
import { CompanyService } from "@/services/company.api";

export default function useCompanies() {
  return useQuery({
    queryKey: [QUERIES.COMPANIES],
    queryFn: () => CompanyService.getAll()
  });
}
