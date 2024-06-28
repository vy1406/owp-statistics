'use server'

import { NextResponse } from "next/server";
import { db } from "@/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export async function POST(request: Request): Promise<any> {

    try {
        const session: any = await getServerSession(authOptions as any);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await request.formData();
        const application_date = formData.get('application_date') as string
        const biometric_date = formData.get('biometric_date') as string | null;
        const decision_date = formData.get('decision_date') as string | null;
        const submission_city = formData.get('submission_city') as string | null;
        const additional_info = formData.get('additional_info') as string | null;
        const is_self_submitted = formData.get('is_self_submitted') as string || false;
        const status = formData.get('status') as string;

        const calculateStatus = () => {
            if (decision_date) {
                return 'Approved';
            } else {
                return status
            }
        }

        await db.application.create({
            data: {
                application_date,
                decision_date,
                biometric_date,
                submission_city,
                is_self_submitted: is_self_submitted === "true" ? true : false,
                additional_info,
                user_id: session.user.id,
                status: calculateStatus(),
            },
        });

        revalidatePath(`/application`);
        const host = request.headers.get("host");
        const protocol = request.headers.get("x-forwarded-proto") ?? "http";
        const redirectUrl = `${protocol}://${host}/application`;

        return NextResponse.redirect(redirectUrl);
    } catch (error) {

        console.error("Error updating application:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

