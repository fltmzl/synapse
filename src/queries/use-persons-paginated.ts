import { useQuery } from "@tanstack/react-query";
import { QUERIES } from "@/constants/queries.constant";
import { PersonService } from "@/services/person.api";

export default function usePersonsPaginated(filters: {
  categoryIds?: string[];
  territoryIds?: string[];
  search?: string;
  page: number;
  pageSize: number;
}) {
  return useQuery({
    queryKey: [QUERIES.PERSONS, "paginated", filters],
    queryFn: () => PersonService.getAllWithPaginated(filters)
  });
}
