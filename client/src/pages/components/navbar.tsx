import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Navbar = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleSignupClick = () => {
    router.push('/signup');
  };

  const handleLogoutClick = async () => {
    try {
      await axios.post('http://localhost:3001/api/users/logout', {}, { withCredentials: true });
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <Container>
      <Logo onClick={handleLogoClick}>Blogging Site</Logo>
      <ButtonsContainer>
        <Button onClick={handleLoginClick}>Login</Button>
        <Button onClick={handleSignupClick}>Signup</Button>
        <LogoutButton onClick={handleLogoutClick}>Logout</LogoutButton>
      </ButtonsContainer>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  cursor:pointer;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease, border-color 0.3s ease;

  &:hover {
    background-color: #ddd;
    border-color: #ccc;
  }
`;

const LogoutButton = styled(Button)`
  background-color: #dc3545;
  color: white;
  border: none;

  &:hover {
    background-color: #c82333;
  }
`;