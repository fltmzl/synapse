import { useQuery } from "@tanstack/react-query";
import { QUERIES } from "@/constants/queries.constant";
import { CompanyPersonService } from "@/services/company-person.api";

export default function useCompanyPersonById(id: string) {
  return useQuery({
    queryKey: [QUERIES.COMPANY_PERSONS, id],
    queryFn: () => CompanyPersonService.getById(id),
    enabled: !!id
  });
}
