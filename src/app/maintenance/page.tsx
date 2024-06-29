
'use client'
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  margin-top: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

const Content = styled.div`
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  text-align: center;
  padding: 50px;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 1.25rem;
  color: #666;
  margin-bottom: 2rem;
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 2s linear infinite;
`;

export default function Maintenance() {
  return (
    <Container>
      <Content>
        <Title>We will be back soon!</Title>
        <Message>
          Sorry for the inconvenience but we are performing some maintenance at the moment.
        </Message>
        <Spinner />
      </Content>
    </Container>
  );
}
