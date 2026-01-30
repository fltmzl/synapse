import { useQuery } from "@tanstack/react-query";
import { UserService } from "@/services/user.api";
import { QUERIES } from "@/constants/queries.constant";

export default function useUsers() {
  return useQuery({
    queryKey: [QUERIES.USERS],
    queryFn: () => UserService.getAll()
  });
}
