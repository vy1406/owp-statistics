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
  username?: string;
  sort?: string;
}

const SearchComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [status, setStatus] = useState('');
  const [username, setUsername] = useState('');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    const params: SearchParams = {
      dateFrom: searchParams.get('dateFrom') || '',
      dateTo: searchParams.get('dateTo') || '',
      status: searchParams.get('status') || '',
      username: searchParams.get('username') || '',
      sort: searchParams.get('sort') || ''
    };

    setDateFrom(params.dateFrom || "");
    setDateTo(params.dateTo || "");
    setStatus(params.status || "");
    setUsername(params.username || "");
    setSortOption(params.sort || "");
  }, [searchParams]);

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const params: SearchParams = {};
    if (dateFrom) params.dateFrom = dateFrom;
    if (dateTo) params.dateTo = dateTo;
    if (status) params.status = status;
    if (username) params.username = username;
    if (sortOption) params.sort = sortOption;

    const queryString = new URLSearchParams(params as any).toString();
    router.push(`/application/search?${queryString}`);
  };

  const handleReset = () => {
    setDateFrom('');
    setDateTo('');
    setStatus('');
    setUsername('');
    setSortOption('');
    router.push('/application/search');
  };

  return (
    <div className="m-4">
      <form onSubmit={handleOnSubmit}>
        <div className="flex flex-col gap-4 p-4">
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
            name="username"
            type="text"
            label="Username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
    </div>
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
