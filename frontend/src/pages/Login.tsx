import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserContext } from '../../context/userContext';
import '../index.css';
import Input from '../components/ui/Input';
import React from 'react';
import Button from '../components/ui/Buttons/Button';
import PasswordInput from '../components/ui/password-input';

const Login = ({ switchToRegister, setModalOpen }) => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const API_URL = process.env.API_URL || 'http://localhost:5000';

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    try {
      const { data } = await axios.post(`${API_URL}/api/login`, {
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        // Normalize and update user context so it has id (not _id)
        setUser({
          id: data._id || data.id,
          email: data.email,
          firstname: data.firstname,
          lastname: data.lastname,
          subscriptionTier: 'free',
        });

        // Clear form data
        setData({ email: '', password: '' });

        //close login modal
        setModalOpen(false);

        // Navigate to main page
        navigate('/main');

        toast.success('Login successful!');
      }
    } catch (error) {
      console.log(error);
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div className='h-screen flex items-center justify-center'>
      <form
        onSubmit={loginUser}
        className='max-w-md bg-[rgb(var(--color-theme-surface))] rounded-lg shadow-md'
      >
        <div className='flex flex-col justify-center text-[color:rgb(var(--color-theme-text-primary))] p-12 rounded-md h-full'>
          <span className='flex flex-col mb-6'>
            <h1 className='mb-6 text-md font-sans'>Login</h1>
          </span>

          <div className='flex flex-col gap-4 items-center max-w-sm justify-center'>
            <Input
              label='Email'
              type='email'
              placeholder='Enter your Email'
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <PasswordInput
              type='password'
              placeholder='Enter your Password'
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <Button
              type='submit'
              variant='register'
              size='md'
              className='w-full'
            >
              Log In
            </Button>
          </div>
          <p className='mt-6 text-center text-sm text-[color:rgb(var(--color-theme-text-secondary))]'>
            Not a Member?{' '}
            <button
              type='button'
              className='text-[color:rgb(var(--color-theme-primary))] hover:underline'
              onClick={switchToRegister}
            >
              Sign up Now
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
