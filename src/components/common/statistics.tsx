'use client';

import React from 'react';
import { Link } from "@nextui-org/react";
import CollapseContainer from './collapse-container';

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
    const getDaysDifference = (start: string, end: string): number => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const difference = endDate.getTime() - startDate.getTime();
        return Math.ceil(difference / (1000 * 3600 * 24));
    };

    const findFastestApplication = () => {
        let fastestApp = null;
        let minDays = Infinity;

        for (const app of applications) {
            if (app.status === 'Approved' && app.decision_date) {
                const days = getDaysDifference(app.application_date, app.decision_date);
                if (days < minDays) {
                    minDays = days;
                    fastestApp = app;
                }
            }
        }

        return fastestApp ? { app: fastestApp, days: minDays } : null;
    };

    const findLongestApplication = () => {
        let longestApp = null;
        let maxDays = -Infinity;

        for (const app of applications) {
            if (app.status === 'Approved' && app.decision_date) {
                const days = getDaysDifference(app.application_date, app.decision_date);
                if (days > maxDays) {
                    maxDays = days;
                    longestApp = app;
                }
            }
        }

        return longestApp ? { app: longestApp, days: maxDays } : null;
    };

    const findLongestPendingApplication = () => {
        let longestPendingApp = null;
        let maxDays = -Infinity;
        const today = new Date().toISOString().split('T')[0];

        for (const app of applications) {
            if (app.status === 'Pending') {
                const days = getDaysDifference(app.application_date, today);
                if (days > maxDays) {
                    maxDays = days;
                    longestPendingApp = app;
                }
            }
        }

        return longestPendingApp ? { app: longestPendingApp, days: maxDays } : null;
    };

    const fastestApplication = findFastestApplication();
    const longestApplication = findLongestApplication();
    const longestPendingApplication = findLongestPendingApplication();

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
            </div>
        </CollapseContainer>
    );
};

export default Statistics;
