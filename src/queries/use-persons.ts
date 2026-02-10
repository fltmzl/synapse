import { useQuery } from "@tanstack/react-query";
import { QUERIES } from "@/constants/queries.constant";
import { PersonService } from "@/services/person.api";

export default function usePersons(limitCount?: number) {
  return useQuery({
    queryKey: limitCount
      ? [QUERIES.PERSONS, { limit: limitCount }]
      : [QUERIES.PERSONS],
    queryFn: () => PersonService.getAll(limitCount)
  });
}
