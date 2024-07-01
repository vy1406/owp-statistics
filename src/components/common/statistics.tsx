'use client';

import React from 'react';
import { Link } from "@nextui-org/react";
import CollapseContainer from './collapse-container';
import { calculateAverageDays, calculateAveragePendingDays, findFastestApplication, findLongestApplication, findLongestPendingApplication } from './utils';

interface Application {
    id: string;
    status: string;
    application_date: string;
    decision_date?: string;
}

interface StatisticsProps {
    applications: Application[];
}

const Statistics: React.FC<StatisticsProps> = ({ applications }) => {

    const fastestApplication = findFastestApplication(applications);
    const longestApplication = findLongestApplication(applications);
    const longestPendingApplication = findLongestPendingApplication(applications);
    const { averageDays: averageApprovedDays, total: totalApproved } = calculateAverageDays(applications, 'Approved');
    const { averageDays: averagePendingDays, total: totalPending } = calculateAveragePendingDays(applications);

    return (
        <CollapseContainer text='Statistics..'>
            <div className="my_statistics">
                {fastestApplication && (
                    <div className="my_stat">
                        <h4>Fastest Approved</h4>
                        <p>{fastestApplication.days} days</p>
                        <p>
                            <Link
                                isExternal
                                key={fastestApplication.app.id}
                                href={`/application/${fastestApplication.app.id}`}
                                className="flex justify-between items-center p-2 rounded"
                                showAnchorIcon
                            >
                            </Link>
                        </p>
                    </div>
                )}
                {longestApplication && (
                    <div className="my_stat">
                        <h4>Longest Approved</h4>
                        <p>{longestApplication.days} days</p>
                        <p>
                            <Link
                                isExternal
                                key={longestApplication.app.id}
                                href={`/application/${longestApplication.app.id}`}
                                className="flex justify-between items-center p-2 rounded"
                                showAnchorIcon
                            >
                            </Link>
                        </p>
                    </div>
                )}
                {longestPendingApplication && (
                    <div className="my_stat">
                        <h4>Longest Pending</h4>
                        <p> {longestPendingApplication.days} days</p>
                        <p>
                            <Link
                                isExternal
                                key={longestPendingApplication.app.id}
                                href={`/application/${longestPendingApplication.app.id}`}
                                className="flex justify-between items-center p-2 rounded"
                                showAnchorIcon
                            >
                            </Link>
                        </p>
                    </div>
                )}
                <div className='separator'></div>
                {averageApprovedDays > 0 &&
                    <div className="my_stat_avg">
                        <h4>Avg Approved</h4>
                        <p>{averageApprovedDays} days</p>
                        <p>({totalApproved})</p>
                    </div>
                }
                {averagePendingDays > 0 &&
                    <div className="my_stat_avg">
                        <h4>Avg Pending</h4>
                        <p>{averagePendingDays} days</p>
                        <p>({totalPending})</p>
                    </div>
                }
            </div>
        </CollapseContainer>
    );
};

export default Statistics;

