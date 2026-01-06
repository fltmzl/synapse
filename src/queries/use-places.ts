import { QUERIES } from "@/constants/queries.constant";
import { PlaceService } from "@/services/place.api";
import { useQuery } from "@tanstack/react-query";

export default function usePlaces() {
  return useQuery({
    queryKey: [QUERIES.PLACES],
    queryFn: PlaceService.getAll
  });
}
