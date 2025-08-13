import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { Flex, Heading, Stack } from '@chakra-ui/react';

export default function Dashboard() {
  const { user } = useContext(UserContext);

  return (
    <Flex height={'100vh'} justifyContent={'center'}>
      <Stack gap={'4'} align={'flex-start'} maxW={'sm'}>
        <Heading>My Revolve Dashboard</Heading>
        {!!user && <Heading>Hi {user.firstname}</Heading>}
      </Stack>
    </Flex>
  );
}
