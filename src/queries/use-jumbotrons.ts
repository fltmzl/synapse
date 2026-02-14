import { QUERIES } from "@/constants/queries.constant";
import { JumbotronService } from "@/services/jumbotron.api";
import { useQuery } from "@tanstack/react-query";

export default function useJumbotrons() {
  return useQuery({
    queryKey: [QUERIES.JUMBOTRONS],
    queryFn: JumbotronService.getAll
  });
}

export function useActiveJumbotron() {
  return useQuery({
    queryKey: [QUERIES.JUMBOTRONS, "active"],
    queryFn: JumbotronService.getActive
  });
}
