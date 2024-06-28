'use client';

import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

const ErrorPage = ({ error }: any) => {
  const router = useRouter();
  
  if ( error ) {
    console.error(error);
  }
  return (
    <ErrorContainer>
      <h1>Something went wrong</h1>
      <p>{'An unexpected error occurred. Please try again later.'}</p>
      <HomeButton onClick={() => router.push('/')}>Go to Homepage</HomeButton>
    </ErrorContainer>
  );
};

export default ErrorPage;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-color: #f8f8f8;
  color: #333;
`;

const HomeButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #0070f3;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #005bb5;
  }
`;

