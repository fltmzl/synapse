import { AuthAdminService } from "@/services/firebase-admin/auth-admin.api";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const changePasswordBodySchema = z.object({
  newPassword: z.string().min(6)
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
  try {
    const { uid } = await params;
    const body = await req.json();

    const { newPassword } = changePasswordBodySchema.parse(body);

    await AuthAdminService.changeUserPassword(uid, newPassword);

    return NextResponse.json({
      data: { message: "Password updated successfully" }
    });
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Error changing password:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
