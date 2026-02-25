import { api } from "@/lib/axios";
import { CreateUserPayload } from "./auth.api";
import { User, UpdateUserPayload } from "@/types/user.type";

export class UserService {
  static async getAll() {
    const res = await api.get<{ data: User[] }>("/api/admin/users");
    return res.data.data;
  }

  static async create(payload: CreateUserPayload) {
    const res = await api.post<{ data: unknown }>("/api/admin/users", payload);
    return res.data.data;
  }

  static async getById(uid: string) {
    const res = await api.get<{ data: User }>(`/api/admin/users/${uid}`);
    return res.data.data;
  }

  static async update(uid: string, payload: UpdateUserPayload) {
    const res = await api.put<{ data: unknown }>(
      `/api/admin/users/${uid}`,
      payload
    );
    return res.data.data;
  }

  static async delete(uid: string) {
    const res = await api.delete<{ data: unknown }>(`/api/admin/users/${uid}`);
    return res.data.data;
  }

  static async changePassword(uid: string, newPassword: string) {
    const res = await api.post<{ data: unknown }>(
      `/api/admin/users/${uid}/change-password`,
      { newPassword }
    );
    return res.data.data;
  }
}
