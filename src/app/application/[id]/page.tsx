'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { db } from '@/db';
import {
  Input,
  Textarea,
  RadioGroup,
  Radio
} from '@nextui-org/react';

import FormButton from '@/components/common/form-button';
import Status from '@/components/common/collapse-card/status';

const STATUS_MAP = {
  Pending: 'Pending',
  Rejected: 'Rejected',
  Approved: 'Approved',
};

interface Application {
  id: string;
  application_date: string;
  biometric_date?: string;
  decision_date?: string;
  submission_city?: string;
  additional_info?: string;
  status: 'Pending' | 'Rejected' | 'Approved';
  user_id: string;
}

const ApplicationShow = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: session }: any = useSession();
  const [application, setApplication] = useState<Application | null>(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await fetch(`/api/application/${id}`);
        
        if (response.ok) {
          const data = await response.json();
          setApplication(data);
          setIsOwner(session?.user?.id === data.user_id);
        } else {
          router.replace('/not-found');
        }
      } catch (error) {
        console.error("Failed to fetch application", error);
        router.replace('/not-found');
      }
    };

    if (id) {
      fetchApplication();
    }
  }, [id, session?.user?.id, router]);

  if (!application) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-4">
      <form method="POST" action={`/api/application/${application.id}`}>
        <div className="flex flex-col gap-4 p-4">
          <Status status={application.status} />
          <Input
            type="text"
            label="Creator"
            value={session?.user?.username ?? ''}
            disabled
          />
          <Input
            name="application_date"
            type="date"
            label="Application Date"
            placeholder="Enter application date"
            defaultValue={application.application_date ?? ''}
            disabled={!isOwner}
            required
          />
          <Input
            name="biometric_date"
            type="date"
            label="Biometric Date"
            placeholder="Enter biometric date"
            defaultValue={application.biometric_date ?? ''}
            disabled={!isOwner}
          />
          <Input
            name="decision_date"
            type="date"
            label="Decision Date"
            placeholder="Enter decision date"
            defaultValue={application.decision_date ?? ''}
            disabled={!isOwner}
          />
          <Input
            name="submission_city"
            type="text"
            label="Submission City"
            placeholder="Enter submission city"
            defaultValue={application.submission_city ?? ''}
            disabled={!isOwner}
          />
          <Textarea
            name="additional_info"
            label="Additional Info"
            placeholder="Enter additional info"
            defaultValue={application.additional_info ?? ''}
            disabled={!isOwner}
            maxLength={254}
          />
          <RadioGroup
            label="Choose status"
            name="status"
            defaultValue={application.status}
          >
            <Radio value={STATUS_MAP.Approved}>{STATUS_MAP.Approved}</Radio>
            <Radio value={STATUS_MAP.Pending}>{STATUS_MAP.Pending}</Radio>
            <Radio value={STATUS_MAP.Rejected}>{STATUS_MAP.Rejected}</Radio>
          </RadioGroup>
          {isOwner && <FormButton>Save</FormButton>}
        </div>
      </form>
    </div>
  );
};

export default ApplicationShow;
