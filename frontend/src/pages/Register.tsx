import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { PasswordStrengthMeter } from '../components/ui/password-input';
import { useState } from 'react';
import axios from 'axios';
import Button from '../components/ui/Buttons/Button';
import React from 'react';
import Input from '../components/ui/Input';

interface RegisterProps {
  switchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ switchToLogin }) => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    confirmPassword: '',
  });

  const registerUser = async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, firstname, lastname, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const { data: response } = await axios.post('/api/register', {
        email,
        firstname,
        lastname,
        password,
      });
      if (response.error) {
        toast.error(response.error);
      } else {
        setData({
          email: '',
          firstname: '',
          lastname: '',
          password: '',
          confirmPassword: '',
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

    if (password.length > 5) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1;

    return strength;
  };

  const strength = calculatePasswordStrength();

  return (
    <div className='h-screen flex items-center justify-center px-4'>
      <form
        onSubmit={registerUser}
        className='w-full max-w-md bg-white dark:bg-gray-900 
                   p-8 rounded-lg shadow-md'
      >
        <h1 className='mb-6 text-3xl font-bold text-gray-900 dark:text-white text-center'>
          Register
        </h1>

        <div className='flex flex-col gap-4'>
          <Input
            label='Email'
            type='email'
            placeholder='Enter your Email'
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <Input
            label='First name'
            type='text'
            placeholder='First name'
            value={data.firstname}
            onChange={(e) => setData({ ...data, firstname: e.target.value })}
          />
          <Input
            label='Last name'
            type='text'
            placeholder='Last name'
            value={data.lastname}
            onChange={(e) => setData({ ...data, lastname: e.target.value })}
          />

          <Input
            label='Password'
            type='password'
            placeholder='Password'
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />

          <div className='flex flex-col w-full'>
            <PasswordStrengthMeter value={strength} p='p-2' w='w-full' />
          </div>

          <Input
            label='Confirm Password'
            type='password'
            placeholder='Re-enter Password'
            value={data.confirmPassword}
            onChange={(e) =>
              setData({ ...data, confirmPassword: e.target.value })
            }
          />

          <Button type='submit' variant='register' size='lg' className='w-full'>
            Register
          </Button>
        </div>

        <p className='mt-6 text-center text-sm text-gray-600 dark:text-gray-400'>
          Already a member?{' '}
          <button
            type='button'
            className='text-teal-600 dark:text-purple-400 hover:underline'
            onClick={switchToLogin}
          >
            Log in here
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;
