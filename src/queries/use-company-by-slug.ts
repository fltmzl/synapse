import { useQuery } from "@tanstack/react-query";
import { QUERIES } from "@/constants/queries.constant";
import { CompanyService } from "@/services/company.api";

export default function useCompanyBySlug(slug: string) {
  return useQuery({
    queryKey: [QUERIES.COMPANIES, slug],
    queryFn: () => CompanyService.getBySlug(slug)
  });
}
