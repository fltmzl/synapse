import { userSchema } from "@/schema/user.schema";
import { AuthAdminService } from "@/services/firebase-admin/auth-admin.api";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  // try {
  //   const body = await req.json();
  //   const parsed = userSchema.safeParse(body);
  //   if (!parsed.success) {
  //     return NextResponse.json(
  //       {
  //         message: "Validation error",
  //         errors: z.treeifyError(parsed.error)
  //       },
  //       { status: 400 }
  //     );
  //   }
  //   const { email, firstName, lastName, role, phoneNumber, countryCode } =
  //     parsed.data;
  //   const user = await AuthAdminService.createUser({
  //     email,
  //     firstName,
  //     lastName,
  //     role: "regular_user",
  //     phoneNumber,
  //     countryCode
  //   });
  //   return NextResponse.json({
  //     message: "User created successfully",
  //     data: user
  //   });
  // } catch (err) {
  //   const error = err as { message: string; code: string };
  //   if (error.code === "auth/email-already-exists") {
  //     return NextResponse.json(
  //       {
  //         message: "Email already registered",
  //         error: error.code
  //       },
  //       { status: 400 }
  //     );
  //   }
  //   console.log(error.message);
  //   return NextResponse.json(
  //     {
  //       message: "Internal Server Error",
  //       error: error.message
  //     },
  //     { status: 500 }
  //   );
  // }
}
