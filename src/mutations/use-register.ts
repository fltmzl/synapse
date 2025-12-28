import { AuthService } from "@/services/auth.api";
import { useMutation } from "@tanstack/react-query";

export function useRegister() {
  return useMutation({
    mutationFn: AuthService.register
  });
}
