import { QUERIES } from "@/constants/queries.constant";
import { UserService } from "@/services/user.api";
import { useQuery } from "@tanstack/react-query";

export default function useUserById(uid: string) {
  return useQuery({
    queryKey: [QUERIES.USERS, uid],
    queryFn: () => UserService.getById(uid),
    enabled: !!uid
  });
}
