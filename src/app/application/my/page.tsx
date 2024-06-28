'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Application as PrismaApplication, User as PrismaUser } from "@prisma/client";

import styled from 'styled-components';
import ApplicationList from '@/components/applications-list';
import ApplicationSkeleton from '@/components/common/application-skeleton';

interface User extends PrismaUser {
    username: string;
}

interface Application extends PrismaApplication {
    user: User;
}


const MyAppliocations = () => {
    const router = useRouter();
    const { data: session }: any = useSession();
    const [applications, setApplications] = useState<Application[] | null>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                setIsLoading(true)
                const response = await fetch(`/api/application/my`);
                if (response.ok) {
                    const data = await response.json();
                    setApplications(data);
                    setIsLoading(false)
                } else {
                    setIsLoading(false)
                }
            } catch (error) {
                setIsLoading(false)
            }
        };
        fetchApplications()

    }, [session?.user?.id, router]);


    return (
        <div className="m-4">
            <div className="flex flex-col gap-2">
                {isLoading ? <ApplicationSkeleton /> :
                    <ApplicationList applications={applications || []} />
                }
            </div>
        </div>
    );
};

export default MyAppliocations;

const Wrap = styled.div`
  display:flex;
  align-items: center;
  justify-content: space-between;
`

const Text = styled.div`
    font-size: 0.875rem;
    font-weight: 400;
`

const Hint = styled.div`
    font-size: 0.6rem;
`

const CheckboxWrap = styled.div`
    display: flex;
    gap: 10px;
`
