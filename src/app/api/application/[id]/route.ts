// import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// import { db } from '@/db';

// export async function POST(request: Request, { params }: { params: { id: string } }) {
//   const session: any = await getServerSession({ req: request }, authOptions );

//   if (!session) {
//     return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
//   }

//   const { id } = params;

//   // Check if the application exists
//   const application = await db.application.findFirst({
//     where: { id },
//   });

//   if (!application) {
//     return NextResponse.json({ message: 'Application not found' }, { status: 404 });
//   }

//   // Check if the logged-in user is the owner of the application
//   if (session.user.id !== application.user_id) {
//     return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
//   }

//   const formData = await request.formData();
//   const status = formData.get('status') as string;
//   const biometric_date = formData.get('biometric_date') as string | null;
//   const submission_city = formData.get('submission_city') as string | null;
//   const additional_info = formData.get('additional_info') as string | null;

//   try {
//     // Update the application
//     await db.application.update({
//       where: { id },
//       data: {
//         status,
//         biometric_date,
//         submission_city,
//         additional_info,
//       },
//     });

//     return NextResponse.json({ message: 'Application updated successfully' });
//   } catch (error) {
//     console.error('Error updating application:', error);
//     return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
//   }
// }
