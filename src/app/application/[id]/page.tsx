import { notFound } from 'next/navigation';
import { db } from '@/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

interface ApplicationShowProps {
  id: string;
}

export default async function ApplicationShow({ id }: ApplicationShowProps) {
  const session: any = await getServerSession(authOptions as any);
  
  const application = await db.application.findFirst({
    where: { id },
  });

  if (!application) {
    return notFound();
  }

  const isOwner = session?.user?.id === application.user_id;

  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold my-2">Application Date: {application.application_date}</h1>
      <form method="POST" action={`/api/application/${application.id}`}>
        <div className="mb-4">
          <label className="block text-gray-700">Status:</label>
          <input
            type="text"
            name="status"
            defaultValue={application.status}
            className="p-2 border rounded w-full"
            disabled={!isOwner}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Biometric Date:</label>
          <input
            type="date"
            name="biometric_date"
            defaultValue={application.biometric_date ?? ''}
            className="p-2 border rounded w-full"
            disabled={!isOwner}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Submission City:</label>
          <input
            type="text"
            name="submission_city"
            defaultValue={application.submission_city ?? ''}
            className="p-2 border rounded w-full"
            disabled={!isOwner}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Additional Info:</label>
          <textarea
            name="additional_info"
            defaultValue={application.additional_info ?? ''}
            className="p-2 border rounded w-full"
            disabled={!isOwner}
          />
        </div>
        {isOwner && (
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
