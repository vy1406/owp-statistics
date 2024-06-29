'use client'

import React from 'react';

interface StatusProps {
  status: string;
}

const Status: React.FC<StatusProps> = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Pending':
        return 'my_statusPending';
      case 'Rejected':
        return 'my_statusRejected';
      case 'Approved':
        return 'my_statusApproved';
      default:
        return 'my_statusDefault';
    }
  };

  return (
    <div className={`my_statusChip ${getStatusColor()}`}>
      {status}
    </div>
  );
};

export default Status;
