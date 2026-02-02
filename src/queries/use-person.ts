import { useQuery } from "@tanstack/react-query";
import { QUERIES } from "@/constants/queries.constant";
import { PersonService } from "@/services/person.api";

export default function usePerson(slug: string) {
  return useQuery({
    queryKey: [QUERIES.PERSONS, slug],
    queryFn: () => PersonService.getWithRelations(slug),
    enabled: !!slug
  });
}
