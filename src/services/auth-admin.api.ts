import { adminDb, firebaseAdmin } from "@/firebase/firebase.admin";
import { User } from "@/types/user.type";
import { firestore } from "firebase-admin";
import { AuthService, CreateUserPayload } from "./auth.api";
import { MailService } from "./mail.api";

export class AuthAdminService {
  static async createUserByAdmin({
    email,
    name,
    role,
    companyId
  }: CreateUserPayload) {
    // 1. Create user in Firebase Auth (Admin SDK)
    const userRecord = await firebaseAdmin.auth().createUser({
      email,
      displayName: name
    });

    // 2. Insert to Firestore (Admin SDK)
    await adminDb.collection("users").doc(userRecord.uid).set({
      uid: userRecord.uid,
      email,
      role,
      companyId,
      firstName: name,
      lastName: "",
      phoneNumber: "",
      createdAt: firestore.FieldValue.serverTimestamp(), // pakai Date di Admin SDK
      createdBy: "superadmin"
    });

    // 3. Assign role via backend
    await AuthService.assignRole(userRecord.uid, role);

    // 4. Send email to user to set password
    await AuthAdminService.sendSetPasswordLink({ email, name });

    return userRecord;
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    const snapshot = await adminDb
      .collection("users")
      .where("email", "==", email)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return null;
    }

    const docSnap = snapshot.docs[0];
    return {
      id: docSnap.id,
      ...(docSnap.data() as User)
    };
  }

  static async sendSetPasswordLink({
    email,
    name
  }: {
    email: string;
    name: string;
  }) {
    const setPasswordLink = await AuthAdminService.createSetPasswordLink(email);
    await MailService.sendMail({
      to: [email],
      message: {
        subject: "Brandiie - Welcome",
        html: MailService.createClientUserWelcomeTemplate({
          firstName: name,
          passwordLink: setPasswordLink
        })
      }
    });

    return setPasswordLink;
  }

  static async sendResetPasswordLink({
    email,
    name
  }: {
    email: string;
    name?: string;
  }) {
    const setPasswordLink =
      await AuthAdminService.createResetPasswordLink(email);
    await MailService.sendMail({
      to: [email],
      message: {
        subject: "Brandiie - Reset Password",
        text: `Hi ${
          name || ""
        }, click this link to reset your password: ${setPasswordLink}`
      }
    });

    return setPasswordLink;
  }

  static async deleteUserAuth(userId: string) {
    await firebaseAdmin.auth().deleteUser(userId);

    return userId;
  }

  private static async createSetPasswordLink(email: string) {
    const link = await firebaseAdmin.auth().generatePasswordResetLink(email);

    const url = new URL(link);
    const oobCode = url.searchParams.get("oobCode");

    const customLink = `${
      process.env.NEXT_PUBLIC_APP_URL
    }/auth/set-password?oobCode=${oobCode}&email=${encodeURIComponent(email)}`;

    return customLink;
  }

  private static async createResetPasswordLink(email: string) {
    const link = await firebaseAdmin.auth().generatePasswordResetLink(email);

    const url = new URL(link);
    const oobCode = url.searchParams.get("oobCode");

    const customLink = `${
      process.env.NEXT_PUBLIC_APP_URL
    }/auth/new-password?oobCode=${oobCode}&email=${encodeURIComponent(email)}`;

    return customLink;
  }
}
