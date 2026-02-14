"use client";

import { ReactNode, useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import { useAuthGlobal } from "@/stores/auth-global.store";

export function AuthInitProvider({ children }: { children: ReactNode }) {
  const { setUser, setRole, setLoading, loading } = useAuthGlobal();

  // const getUserData = async (user: User) => {
  //   try {
  //     console.log("GET USER DATA -4");
  //     const userDoc = await getDoc(doc(db, "users", user.uid));
  //     console.log({ userDoc });
  //     console.log("GET USER DATA -5");
  //     if (userDoc.exists()) {
  //       console.log("GET USER DATA -6");
  //       return userDoc.data();
  //     } else {
  //       console.log("GET USER DATA -7");
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error("GET USER DATA -8", error);
  //     return null;
  //   }
  // };

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
    // const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
    //   setLoading(true);

    //   if (firebaseUser) {
    //     console.log("SAMPEE LOADING FALSE -3");
    //     setUser(firebaseUser);

    //     console.log("SAMPEE LOADING FALSE -2");
    //     const userData = await getUserData(firebaseUser);

    //     console.log("SAMPEE LOADING FALSE -1");
    //     setRole(userData?.role || null);
    //     console.log("SAMPEE LOADING FALSE 0");
    //   } else {
    //     setUser(null);
    //     setRole(null);
    //   }

    //   console.log("SAMPEE LOADING FALSE 1");
    //   setLoading(false);
    //   console.log("SAMPEE LOADING FALSE 2");
    // });

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setLoading(true);
        setUser(firebaseUser);
        const userData = await getUserData(firebaseUser);
        setRole(userData?.role ?? null);
        console.log("ROLE", userData?.role);
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
