'use client'

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from '../../icons/chevron';
import { Application } from '@prisma/client';
import { Link } from "@nextui-org/react";
import { calculateDaysSinceDate, formatDate } from '@/app/utils';
import styled from 'styled-components';
import Counters from './days';

interface CollapsibleApplicationBoxProps {
  application: Application;
}

const CollapsibleApplicationBox: React.FC<CollapsibleApplicationBoxProps> = ({ application }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [height, setHeight] = useState('0px');

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setHeight(isOpen ? `${contentRef.current?.scrollHeight}px` : '0px');
  }, [isOpen]);


  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/application/${application.id}`)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 5000);
      })
      .catch(err => console.error('Failed to copy: ', err));
  };

  return (
    <div className="border rounded shadow-md mb-4">
      <div
        className="flex justify-between items-center p-4 bg-gray-100 cursor-pointer"
        onClick={handleToggle}
      >
        <span>{formatDate(application.application_date)}</span>
        <span>{application.status || "--------"}</span>
        <span>{calculateDaysSinceDate(application.application_date)} days</span>
        <ChevronDown isOpen={isOpen} />
      </div>
      <div
        ref={contentRef}
        style={{ height }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <Container>
          <Row>
            <Title>Application Date:</Title>
            <Text>{formatDate(application.application_date)}</Text>
          </Row>
          <Row>
            <Title>Biometric Date:</Title>
            <Text>{formatDate(application.biometric_date)}</Text>
          </Row>
          {application.submission_city && <Row>
            <Title>Submission City:</Title>
            <Text>{application.submission_city}</Text>
          </Row>}
          {application.additional_info &&
            <>
              <Row>
                <Title>Additional Info:</Title>
              </Row>
              <Row>
                <Text>{application.additional_info || 'N/A'}</Text>
              </Row>
            </>
          }
          <Separator />
          <Counters
            application_date={application.application_date}
            biometric_date={application.biometric_date}
            status={application.status}
          />
          <Separator />
          <Actions>
            <Link
              isExternal
              key={application.id}
              href={`/application/${application.id}`}
              className="flex justify-between items-center p-2 border rounded"
              showAnchorIcon
            >
              Open External
            </Link>
            <button
              onClick={handleCopyLink}
              className="flex justify-between items-center p-2 border rounded"
            >
              Copy link
            </button>
            {copied && <Copied >Link copied!</Copied>}
          </Actions>
        </Container>
      </div>
    </div>
  );
};

export default CollapsibleApplicationBox;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 10px;
  gap: 4px;
`;

const Title = styled.div`
  width: 10em;
`

const Text = styled.div``

const Row = styled.div`
  display: flex;
`;
const Separator = styled.div`
  height: 1px;
  background-color: #e0e0e0;
  margin: 10px 0;
`
const Actions = styled(Row)`
  gap: 10px;
`
const Copied = styled.div`
  display:flex;
  align-items: center;
  color: rgb(34,197,94);
`


