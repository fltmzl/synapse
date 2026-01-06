import { QUERIES } from "@/constants/queries.constant";
import { PublisherService } from "@/services/publisher.api";
import { useQuery } from "@tanstack/react-query";

export default function usePublishers() {
  return useQuery({
    queryKey: [QUERIES.PUBLISHERS],
    queryFn: PublisherService.getAll
  });
}
