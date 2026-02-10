import { useQuery } from "@tanstack/react-query";
import { QUERIES } from "@/constants/queries.constant";
import { CompanyPersonService } from "@/services/company-person.api";
import { PersonService } from "@/services/person.api";
import { Person } from "@/types/person-relation.type";

export default function useCompanyPeople(companyId: string | undefined) {
  return useQuery({
    queryKey: [QUERIES.COMPANY_PERSONS, "by-company", companyId],
    queryFn: async () => {
      if (!companyId) return [];

      const relations = await CompanyPersonService.getByCompanyId(companyId);
      if (!relations.length) return [];

      // Fetch each person's details
      const personDetails = await Promise.all(
        relations.map(async (rel) => {
          const person = await PersonService.getById(rel.personId);
          return {
            ...person,
            title: rel.title, // Include the title from the relation
            employmentType: rel.employmentType
          };
        })
      );

      return personDetails.filter(Boolean) as (Person & { title?: string })[];
    },
    enabled: !!companyId
  });
}
