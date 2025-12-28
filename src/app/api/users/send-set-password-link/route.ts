import { AuthAdminService } from "@/services/firebase-admin/auth-admin.api";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  // try {
  //   const bodySchema = z.object({
  //     email: z.email({ message: "Invalid email address" }),
  //     name: z.string({ error: "Name is required" })
  //   });
  //   const body = await req.json();
  //   const parsed = bodySchema.safeParse(body);
  //   if (!parsed.success) {
  //     return NextResponse.json(
  //       {
  //         message: "Validation error",
  //         errors: z.treeifyError(parsed.error)
  //       },
  //       { status: 400 }
  //     );
  //   }
  //   const { email, name } = parsed.data;
  //   let firstNameUser = "";
  //   if (!name) {
  //     const user = await AuthAdminService.getUserByEmail(email);
  //     firstNameUser = user?.firstName || "";
  //   }
  //   await AuthAdminService.sendSetPasswordLink({
  //     email,
  //     name: name || firstNameUser
  //   });
  //   return NextResponse.json({
  //     message: "Set password link sent successfully",
  //     data: {
  //       email
  //     }
  //   });
  // } catch (err) {
  //   const error = err as { message: string };
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
