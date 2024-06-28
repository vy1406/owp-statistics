'use server'
import { NextResponse } from "next/server";
import { db } from "@/db";
import { redirect } from 'next/navigation';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";


export async function POST(request: Request, { params }: { params: { id: string } }): Promise<any> {

    try {
        const session: any = await getServerSession(authOptions as any);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = params;
        const formData = await request.formData();
        const application_date = formData.get('application_date') as string;
        const is_self_submitted = formData.get('is_self_submitted') as string || false;
        const biometric_date = formData.get('biometric_date') as string | null;
        const decision_date = formData.get('decision_date') as string | null;
        const submission_city = formData.get('submission_city') as string | null;
        const additional_info = formData.get('additional_info') as string | null;
        const status = formData.get('status') as string;

        const application = await db.application.findUnique({
            where: { id }
        });

        if (!application) {
            return NextResponse.json({ error: "Not Found" }, { status: 404 });
        }

        if (application.user_id !== session.user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }


        await db.application.update({
            where: { id },
            data: {
                application_date,
                biometric_date,
                decision_date,
                submission_city,
                is_self_submitted: is_self_submitted === "true" ? true : false,
                additional_info,
                status,
                updated_at: new Date()
            }
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


export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const session: any = await getServerSession(authOptions as any);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = params;
        const application = await db.application.findUnique({
            where: { id }
        });

        if (!application) {
            return NextResponse.json({ error: "Not Found" }, { status: 404 });
        }

        if (application.user_id !== session.user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        console.log("Deleting application:", id);
        let deletedApplication = "1"
        // const deletedApplication = await db.application.delete({
        //   where: { id }
        // });

        return NextResponse.json(deletedApplication, { status: 200 });
    } catch (error) {
        console.error("Error deleting application:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {

        const { id } = params;
        const application = await db.application.findUnique({
            where: { id }
        });

        if (!application) {
            return NextResponse.json({ error: "Not Found" }, { status: 404 });
        }

        return NextResponse.json(application, { status: 200 });
    } catch (error) {
        console.error("Error fetching application:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}