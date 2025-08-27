import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';
import axios from 'axios';
import Button from './ui/Button';
import { LogIn } from 'lucide-react';
import Modal from './Modal';
import Login from '../pages/Login';

const Navbar = ({ openLogin, openRegister }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const [open, setOpen] = useState(false);

  const logout = async () => {
    try {
      // Call backend logout endpoint to clear the JWT token
      await axios.post('/api/logout', {}, { withCredentials: true });

      // Clear user data from context
      setUser(null);

      // Clear any stored user data
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');

      // Navigate to login page
      navigate('/');

      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error during logout:', error);

      // Even if backend call fails, clear local state
      setUser(null);
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
      navigate('/');
    }
  };

  return (
    <div className='h-[50px] flex items-center justify-between flex-col sm:flex-row'>
      {/* Logo */}
      <div
        className='px-10 text-[25px] font-bold uppercase text-center text-white cursor-pointer'
        onClick={
          user
            ? () => {
                navigate('/dashboard');
              }
            : () => {
                navigate('/home');
              }
        }
      >
        <Link
          className='hover:text-teal-600 transition-all duration-100'
          to={'/'}
        >
          Revolve
        </Link>
      </div>

      {/* Right side */}
      <div className='flex'>
        {/* Show these buttons when user is NOT logged in */}
        {!user && (
          <>
            <Button variant='ghost' size='sm' onClick={openLogin}>
              <LogIn />
              Log In / Sign Up
            </Button>
          </>
        )}

        {/* Show these buttons when user IS logged in */}
        {user && (
          <>
            <h1 className='text-white m-2 w-fit'>
              {user?.firstname + ' ' + user?.lastname || 'User'}
            </h1>
            <Button variant='ghost' size='sm' onClick={logout}>
              Sign Out
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
