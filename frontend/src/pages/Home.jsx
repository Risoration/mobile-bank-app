import { Flex, Heading, Text, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import { useContext } from 'react';

const Home = () => {
  const navigate = useNavigate();
  return (
    <Flex
      height='100vh'
      direction='row' // Align items horizontally
      alignItems={'flex-starts'} // Align items at the top
      justifyContent={'center'} // Center items horizontally in the container
      px={'20px'}
      gap='20px' // Add spacing between elements
    >
      {/* Center */}
      <Heading textAlign={'center'} size={'3xl'} className='title'>
        Welcome to Revolve
      </Heading>
    </Flex>
  );
};

export default Home;
