import { auth, db } from "@/firebase/config";
import { api } from "@/lib/axios";
import { Role } from "@/types/role.type";
import { User } from "@/types/user.type";
import {
  GoogleAuthProvider,
  User as FirebaseAuthUser,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
  deleteUser
} from "firebase/auth";
import {
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc
} from "firebase/firestore";

export type RegisterPayload = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  countryCode?: string;
  phoneNumber: string;
};

export type CreateUserPayload = {
  companyId: string;
  email: string;
  name: string;
  role: Role;
};

export class AuthService {
  static async assignRole(uid: string, role: Role) {
    const res = await api.post("/api/users/assign-role", {
      uid: uid,
      role: role
    });

    return res;
  }

  static async myProfile(userId: string): Promise<User> {
    try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        return { id: userSnap.id, ...(userSnap.data() as User) };
      } else {
        throw new Error("User not found");
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      throw err;
    }
  }

  static async register(payload: RegisterPayload) {
    const { email, password, firstName, lastName, phoneNumber, countryCode } =
      payload;

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const USER_ROLE: Role = "regular_user";

    await updateProfile(user, {
      displayName: `${firstName} ${lastName}`
    });

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      firstName,
      lastName,
      role: USER_ROLE,
      phoneNumber,
      countryCode,
      createdAt: serverTimestamp()
    });

    await AuthService.assignRole(user.uid, USER_ROLE);

    return user;
  }

  static async updateUserProfile(
    user: FirebaseAuthUser,
    payload: Partial<RegisterPayload> & {
      photoURL?: string;
      currentPassword?: string;
    }
  ) {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      countryCode,
      photoURL,
      currentPassword
    } = payload;

    if (email && email !== user.email) {
      if (!currentPassword) {
        throw new Error(
          "Reauthentication required. Please provide your current password."
        );
      }

      const credential = EmailAuthProvider.credential(
        user.email!,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      await updateEmail(user, email);
    }

    if (firstName || lastName || photoURL) {
      await updateProfile(user, {
        displayName: `${firstName ?? ""} ${lastName ?? ""}`.trim(),
        photoURL: photoURL ?? user.photoURL ?? null
      });
    }

    const userRef = doc(db, "users", user.uid);
    await setDoc(
      userRef,
      {
        firstName,
        lastName,
        email: email || user.email,
        phoneNumber,
        countryCode,
        photoURL: photoURL ?? user.photoURL ?? null,
        updatedAt: serverTimestamp()
      },
      { merge: true }
    );

    return { success: true, message: "Profile updated successfully." };
  }

  static async loginWithEmail({
    email,
    password
  }: {
    email: string;
    password: string;
  }) {
    // 1. Login to Firebase
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    let role = null;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      role = data.role || null;
    } else {
      role = null;
    }

    await AuthService.assignRole(user.uid, role || "regular_user");

    return user;
  }

  static async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const USER_ROLE: Role = "regular_user";

    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const data = userDoc.data();
      const role = data.role || USER_ROLE;

      await setDoc(
        userDocRef,
        {
          lastLoginAt: serverTimestamp(),
          role
        },
        { merge: true }
      );

      await AuthService.assignRole(user.uid, role);
    } else {
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email ?? null,
        firstName: user.displayName ?? "",
        lastName: "",
        phoneNumber: "",
        countryCode: "",
        role: USER_ROLE,
        photoURL: user.photoURL ?? null,
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp()
      });

      await AuthService.assignRole(user.uid, USER_ROLE);
    }

    return user;
  }

  static async sendResetPasswordLink({
    email
  }: Pick<CreateUserPayload, "email">) {
    const res = await api.post<{ data: { email: string }; message: string }>(
      "/api/users/send-reset-password-link",
      {
        email
      }
    );

    return res.data.data;
  }

  static async changePassword({
    currentPassword,
    newPassword
  }: {
    currentPassword: string;
    newPassword: string;
  }) {
    const user = auth.currentUser;

    if (!user || !user.email) {
      throw new Error("User not authenticated");
    }

    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    await reauthenticateWithCredential(user, credential);

    await updatePassword(user, newPassword);

    return {
      success: true,
      message: "Password updated successfully"
    };
  }

  static async deleteAccount({
    user,
    currentPassword
  }: {
    user: FirebaseAuthUser;
    currentPassword: string;
  }) {
    if (!user.email) {
      throw new Error("User email not found");
    }

    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    await reauthenticateWithCredential(user, credential);

    const userRef = doc(db, "users", user.uid);
    await deleteDoc(userRef);

    await deleteUser(user);

    return { success: true, message: "Account deleted successfully" };
  }
}
