import { useQuery } from "@tanstack/react-query";
import { QUERIES } from "@/constants/queries.constant";
import { PoliticalPartyService } from "@/services/political-party.api";

export default function usePoliticalParties() {
  return useQuery({
    queryKey: [QUERIES.POLITICAL_PARTIES],
    queryFn: () => PoliticalPartyService.getAll()
  });
}
