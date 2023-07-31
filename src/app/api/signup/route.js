import { createUser } from "@/services/authorization";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const hashed_password = await hash(password, 12);

    const user = await createUser({ name, email, hashed_password });

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
        id: user.id,
      },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
