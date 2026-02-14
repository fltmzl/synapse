import { useQuery } from "@tanstack/react-query";
import { QUERIES } from "@/constants/queries.constant";
import { PoliticalPartyService } from "@/services/political-party.api";

export default function usePoliticalPartyById(id: string) {
  return useQuery({
    queryKey: [QUERIES.POLITICAL_PARTIES, id],
    queryFn: () => PoliticalPartyService.getById(id),
    enabled: !!id
  });
}
