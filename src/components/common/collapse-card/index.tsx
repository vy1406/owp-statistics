'use client'

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from '../../icons/chevron';
import { Application as PrismaApplication, User as PrismaUser } from "@prisma/client";
import { Checkbox, Link } from "@nextui-org/react";
import { calculateDaysDifference, calculateDaysSinceDate, formatDate } from '@/app/utils';
import styled from 'styled-components';
import Counters from './days';
import Status from './status';

interface User extends PrismaUser {
  username: string;
}

interface Application extends PrismaApplication {
  user: User;
}

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

  const isDicisionMade = application.decision_date ? true : false;

  return (
    <div className="border rounded shadow-md mb-4">
      <div
        className="flex justify-between items-center p-4 bg-gray-100 cursor-pointer"
        onClick={handleToggle}
      >
        <Col>
          <span>{formatDate(application.application_date)}</span>
        </Col>
        {isDicisionMade ?
          <>
            <Col>
              <Status status={application.status} />
            </Col>
            <Col>
              <span>After {calculateDaysDifference(application.application_date, application.decision_date!)}d</span>
            </Col>
          </>
          :
          <>
            <Col>
              <Status status={application.status} />
            </Col>
            <Col>
              <span>{calculateDaysSinceDate(application.application_date)} days</span>
            </Col>
          </>
        }
        <ChevronWrap>
          <ChevronDown isOpen={isOpen} />
        </ChevronWrap>
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
          <Row>
            <Title>Self submitted ? </Title>
            <Text>{application.is_self_submitted ? "Yes" : "No"}</Text>
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
            decision_date={application.decision_date}
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
        <CreatedBy>creator: {application?.user?.username}</CreatedBy>
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

const CreatedBy = styled.div`
  padding: 4px;
  background-color: #f1f1f1;
  color: #666;
  font-size: 12px;
  text-align: left;
`
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

const Col = styled.div`
  display: flex;
  justify-content: center;
`

const ChevronWrap = styled(Col)`
  display: flex;
  justify-content: flex-end;
`
