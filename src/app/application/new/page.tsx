'use client';

import React, { useEffect, useState } from 'react';
import {
  Input,
  Textarea,
  RadioGroup,
  Radio,
  Checkbox,
  Button
} from '@nextui-org/react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

const STATUS_MAP = {
  Pending: 'Pending',
  Rejected: 'Rejected',
  Approved: 'Approved',
};

const NewApplication = () => {
  const router = useRouter();
  const [isSelfSubmitted, setIsSelfSubmitted] = useState(true);
  const [decisionDate, setDecisionDate] = useState('');
  const [statusOptions, setStatusOptions] = useState([STATUS_MAP.Pending]);
  const [selectedStatus, setSelectedStatus] = useState(STATUS_MAP.Pending);
  const [statusRequired, setStatusRequired] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
    setIsLoading(true);
    setErrors({});

    const formData = new FormData(event.currentTarget);
    const applicationDate = formData.get('application_date') as string;
    const biometricDate = formData.get('biometric_date') as string;
    const decisionDate = formData.get('decision_date') as string;

    const today = new Date().toISOString().split('T')[0];

    let valid = true;
    let newErrors: { [key: string]: string } = {};

    if (applicationDate > today) {
      newErrors['application_date'] = 'Application date cannot be later than today.';
      valid = false;
    }

    if (biometricDate && biometricDate < applicationDate) {
      newErrors['biometric_date'] = 'Biometric date cannot be before application date.';
      valid = false;
    }

    if (decisionDate && decisionDate < applicationDate) {
      newErrors['decision_date'] = 'Decision date cannot be before application date.';
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    formData.set('is_self_submitted', isSelfSubmitted.toString());

    try {
      const response = await fetch('/api/application/create', {
        method: 'POST',
        body: formData,
      });

      setIsLoading(false);
      if (response.ok) {
        router.push('/application');
      } else {
        const result = await response.json();
        console.error(result.error);
      }
    } catch (error) {
      setIsLoading(false);
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
            isInvalid={!!errors.application_date}
            errorMessage={errors.application_date}
          />
          <Input
            name="biometric_date"
            type="date"
            label="Biometric Date"
            placeholder="Enter biometric date"
            isInvalid={!!errors.biometric_date}
            errorMessage={errors.biometric_date}
          />
          <Input
            name="decision_date"
            type="date"
            label="Decision Date"
            placeholder="Enter decision date"
            value={decisionDate}
            onChange={(e) => setDecisionDate(e.target.value)}
            required={statusRequired}
            isInvalid={!!errors.decision_date}
            errorMessage={errors.decision_date}
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
            name="is_self_submitted"
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
`;

const Text = styled.div`
    font-size: 0.875rem;
    font-weight: 400;
`;

const CheckboxWrap = styled.div`
    display: flex;
    gap: 10px;
`;
