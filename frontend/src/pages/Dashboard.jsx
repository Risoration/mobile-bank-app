import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { Flex, Heading, Stack } from '@chakra-ui/react';
import { AppContext } from '../../context/appContext';

export default function Dashboard() {
  const { appName } = useContext(AppContext);
  const { user } = useContext(UserContext);
  return (
    <Flex
      height={'100vh'}
      justifyContent={'center'}
    >
      <Stack
        gap={'4'}
        align={'flex-start'}
        maxW={'sm'}
      >
        <Heading>My {appName} Dashboard </Heading>
        {!!user && <Heading>Hi {user.firstname}</Heading>}
      </Stack>
    </Flex>
  );
}
