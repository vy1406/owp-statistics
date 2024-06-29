'use client';

import React from 'react';
import { Application as PrismaApplication, User as PrismaUser } from "@prisma/client";

import CollapsibleApplicationBox from './common/collapse-card';

interface User extends PrismaUser {
    username: string;
}

interface Application extends PrismaApplication {
    user: User;
}

interface ApplicationListProps {
    applications: Application[];
}


const ApplicationList = ({ applications }: ApplicationListProps) => {

    return (
        <>
            {applications?.map(application => (
                <CollapsibleApplicationBox application={application} key={application.id}/>))}
        </>
    );
};

export default ApplicationList;

