import { Flex, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/appContext';
import { useContext } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const { appName } = useContext(AppContext);

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
        <Link to={'/'}>{appName}</Link>
      </Text>
    </Flex>
  );
};

export default Navbar;
