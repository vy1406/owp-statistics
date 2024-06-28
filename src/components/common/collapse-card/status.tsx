import React from 'react';
import styled from 'styled-components';

interface StatusProps {
  status: string;
}

const StatusChip = styled.div<{ status: string }>`
  display: inline-block;
  padding: 0.25em 0.75em;
  border-radius: 12px;
  font-size: 0.875em;
  color: white;
  background-color: ${({ status }) =>
    status === 'Pending' ? '#FFD700' :
    status === 'Rejected' ? '#FF6347' :
    status === 'Approved' ? '#32CD32' :
    '#D3D3D3'};
`;

const Status: React.FC<StatusProps> = ({ status }) => {
  return (
    <StatusChip status={status}>
      {status}
    </StatusChip>
  );
};

export default Status;
