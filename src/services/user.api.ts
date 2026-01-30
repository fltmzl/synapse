import { api } from "@/lib/axios";
import { CreateUserPayload } from "./auth.api";
import { User } from "@/types/user.type";

export class UserService {
  static async getAll() {
    const res = await api.get<{ data: User[] }>("/api/admin/users");
    return res.data.data;
  }

  static async create(payload: CreateUserPayload) {
    const res = await api.post<{ data: unknown }>("/api/admin/users", payload);
    return res.data.data;
  }
}
