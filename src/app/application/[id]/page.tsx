'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

import {
  Input,
  Textarea,
  RadioGroup,
  Radio,
  Button,
  Checkbox
} from '@nextui-org/react';

import FormButton from '@/components/common/form-button';
import Status from '@/components/common/collapse-card/status';
import styled from 'styled-components';
import { Application } from '@prisma/client';
import { useFormStatus } from 'react-dom';

const STATUS_MAP = {
  Pending: 'Pending',
  Rejected: 'Rejected',
  Approved: 'Approved',
};


const ApplicationShow = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: session }: any = useSession();
  const [application, setApplication] = useState<Application | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isPending, setIsPending] = useState(false);

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

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this application?");
    setIsPending(true)
    if (confirmed) {
      try {
        const response = await fetch(`/api/application/${id}/delete`, {
          method: 'POST'
        });
        setIsPending(false)
        if (response.ok) {
          router.push('/application');
        } else {
          console.error("Failed to delete application");
        }
      } catch (error) {
        setIsPending(false)
        console.error("Failed to delete application", error);
      }
    }
  };


  if (!application) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-4">
      <form method="POST" action={`/api/application/${application.id}`}>
        <div className="flex flex-col gap-4 p-4">
          <Wrap>
            <Status status={application.status} />
            <Checkbox
              name='is_self_submitted'
              value={application.is_self_submitted ? 'true' : 'false'}
              isSelected={application.is_self_submitted ?? false}
            >
              <CheckboxWrap>
                <Text>
                  Self submitted
                </Text>
                <Hint>
                  ( No counselor )
                </Hint>
              </CheckboxWrap>
            </Checkbox>
          </Wrap>
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
          {isOwner && (
            <Button onClick={handleDelete} color="danger" isLoading={isPending}>
              Delete
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ApplicationShow;

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
