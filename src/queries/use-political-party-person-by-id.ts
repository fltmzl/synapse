import { useQuery } from "@tanstack/react-query";
import { QUERIES } from "@/constants/queries.constant";
import { PoliticalPartyPersonService } from "@/services/political-party-person.api";

export default function usePoliticalPartyPersonById(id: string) {
  return useQuery({
    queryKey: [QUERIES.POLITICAL_PARTY_PERSONS, id],
    queryFn: () => PoliticalPartyPersonService.getById(id),
    enabled: !!id
  });
}
