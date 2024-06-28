'use client';

import { useFormState, useFormStatus } from 'react-dom';
import {
    Input,
    Button,
    Textarea,
    Select,
    SelectItem,
    Popover,
    Checkbox,
    PopoverTrigger,
    PopoverContent,
} from '@nextui-org/react';
import * as actions from '@/actions';
import FormButton from './common/form-button';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

export const STATUS_MAP = {
    Pending: 'Pending',
    Rejected: 'Rejected',
    Approved: 'Approved',
};

export default function ApplicationCreateForm() {
    const [isSelfSubmitted, setIsSelfSubmitted] = useState(true)
    const { pending } = useFormStatus();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    return (
        <Popover isOpen={isPopoverOpen} placement="top" >
            <PopoverTrigger>
                <Button color="primary" onClick={() => setIsPopoverOpen(true)}>Create an Application</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form method="POST" action={`/api/application/create`}>
                    <div className="flex flex-col gap-4 p-4 w-80">
                        <h3 className="text-lg">Create an Application</h3>
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

                        <Select
                            label="Status"
                            name='status'
                            defaultSelectedKeys={[STATUS_MAP.Pending]}
                        >
                            <SelectItem key={STATUS_MAP.Pending}>{STATUS_MAP.Pending}</SelectItem>
                            <SelectItem key={STATUS_MAP.Rejected}>{STATUS_MAP.Rejected}</SelectItem>
                            <SelectItem key={STATUS_MAP.Approved}>{STATUS_MAP.Approved}</SelectItem>
                        </Select>
                        <Checkbox
                            name='is_self_submitted'
                            isSelected={isSelfSubmitted}
                            value={isSelfSubmitted.toString()}
                            onChange={() => setIsSelfSubmitted(!isSelfSubmitted)}
                        >
                            <Wrap>
                                <Text>
                                    Self submitted
                                </Text>
                                <Hint>
                                    ( No counselor )
                                </Hint>
                            </Wrap>
                        </Checkbox>
                        <Button type="submit" isLoading={pending} onClick={() => {console.log("kik");
                        }}>
                            Save
                        </Button>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
}

const Text = styled.div`
    font-size: 0.875rem;
    font-weight: 400;
`

const Hint = styled.div`
    font-size: 0.6rem;
`

const Wrap = styled.div`
    display: flex;
    gap: 10px;
`
