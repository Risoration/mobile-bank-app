import { Button, Flex, Heading, Input, Stack } from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';
import { PasswordInput } from '../components/ui/password-input';
import { Field } from '../components/ui/field';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    try {
      const { data } = await axios.post('/login', {
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({ email: '', password: '' });
        navigate('/dashboard');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      height={'100vh'}
      alignItems={'center'}
      justifyContent={'center'}
      justifyItems={'center'}
    >
      <form
        onSubmit={loginUser}
        className='user-form'
      >
        <Flex
          //direction={'column'}
          rounded={6}
        >
          <Heading
            mb={6}
            size={'3xl'}
          >
            Login
          </Heading>
          <Stack
            gap={'4'}
            align={'flex-start'}
            maxW={'sm'}
          >
            <Field label={'Email'}>
              <Input
                placeholder='Email'
                variant={'outline'}
                size={'2xl'}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </Field>
            <Field label={'Password'}>
              <PasswordInput
                placeholder='Password'
                type='password'
                size={'2xl'}
                onChange={(e) =>
                  setData({
                    ...data,
                    password: e.target.value,
                  })
                }
              ></PasswordInput>
              <Flex
                direction={'column'}
                w={'100%'}
              ></Flex>
            </Field>
            <Button
              type={'submit'}
              className='submit_button'
              bgColor={'white'}
              color={'black'}
              alignSelf={'center'}
              w={'100%'}
            >
              Login
              {/* <Link to={'/home'}>Login</Link> */}
            </Button>
            <Button
              type={'button'}
              bgColor={'grey'}
              color={'white'}
              alignSelf={'center'}
              w={'100%'}
              onClick={() => navigate('/register')}
            >
              Register
            </Button>
          </Stack>
        </Flex>
      </form>
    </Flex>
  );
};

export default Login;
