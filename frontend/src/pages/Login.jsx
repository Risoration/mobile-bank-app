import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserContext } from '../../context/userContext';
import Button from '../components/ui/Button';
import '../index.css';
import PasswordInput from '../components/ui/password-input';
import InputField from '../components/ui/InputField';

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
        // Update user context with the logged-in user data
        setUser(data);

        // Clear form data
        setData({ email: '', password: '' });

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
        <div className='flex flex-col bg-[#4d4949] p-12 rounded-md justify-between h-full'>
          <h1 className='mb-6 text-4xl text-white font-sans'>Login</h1>
          <div className='flex flex-col gap-4 items-start max-w-sm'>
            <InputField
              placeholder='Email'
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <PasswordInput
              placeholder='Password'
              type='password'
              className='w-full placeholder:text-sm placeholder-white text-white px-3 py-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              onChange={(e) =>
                setData({
                  ...data,
                  password: e.target.value,
                })
              }
            />
            <Button
              type='submit'
              variant='submit'
              className='self-center w-full'
            >
              Login
            </Button>
          </div>
          <p className='text-white/50 self-center'>
            Not a Member?
            <a
              className='cursor-pointer hover:text-purple-400 transition-colors duration-100 underline'
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
