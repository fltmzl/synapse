import { useQuery } from "@tanstack/react-query";
import { QUERIES } from "@/constants/queries.constant";
import { SpiderGraphApi } from "@/services/spider-graph.api";

export default function useSpiderGraph(type: "company" | "person", id: string) {
  return useQuery({
    queryKey: [QUERIES.SPIDER_GRAPH, type, id],
    queryFn: () => SpiderGraphApi.getSpiderGraph(type, id),
    enabled: !!type && !!id
  });
}
