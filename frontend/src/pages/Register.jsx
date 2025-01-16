import { Flex, Button, Heading, Input, Stack } from '@chakra-ui/react';
import { PasswordInput } from '../components/ui/password-input';
import { Field } from '../components/ui/field';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { PasswordStrengthMeter } from '../components/ui/password-input';
import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    password: '',
  });

  const registerUser = async (e) => {
    e.preventDefault();

    const { email, firstname, lastname, password } = data;

    console.log(email, firstname, lastname, password);

    try {
      const { data } = await axios.post('/register', {
        email,
        firstname,
        lastname,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({
          email: '',
          firstname: '',
          lastname: '',
          password: '',
        });
        toast.success('Registered Successfully');
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculatePasswordStrength = () => {
    let strength = 0;

    const password = data.password;

    if (password.length > 5) {
      strength += 1;
    }
    if (password.match(/[a-z]+/)) {
      strength += 1;
    }
    if (password.match(/[A-Z]+/)) {
      strength += 1;
    }
    if (password.match(/[0-9]+/)) {
      strength += 1;
    }
    if (password.match(/[^a-zA-Z0-9]+/)) {
      strength += 1;
    }
    return strength;
  };

  const strength = calculatePasswordStrength();

  return (
    <Flex
      height={'100vh'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <form
        onSubmit={registerUser}
        className='form'
      >
        <Flex
          direction={'column'}
          bg={formBackground}
          p={12}
          rounded={6}
        >
          <Heading
            mb={6}
            size={'3xl'}
          >
            Register
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
                onChange={(e) => {
                  setData({ ...data, email: e.target.value });
                }}
              />
            </Field>
            <Field label={'First Name'}>
              <Input
                placeholder='First name'
                variant={'outline'}
                size={'2xl'}
                onChange={(e) => {
                  setData({
                    ...data,
                    firstname: e.target.value,
                  });
                }}
              />
            </Field>
            <Field label={'Last Name'}>
              <Input
                placeholder='Last name'
                variant={'outline'}
                size={'2xl'}
                onChange={(e) => {
                  setData({
                    ...data,
                    lastname: e.target.value,
                  });
                }}
              />
            </Field>
            <Field label={'Password'}>
              <PasswordInput
                placeholder='Password'
                type='password'
                size={'2xl'}
                onChange={(e) => {
                  setData({
                    ...data,
                    password: e.target.value,
                  });
                }}
              ></PasswordInput>
              <Flex
                direction={'column'}
                w={'100%'}
              >
                <PasswordStrengthMeter
                  value={strength}
                  p={'5px'}
                  w={'100%'}
                />
              </Flex>
            </Field>

            <Field label='Re-enter Password'>
              <PasswordInput
                placeholder='Re-enter Password'
                variant={'outline'}
                size={'2xl'}
                type='password'
              ></PasswordInput>
            </Field>

            <Button
              type={'submit'}
              className='submit_button'
              bgColor={'teal'}
              color={'white'}
              alignSelf={'center'}
              w={'100%'}
            >
              Register
            </Button>
          </Stack>
        </Flex>
      </form>
    </Flex>
  );
};
export default Register;
