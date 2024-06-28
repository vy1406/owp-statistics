'use server'

import { NextResponse } from "next/server";
import { db } from "@/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export async function GET() {
    const session: any = await getServerSession(authOptions as any);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {

        const applications = await db.application.findMany({
            where: { user_id: session.user.id },
            orderBy: {
                created_at: 'desc',
            },
            include: {
                user: true,
            },
        });

        if (!applications) {
            return NextResponse.json({ error: "Not Found" }, { status: 404 });
        }

        return NextResponse.json(applications, { status: 200 });
    } catch (error) {
        console.error("Error fetching application:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}