'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:3001/api/users/signup', { email, password });
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
    <Form>
      <Title>Sign Up</Title>
      <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <Button onClick={handleSignup}>Sign Up</Button>
    </Form>
    </Container>
  );
};

export default SignupPage;


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;
