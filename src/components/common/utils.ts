interface Application {
    id: string;
    status: string;
    application_date: string;
    decision_date?: string;
}


const getDaysDifference = (start: string, end: string): number => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const difference = endDate.getTime() - startDate.getTime();
    return Math.ceil(difference / (1000 * 3600 * 24));
};

export const findFastestApplication = (applications: Application[]) => {
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

export const findLongestApplication = (applications: Application[]) => {
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

export const findLongestPendingApplication = (applications: Application[]) => {
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

export const calculateAverageDays = (applications: Application[], status: string) => {
    const filteredApps = applications.filter((app: Application) => app.status === status && app.decision_date);
    const totalDays = filteredApps.reduce((total: number, app: Application) => {
        return total + getDaysDifference(app.application_date, app.decision_date!);
    }, 0);
    const averageDays = filteredApps.length ? Math.floor(totalDays / filteredApps.length) : 0;
    return { averageDays, total: filteredApps.length };
};

export const calculateAveragePendingDays = (applications: Application[]) => {
    const filteredApps = applications.filter((app: Application) => app.status === 'Pending');
    const today = new Date().toISOString().split('T')[0];
    const totalDays = filteredApps.reduce((total: number, app: Application) => {
        return total + getDaysDifference(app.application_date, today);
    }, 0);
    const averageDays = filteredApps.length ? Math.floor(totalDays / filteredApps.length) : 0;
    return { averageDays, total: filteredApps.length };
};
