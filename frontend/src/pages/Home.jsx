import { Flex, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import { Button } from '../components/ui/button';
import { useContext } from 'react';
import { AppContext } from '../../context/appContext';

const Home = () => {
  const { name } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <Flex
      height='100vh'
      direction='row' // Align items horizontally
      alignItems='flex-start' // Align items at the top
      justifyContent='space-between' // Center items horizontally in the container
      px={'20px'}
      gap='20px' // Add spacing between elements
    >
      {/*Left side  */}
      <div></div>

      {/* Center */}
      <Heading
        textAlign={'center'}
        size={'3xl'}
      >
        Welcome to {name}
      </Heading>
      <Flex gap={'20px'}>
        <Button
          className='home-login-register'
          variant='ghost'
          fontSize={'2xl'}
          onClick={() => {
            navigate('/login');
          }}
        >
          Login
        </Button>
        <Button
          className='home-login-register'
          variant='ghost'
          cursor={'pointer'}
          fontSize={'2xl'}
          onClick={() => {
            navigate('/register');
          }}
        >
          Sign Up
        </Button>
      </Flex>
    </Flex>
  );
};

export default Home;
