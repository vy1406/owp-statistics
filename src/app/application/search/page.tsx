import CollapsibleApplicationBox from '@/components/common/collapse-card';
import SearchComponent from '@/components/search';
import { fetchBySearchParams } from '@/db/queries/applications-by-url';
import Link from 'next/link';

interface Props {
    searchParams: SearchParams;
}
interface SearchParams {
    dateFrom?: string;
    dateTo?: string;
    status?: string;
    username?: string;
    sort?: string;
}

export default async function SearchPage({ searchParams }: Props) {
    const pulledApplications = await fetchBySearchParams(searchParams);

    const renderApplications = pulledApplications.map((application) => {

        return (
            <>
                <CollapsibleApplicationBox application={application} />
            </>
        );
    });

    return (
        <div>
            <div className="flex flex-col gap-2">
                <SearchComponent />
            </div>
            <div className="flex flex-col gap-2">{renderApplications}</div>
        </div>
    );
}
