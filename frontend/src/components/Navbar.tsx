import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import axios from 'axios';
import Button from './ui/Buttons/Button';
import { LogIn, Sun, Moon } from 'lucide-react';
import React from 'react';
import { useTheme } from '../../context/themeContext';

const Navbar = ({ openLogin }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const { darkMode, toggleDarkMode } = useTheme();

  const logout = async () => {
    try {
      await axios.post('/api/logout', {}, { withCredentials: true });
      setUser(null);
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
      navigate('/');
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error during logout:', error);
      setUser(null);
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
      navigate('/');
    }
  };

  return (
    <div
      className='
        h-[50px] flex items-center justify-between flex-col sm:flex-row mt-2
        text-gray-900 dark:text-gray-100
      '
    >
      {/* Logo */}
      <div
        className='
          px-10 text-[25px] font-extrabold uppercase text-center cursor-pointer
          text-gray-900 hover:text-teal-600
          dark:text-white dark:hover:text-teal-400
        '
        onClick={user ? () => navigate('/main') : () => navigate('/home')}
      >
        <h2 className='text-gray-900 dark:text-white'>Revolve</h2>
      </div>

      {/* Right side */}
      <div className='flex items-center gap-4 text-center'>
        {/* Theme toggle button */}
        <button
          onClick={toggleDarkMode}
          className='p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition'
          aria-label='Toggle theme'
        >
          {darkMode ? (
            <Sun className='w-5 h-5 text-yellow-400' />
          ) : (
            <Moon className='w-5 h-5 text-gray-800' />
          )}
        </button>

        {!user && (
          <Button variant='success' onClick={openLogin}>
            <div className='mr-2'>
              <LogIn />
            </div>
            Log In / Sign Up
          </Button>
        )}

        {user && (
          <>
            <h1 className='flex text-gray-900 dark:text-white w-fit text-lg items-center font-bold'>
              {user?.firstname + ' ' + user?.lastname || 'User'}
            </h1>
            <div className='flex flex-row ml-5 gap-2'>
              <Button variant='success' onClick={() => navigate('/main')}>
                My Dashboard
              </Button>
              <Button variant='danger' onClick={logout}>
                Sign Out
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
