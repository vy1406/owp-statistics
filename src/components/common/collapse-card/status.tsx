'use client'

import React from 'react';
import styled from 'styled-components';

interface StatusProps {
  status: string;
}

const StatusChip = styled.div<{ color: string }>`
  display: inline-block;
  padding: 0.25em 0.75em;
  border-radius: 12px;
  width: fit-content;
  font-size: 0.875em;
  color: white;
  background-color: ${({ color }) => color};
`;

const Status: React.FC<StatusProps> = ({ status }) => {
  const color = status === 'Pending' ? '#FFD700' : status === 'Rejected' ? '#FF6347' : status === 'Approved' ? '#32CD32' : '#D3D3D3';
  return (
    <StatusChip color={color}>
      {status}
    </StatusChip>
  );
};

export default Status;
