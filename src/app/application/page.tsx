import { db } from '@/db';
import ApplicationCreateForm from '@/components/create-application-form';
import CollapsibleApplicationBox from '@/components/common/collapse-card';

export const dynamic = 'force-dynamic'
export const revalidate = 0;

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

    const renderApplications = pulledApplications.map((application) => {

        return (
            <CollapsibleApplicationBox application={application}/>
        );
    });

    return (
        <div>
            <ApplicationCreateForm />
            <div className="flex flex-col gap-2">{renderApplications}</div>
        </div>
    );
}

