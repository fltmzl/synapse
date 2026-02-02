import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthService } from "@/services/auth.api";
import { QUERIES } from "@/constants/queries.constant";
import { toast } from "sonner";
import { User as FirebaseAuthUser } from "firebase/auth";
import { RegisterPayload } from "@/services/auth.api";

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      user,
      payload
    }: {
      user: FirebaseAuthUser;
      payload: Partial<RegisterPayload> & {
        photoURL?: string;
        currentPassword?: string;
      };
    }) => AuthService.updateUserProfile(user, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.MY_PROFILE] });
      toast.success(data.message || "Profile updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update profile");
    }
  });
}
