import { Role } from "@/types/role.type";
import { User } from "firebase/auth";
import { create } from "zustand";

type AuthState = {
  user: User | null;
  role: Role | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setRole: (role: Role | null) => void;
  setLoading: (loading: boolean) => void;
};

export const useAuthGlobal = create<AuthState>((set) => ({
  user: null,
  role: null,
  loading: true,
  setUser: (user) => set({ user }),
  setRole: (role) => set({ role }),
  setLoading: (loading) => set({ loading })
}));
