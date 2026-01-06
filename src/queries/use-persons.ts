import { useQuery } from "@tanstack/react-query";
import { QUERIES } from "@/constants/queries.constant";
import { PersonService } from "@/services/person.api";

export default function usePersons() {
  return useQuery({
    queryKey: [QUERIES.PERSONS],
    queryFn: PersonService.getAll
  });
}
