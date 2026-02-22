import { AuthService } from "@/services/auth.api";
import { AuthAdminService } from "@/services/firebase-admin/auth-admin.api";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const bodySchema = z.object({
      email: z.email({ message: "Invalid email address" })
    });

    const body = await req.json();

    const parsed = bodySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: z.treeifyError(parsed.error)
        },
        { status: 400 }
      );
    }

    const { email } = parsed.data;

    const name = await AuthService.getNameByEmail(email);

    await AuthAdminService.sendResetPasswordLink({
      email,
      name: name || null
    });

    return NextResponse.json({
      message: "Reset password link sent successfully",
      data: {
        email
      }
    });
  } catch (err) {
    const error = err as { message: string };

    console.log(error.message);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error.message
      },
      { status: 500 }
    );
  }
}
