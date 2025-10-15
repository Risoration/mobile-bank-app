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
import { API_CONFIG } from '../config/api';

const Login = ({ switchToRegister, setModalOpen }) => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    try {
      const { data } = await axios.post(
        `${API_CONFIG.ENDPOINTS.AUTH}/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
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
      toast.error('Login failed. Please try again.', error.message);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <form
        onSubmit={loginUser}
        className='w-full max-w-md bg-[rgb(var(--color-theme-surface))] rounded-lg shadow-md'
      >
        <div className='flex flex-col justify-center text-[color:rgb(var(--color-theme-text-primary))] p-6 md:p-12 rounded-md'>
          <span className='flex flex-col mb-6'>
            <h1 className='mb-6 text-lg md:text-xl font-sans text-center'>
              Login
            </h1>
          </span>

          <div className='flex flex-col gap-4 items-center w-full'>
            <div className='w-full'>
              <Input
                label='Email'
                type='email'
                placeholder='Enter your Email'
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div className='w-full'>
              <PasswordInput
                type='password'
                placeholder='Enter your Password'
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
            <Button
              type='submit'
              variant='register'
              size='md'
              className='w-full mt-4'
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
