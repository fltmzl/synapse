import { useQuery } from "@tanstack/react-query";
import { QUERIES } from "@/constants/queries.constant";
import { CompanyService } from "@/services/company.api";

export default function useCompany(id: string) {
  return useQuery({
    queryKey: [QUERIES.COMPANIES, id],
    queryFn: () => CompanyService.getById(id),
    enabled: !!id
  });
}
