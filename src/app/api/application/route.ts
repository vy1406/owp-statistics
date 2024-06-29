'use server'

import { NextResponse } from "next/server";
import { db } from "@/db";

export async function GET() {

    try {
        const applications = await db.application.findMany({
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                },
              },
            },
          });

        if (!applications) {
            return NextResponse.json({ error: "Not Found" }, { status: 404 });
        }

        return NextResponse.json(applications, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}