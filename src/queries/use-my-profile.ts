import { QUERIES } from "@/constants/queries.constant";
import { AuthService } from "@/services/auth.api";
import { useAuthGlobal } from "@/stores/auth-global.store";
import { useQuery } from "@tanstack/react-query";

export default function useMyProfile() {
  const { user } = useAuthGlobal();
  return useQuery({
    queryFn: () => AuthService.myProfile(user?.uid || ""),
    queryKey: [QUERIES.MY_PROFILE, user?.uid],
    enabled: Boolean(user)
  });
}
