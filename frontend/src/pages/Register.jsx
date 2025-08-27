import { PasswordInput } from '../components/ui/password-input';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { PasswordStrengthMeter } from '../components/ui/password-input';
import { useState } from 'react';
import axios from 'axios';
import Button from '../components/ui/Button';
import InputField from '../components/ui/InputField';

const Register = ({ switchToLogin }) => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    confirmPassword: '',
  });

  const registerUser = async (e) => {
    e.preventDefault();

    const { email, firstname, lastname, password, confirmPassword } = data;

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    console.log(email, firstname, lastname, password);

    try {
      const { data } = await axios.post('/api/register', {
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
    <div className='h-screen flex items-center justify-center'>
      <form onSubmit={registerUser}>
        <div className='flex flex-col bg-[#4d4949] p-12 rounded-md'>
          <h1 className='mb-6 text-4xl text-white'>Register</h1>
          <div className='flex flex-col gap-4 items-start max-w-sm'>
            <InputField
              placeholder='Email'
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <InputField
              placeholder='First Name'
              onChange={(e) => setData({ ...data, firstname: e.target.value })}
            />
            <InputField
              placeholder='Last Name'
              onChange={(e) => setData({ ...data, lastname: e.target.value })}
            />

            <PasswordInput
              placeholder='Password'
              type='password'
              size='2xl'
              onChange={(e) => {
                setData({
                  ...data,
                  password: e.target.value,
                });
              }}
            />
            <div className='flex flex-col w-full'>
              <PasswordStrengthMeter value={strength} p={'5px'} w={'100%'} />
            </div>
            <PasswordInput
              placeholder='Re-enter Password'
              variant={'outline'}
              size='2xl'
              type='password'
              onChange={(e) => {
                setData({
                  ...data,
                  confirmPassword: e.target.value,
                });
              }}
            />

            <Button
              type='submit'
              variant='register'
              size='lg'
              className='self-center w-full'
            >
              Register
            </Button>
          </div>
          <p className='text-white/50 self-center'>
            Already a Member?
            <a
              className='cursor-pointer hover:text-purple-400 transition-colors duration-100 underline'
              onClick={switchToLogin}
            >
              Log in here
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};
export default Register;
