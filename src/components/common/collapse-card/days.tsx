'use client'

import React from 'react';
import styled from 'styled-components';
import { calculateDaysSinceDate } from '@/app/utils';

interface CountersProps {
    status: string,
    application_date: string,
    biometric_date: string | null;
}

const Counters: React.FC<CountersProps> = ({
    status,
    application_date,
    biometric_date
}) => {

  return (
    <Container>
        <Row>
            <Title>Waiting from application: </Title>
            <Text>{calculateDaysSinceDate(application_date)}</Text>
        </Row>
        <Row>
            <Title>Waiting from biometric: </Title>
            <Text>{calculateDaysSinceDate(biometric_date)}</Text>
        </Row>
    </Container>
  );
};

export default Counters;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 10px;
  gap: 4px;
`;

const Row = styled.div`
  display: flex;
`;

const Title = styled.div`
  width: 15em;
`
const Text = styled.div``
