import { updateUserSchema } from "@/schema/user.schema";
import { AuthAdminService } from "@/services/firebase-admin/auth-admin.api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
  try {
    const { uid } = await params;
    const user = await AuthAdminService.getUserById(uid);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ data: user });
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
  try {
    const { uid } = await params;
    const body = await req.json();

    const validatedBody = updateUserSchema.parse(body);

    const user = await AuthAdminService.updateUser(uid, validatedBody);

    return NextResponse.json({ data: user });
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
  try {
    const { uid } = await params;

    await AuthAdminService.deleteUser(uid);

    return NextResponse.json({
      data: { message: "User deleted successfully" }
    });
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
