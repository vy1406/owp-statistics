import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/db";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    const hashedPassword = bcrypt.hashSync(password, 10);

    
    const user = await db.user.create({
      data: { username, password: hashedPassword }
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
