'use client';

import { useFormState } from 'react-dom';
import {
    Input,
    Button,
    Textarea,
    Select,
    SelectItem,
    Popover,
    PopoverTrigger,
    PopoverContent,
} from '@nextui-org/react';
import * as actions from '@/actions';
import FormButton from './common/form-button';

export const STATUS_MAP = {
    Pending: 'Pending',
    Rejected: 'Rejected',
    Approved: 'Approved',
};

export default function ApplicationCreateForm() {
    const [formState, action] = useFormState(actions.createApplication, {
        errors: {},
    });

    return (
        <Popover placement="left">
            <PopoverTrigger>
                <Button color="primary">Create an Application</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form action={action}>
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
                        />
                        <Select
                            label="Status"
                            name='status'
                            className="max-w-[45%]"
                            defaultSelectedKeys={[STATUS_MAP.Pending]}
                        >
                            <SelectItem key={STATUS_MAP.Pending}>{STATUS_MAP.Pending}</SelectItem>
                            <SelectItem key={STATUS_MAP.Rejected}>{STATUS_MAP.Rejected}</SelectItem>
                            <SelectItem key={STATUS_MAP.Approved}>{STATUS_MAP.Approved}</SelectItem>
                        </Select>

                        <FormButton>Save</FormButton>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
}
