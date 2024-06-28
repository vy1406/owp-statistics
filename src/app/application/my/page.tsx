'use client'

import ApplicationCreateForm from '@/components/create-application-form';
import CollapsibleApplicationBox from '@/components/common/collapse-card';


// async function fetchApplications(): Promise<any[]> {
//     const applications = await db.application.findMany({
//         orderBy: {
//             created_at: 'desc',
//         },
//         include: {
//             user: true,
//         },
//     });
//     return applications;
// }

export default async function MyApplicationsPage() {
    // const pulledApplications = await fetchApplications();

    // const renderApplications = pulledApplications.map((application) => {

    //     return (
    //         <CollapsibleApplicationBox application={application}/>
    //     );
    // });

    return (
        <div>
            my applications
            {/* <div className="flex flex-col gap-2">{renderApplications}</div> */}
        </div>
    );
}

