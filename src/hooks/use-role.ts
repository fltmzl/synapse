import { useAuthGlobal } from "@/stores/auth-global.store";

export default function useRole() {
  const { role, loading } = useAuthGlobal();

  const isSuperadmin = role === "superadmin";
  const isRegularUser = role === "regular_user" || !role;

  return { isRegularUser, isSuperadmin, role, loading };
}
