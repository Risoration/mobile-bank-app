import { Flex, Text, Button } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { LoginContext } from '../App';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const [loggedIn, setLoggedIn] = useContext(LoginContext);

  const logout = () => {
    setUser(null);
  };

  return (
    <Flex
      height={'50px'}
      alignItems={'center'}
      justifyContent={'space-between'}
      flexDir={{
        base: 'column',
        sm: 'row',
      }}
    >
      <Text
        px={10}
        fontSize={'25px'}
        fontWeight={'bold'}
        textTransform={'uppercase'}
        textAlign={'center'}
        color={'white'}
        onClick={() => {
          navigate('/');
        }}
      >
        <Link to={'/'}>Revolve</Link>
      </Text>

      <Flex>
        <Button
          hidden={loggedIn}
          className='log-button'
          variant='ghost'
          onClick={() => {
            navigate('/login');
          }}
        >
          Sign In
        </Button>
        <Button
          hidden={loggedIn}
          className='log-button'
          variant='ghost'
          onClick={() => {
            navigate('/register');
          }}
        >
          Sign Up
        </Button>
        <Button
          hidden={!loggedIn}
          className='log-button'
          variant={'ghost'}
          onClick={() => {
            setLoggedIn(false);
            navigate('/login');
          }}
        >
          Sign Out
        </Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;
