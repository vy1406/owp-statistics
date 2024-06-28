import Link from 'next/link';
import { db } from '@/db';
import ApplicationCreateForm from '@/components/create-application-form';
import CollapsibleApplicationBox from '@/components/common/collapse-card';


async function fetchApplications(): Promise<any[]> {
    const applications = await db.application.findMany({
        orderBy: {
            created_at: 'desc',
        },
        include: {
            user: true,
        },
    });
    return applications;
}

export default async function ApplicationsPage() {
    const pulledApplications = await fetchApplications();

    console.log(pulledApplications);   
    const renderApplications = pulledApplications.map((application) => {

        return (
            <CollapsibleApplicationBox application={application}/>
        );
    });

    return (
        <div>
            <div className="flex m-2 justify-between items-center">
                <h1 className="text-xl font-bold">Applications</h1>
                <Link href="/application/new" className="border p-2 rounded">
                    New
                </Link>
            </div>
            <ApplicationCreateForm />
            <div className="flex flex-col gap-2">{renderApplications}</div>
        </div>
    );
}

