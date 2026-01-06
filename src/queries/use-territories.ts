import { QUERIES } from "@/constants/queries.constant";
import { TerritoryService } from "@/services/territory.api";
import { useQuery } from "@tanstack/react-query";

export default function useTerritories() {
  return useQuery({
    queryKey: [QUERIES.TERRITORIES],
    queryFn: TerritoryService.getAll
  });
}
