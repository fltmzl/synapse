import { QUERIES } from "@/constants/queries.constant";
import { UserService } from "@/services/user.api";
import { UpdateUserPayload } from "@/types/user.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export default function useUserMutation() {
  const queryClient = useQueryClient();

  const updateUserMutation = useMutation({
    mutationFn: ({
      uid,
      payload
    }: {
      uid: string;
      payload: UpdateUserPayload;
    }) => UserService.update(uid, payload),
    onSuccess: () => {
      toast.success("User updated successfully");
      queryClient.invalidateQueries({ queryKey: [QUERIES.USERS] });
    },
    onError: (error: AxiosError<{ error: string }>) => {
      toast.error(error.response?.data?.error || "Failed to update user");
    }
  });

  const deleteUserMutation = useMutation({
    mutationFn: (uid: string) => UserService.delete(uid),
    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries({ queryKey: [QUERIES.USERS] });
    },
    onError: (error: AxiosError<{ error: string }>) => {
      toast.error(error.response?.data?.error || "Failed to delete user");
    }
  });

  const changePasswordMutation = useMutation({
    mutationFn: ({ uid, newPassword }: { uid: string; newPassword: string }) =>
      UserService.changePassword(uid, newPassword),
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
    onError: (error: AxiosError<{ error: string }>) => {
      toast.error(error.response?.data?.error || "Failed to change password");
    }
  });

  return {
    updateUserMutation,
    deleteUserMutation,
    changePasswordMutation
  };
}
