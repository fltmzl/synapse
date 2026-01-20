import { useQuery } from "@tanstack/react-query";
import { QUERIES } from "@/constants/queries.constant";
import { PersonService } from "@/services/person.api";

export default function usePerson(id: string) {
  return useQuery({
    queryKey: [QUERIES.PERSONS, id],
    queryFn: () => PersonService.getWithRelations(id),
    enabled: !!id
  });
}
