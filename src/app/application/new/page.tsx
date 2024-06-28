'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  Input,
  Textarea,
  RadioGroup,
  Radio,
  Checkbox,
  Button
} from '@nextui-org/react';
import styled from 'styled-components';

const STATUS_MAP = {
  Pending: 'Pending',
  Rejected: 'Rejected',
  Approved: 'Approved',
};

const NewApplication = () => {
  const { data: session }: any = useSession();
  const [isSelfSubmitted, setIsSelfSubmitted] = useState(true);
  const [decisionDate, setDecisionDate] = useState('');
  const [statusOptions, setStatusOptions] = useState([STATUS_MAP.Pending]);
  const [selectedStatus, setSelectedStatus] = useState(STATUS_MAP.Pending);
  const [statusRequired, setStatusRequired] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (decisionDate) {
      setStatusOptions([STATUS_MAP.Rejected, STATUS_MAP.Approved]);
      setSelectedStatus(STATUS_MAP.Approved);
      setStatusRequired(true);
    } else {
      setStatusOptions([STATUS_MAP.Pending]);
      setStatusRequired(false);
      setSelectedStatus(STATUS_MAP.Pending);
    }
  }, [decisionDate]);

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true)
    const formData = new FormData(event.currentTarget);
    formData.set('is_self_submitted', isSelfSubmitted.toString());


    try {
      const response = await fetch('/api/application/create', {
        method: 'POST',
        body: formData,
      });

      setIsLoading(false)
      if (response.ok) {
        window.location.href = '/application'; // Redirect to the applications page
      } else {
        const result = await response.json();
        console.error(result.error);
      }
    } catch (error) {
      setIsLoading(false)
      console.error('Failed to submit form:', error);
    }
  };


  return (
    <div className="m-2">
      <form onSubmit={handleOnSubmit}>
        <div className="flex flex-col gap-4 p-4">
          <Input
            name="application_date"
            type="date"
            label="Application Date"
            placeholder="Enter application date"
            required
          />
          <Input
            name="biometric_date"
            type="date"
            label="Biometric Date"
            placeholder="Enter biometric date"
          />
          <Input
            name="decision_date"
            type="date"
            label="Decision Date"
            placeholder="Enter decision date"
            value={decisionDate}
            onChange={(e) => setDecisionDate(e.target.value)}
            required={statusRequired}
          />
          <Input
            name="submission_city"
            type="text"
            label="Submission City"
            placeholder="Enter submission city"
          />
          <Textarea
            name="additional_info"
            label="Additional Info"
            placeholder="Enter additional info"
            maxLength={254}
          />
          <Checkbox
            name='is_self_submitted'
            isSelected={isSelfSubmitted}
            onChange={() => setIsSelfSubmitted(!isSelfSubmitted)}
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
          <RadioGroup
            label="Choose status"
            name="status"
            value={selectedStatus}
            onChange={(e: any) => setSelectedStatus(e.target.value)}
            isRequired={statusRequired}
          >
            {statusOptions.map((status) => (
              <Radio key={status} value={status}>{status}</Radio>
            ))}
          </RadioGroup>
          <Hint>Status depends on decision date</Hint>
          <Button type="submit" isLoading={isLoading}>Save</Button>
        </div>
      </form>
    </div>
  );
};

export default NewApplication;

const Hint = styled.div`
    font-size: 0.7rem;
`

const Text = styled.div`
    font-size: 0.875rem;
    font-weight: 400;
`

const CheckboxWrap = styled.div`
    display: flex;
    gap: 10px;
`
