import { userSchema } from "@/schema/user.schema";
import { AuthAdminService } from "@/services/firebase-admin/auth-admin.api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validatedBody = userSchema.parse(body);

    const user = await AuthAdminService.createUser(validatedBody);

    return NextResponse.json({ data: user });
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const users = await AuthAdminService.getAllUsers();

    return NextResponse.json({ data: users });
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
