import { NextResponse } from "next/server";
import { db } from "@/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/utils/authOptions";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const session: any = await getServerSession(authOptions);
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
    
    await db.application.delete({
      where: { id }
    });

    revalidatePath(`/application`);

    return NextResponse.redirect(new URL('/application', request.url));
  } catch (error) {
    console.error("Error deleting application:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
