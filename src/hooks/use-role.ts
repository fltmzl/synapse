import { useAuthGlobal } from "@/stores/auth-global.store";

export default function useRole() {
  const { role, loading } = useAuthGlobal();

  const isSuperadmin = role === "superadmin";
  const isClientUser = role === "client_user";
  const isRegularUser = role === "regular_user" || !role;

  return { isRegularUser, isClientUser, isSuperadmin, role, loading };
}
