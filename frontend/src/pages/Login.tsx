import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserContext } from '../../context/userContext';
import '../index.css';
import Input from '../components/ui/Input';
import React from 'react';

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
      const { data } = await axios.post('/api/login', {
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
      <form onSubmit={loginUser}>
        <div className='flex flex-col justify-center bg-white text-gray-700 dark:bg-[#4d4949] dark:text-white p-12 rounded-md h-full'>
          <h1 className='mb-6 text-md font-sans text-black'>Login</h1>
          <div className='flex flex-col gap-4 items-center max-w-sm justify-center'>
            <Input
              label='Email'
              type='email'
              placeholder='Enter your Email'
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <Input
              label='Password'
              type='password'
              placeholder='Enter your Password'
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <button
              type='submit'
              className='w-full px-4 py-2 rounded-md bg-teal-500 text-white hover:bg-teal-600 font-bold'
            >
              Login
            </button>
          </div>
          <p className='text-white/50 self-center'>
            Not a Member?
            <a
              className='cursor-pointer hover:text-teal-400 transition-colors duration-100 underline'
              onClick={switchToRegister}
            >
              Sign up now
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
