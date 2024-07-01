'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    Input,
    Button,
    Select,
    SelectItem
} from '@nextui-org/react';
import styled from 'styled-components';
import Link from 'next/link';
import CollapseContainer from './common/collapse-container';

const STATUS_MAP = {
    Pending: 'Pending',
    Rejected: 'Rejected',
    Approved: 'Approved',
};

const SORT_OPTIONS = {
    DateAsc: { label: '(Oldest to Newest)', value: 'dateAsc' },
    DateDesc: { label: '(Newest to Oldest)', value: 'dateDesc' },
};

interface SearchParams {
    dateFrom?: string;
    dateTo?: string;
    status?: string;
    usernameOrInfo?: string;
    sort?: string;
}

const SearchComponent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [status, setStatus] = useState('');
    const [usernameOrInfo, setUsernameOrInfo] = useState('');
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
        const params: SearchParams = {
            dateFrom: searchParams.get('dateFrom') || '',
            dateTo: searchParams.get('dateTo') || '',
            status: searchParams.get('status') || '',
            usernameOrInfo: searchParams.get('usernameOrInfo') || '',
            sort: searchParams.get('sort') || ''
        };

        setDateFrom(params.dateFrom || "");
        setDateTo(params.dateTo || "");
        setStatus(params.status || "");
        setUsernameOrInfo(params.usernameOrInfo || "");
        setSortOption(params.sort || "");
    }, [searchParams]);

    const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const params: SearchParams = {};
        if (dateFrom) params.dateFrom = dateFrom;
        if (dateTo) params.dateTo = dateTo;
        if (status) params.status = status;
        if (usernameOrInfo) params.usernameOrInfo = usernameOrInfo;
        if (sortOption) params.sort = sortOption;

        const queryString = new URLSearchParams(params as any).toString();
        router.push(`/application/search?${queryString}`);
    };

    const handleReset = () => {
        setDateFrom('');
        setDateTo('');
        setStatus('');
        setUsernameOrInfo('');
        setSortOption('');
        router.push('/application/search');
    };

    return (
        <CollapseContainer text='Filter + Search'>
            <form onSubmit={handleOnSubmit}>
                <div className="flex flex-col gap-4">
                    <Input
                        name="date_from"
                        type="date"
                        label="Date From"
                        placeholder="Enter start date"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                    />
                    <Input
                        name="date_to"
                        type="date"
                        label="Date To"
                        placeholder="Enter end date"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                    />
                    <Select
                        label="Status"
                        value={status}
                        selectedKeys={[status]}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <SelectItem key={STATUS_MAP.Pending}>{STATUS_MAP.Pending}</SelectItem>
                        <SelectItem key={STATUS_MAP.Rejected} >{STATUS_MAP.Rejected}</SelectItem>
                        <SelectItem key={STATUS_MAP.Approved}>{STATUS_MAP.Approved}</SelectItem>
                    </Select>
                    <Input
                        name="usernameOrInfo"
                        type="text"
                        label="Username or Additional Info"
                        placeholder="Enter username or additional info"
                        value={usernameOrInfo}
                        onChange={(e) => setUsernameOrInfo(e.target.value)}
                    />
                    <Select
                        label="Sort By"
                        value={sortOption}
                        selectedKeys={[sortOption]}
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                        {Object.values(SORT_OPTIONS).map(option => (
                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                    </Select>
                    <ButtonContainer>
                        <Button type="submit" color="primary" className="text-center">
                            Search
                        </Button>
                        <Button type="button" color="default" onClick={handleReset} className="text-center">
                            Reset
                        </Button>
                        <Link href={"/application"} >
                            Back
                        </Link>
                    </ButtonContainer>
                </div>
            </form>
        </CollapseContainer>

    );
};

export default SearchComponent;

const Wrap = styled.div`
  display:flex;
  align-items: center;
  justify-content: space-between;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  
`;
