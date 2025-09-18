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
      className='h-[50px] flex items-center justify-between flex-col sm:flex-row 
      bg-[rgb(var(--color-theme-background))] text-[color:rgb(var(--color-theme-text-primary))]'
    >
      {/* Logo */}
      <div
        className='
          px-10 text-[25px] font-extrabold uppercase text-center cursor-pointer
          text-[color:rgb(var(--color-theme-text-primary))] hover:text-[color:rgb(var(--color-theme-accent))]/70
        '
        onClick={user ? () => navigate('/main') : () => navigate('/home')}
      >
        <h2 className='text-[color:rgb(var(--color-theme-text-primary))]'>
          Revolve
        </h2>
      </div>

      {/* Right side */}
      <div className='flex items-center gap-4 text-center'>
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
            <h1 className='text-[color:rgb(var(--color-theme-text-primary))] flex w-fit text-lg items-center font-bold'>
              {user?.firstname + ' ' + user?.lastname || 'User'}
            </h1>
            <div className='form-check form-switch'>
              <input
                className='form-check-input'
                type='checkbox'
                id='checkDarkMode'
                checked={darkMode}
                onChange={() => toggleDarkMode()}
              />
              {darkMode ? (
                <Moon className='w-5 h-5' />
              ) : (
                <Sun className='w-5 h-5' />
              )}
              <label className='form-check-label' htmlFor='checkDarkMode' />
            </div>
            <div className='flex flex-row ml-5 gap-2'>
              <Button variant='secondary' onClick={() => navigate('/main')}>
                My Dashboard
              </Button>
              <Button variant='secondary' onClick={logout}>
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
