"use client";

import { ReactNode, useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import { useAuthGlobal } from "@/stores/auth-global.store";

export function AuthInitProvider({ children }: { children: ReactNode }) {
  const { setUser, setRole, setLoading, loading } = useAuthGlobal();

  const getUserData = async (user: User) => {
    try {
      // 🔑 PENTING: tunggu browser siap
      await new Promise((r) => setTimeout(r, 100));

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        return snap.data();
      }
      return null;
    } catch (error) {
      console.error("GET USER DATA ERROR", error);
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setLoading(true);
        setUser(firebaseUser);
        const userData = await getUserData(firebaseUser);
        setRole(userData?.role ?? null);
      } else {
        setUser(null);
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setRole, setLoading]);

  return <>{children}</>;
}
