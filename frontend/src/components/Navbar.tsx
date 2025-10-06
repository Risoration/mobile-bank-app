import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';
import axios from 'axios';
import Button from './ui/Buttons/Button';
import Modal from './Modal';
import { LogIn, Sun, Moon, Menu, X } from 'lucide-react';
import React from 'react';
import { useTheme } from '../../context/themeContext';

const Navbar = ({ openLogin }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [signOutModalOpen, setSignOutModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const handleSignOutClick = () => {
    setSignOutModalOpen(true);
  };

  const handleConfirmSignOut = () => {
    setSignOutModalOpen(false);
    logout();
  };

  const handleCancelSignOut = () => {
    setSignOutModalOpen(false);
  };

  return (
    <div className='bg-[rgb(var(--color-theme-background))] text-[color:rgb(var(--color-theme-text-primary))]'>
      {/* Desktop Navbar */}
      <div className='hidden md:flex h-[50px] items-center justify-between px-4'>
        {/* Logo */}
        <div
          className='text-[25px] font-extrabold uppercase cursor-pointer
          text-[color:rgb(var(--color-theme-text-primary))] hover:text-[color:rgb(var(--color-theme-accent))]/70'
          onClick={user ? () => navigate('/main') : () => navigate('/home')}
        >
          <h2 className='text-[color:rgb(var(--color-theme-text-primary))]'>
            Revolve
          </h2>
        </div>

        {/* Right side */}
        <div className='flex items-center gap-4'>
          {!user && (
            <Button
              variant='primary'
              onClick={openLogin}
              className='text-sm px-4 py-2'
            >
              <div className='mr-2'>
                <LogIn size={16} />
              </div>
              Log In / Sign Up
            </Button>
          )}

          {user && (
            <>
              <h1 className='text-[color:rgb(var(--color-theme-text-primary))] text-lg font-bold'>
                {user?.firstname + ' ' + user?.lastname || 'User'}
              </h1>

              <div className='flex gap-2'>
                <Button
                  variant='secondary'
                  onClick={() => navigate('/main')}
                  className='text-sm px-3 py-1'
                >
                  Dashboard
                </Button>
                <Button
                  variant='secondary'
                  onClick={handleSignOutClick}
                  className='text-sm px-3 py-1'
                >
                  Sign Out
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className='md:hidden flex items-center justify-between p-4'>
        {/* Logo */}
        <div
          className='text-xl font-extrabold uppercase cursor-pointer
          text-[color:rgb(var(--color-theme-text-primary))] hover:text-[color:rgb(var(--color-theme-accent))]/70'
          onClick={user ? () => navigate('/main') : () => navigate('/home')}
        >
          Revolve
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className='text-[color:rgb(var(--color-theme-text-primary))] p-2'
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='md:hidden border-t border-[rgb(var(--color-theme-border))] bg-[rgb(var(--color-theme-background))]'>
          <div className='px-4 py-4 space-y-4'>
            {!user && (
              <Button
                variant='primary'
                onClick={() => {
                  openLogin();
                  setIsMobileMenuOpen(false);
                }}
                className='w-full'
              >
                <div className='mr-2'>
                  <LogIn size={16} />
                </div>
                Log In / Sign Up
              </Button>
            )}

            {user && (
              <>
                <div className='text-center py-2'>
                  <h1 className='text-[color:rgb(var(--color-theme-text-primary))] text-lg font-bold'>
                    {user?.firstname + ' ' + user?.lastname || 'User'}
                  </h1>
                </div>

                <div className='space-y-2'>
                  <Button
                    variant='secondary'
                    onClick={() => {
                      navigate('/main');
                      setIsMobileMenuOpen(false);
                    }}
                    className='w-full'
                  >
                    My Dashboard
                  </Button>
                  <Button
                    variant='secondary'
                    onClick={() => {
                      setSignOutModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className='w-full'
                  >
                    Sign Out
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Sign Out Confirmation Modal */}
      <Modal isOpen={signOutModalOpen} onClose={handleCancelSignOut}>
        <div className='text-center bg-[rgb(var(--color-theme-surface))] p-6 rounded-2xl max-w-md mx-4'>
          <h3 className='text-xl font-semibold mb-4 text-[color:rgb(var(--color-theme-text-primary))]'>
            Sign Out
          </h3>
          <p className='text-[color:rgb(var(--color-theme-text-secondary))] mb-6'>
            Are you sure you want to sign out? You'll need to log in again to
            access your account.
          </p>
          <div className='flex gap-4 justify-center'>
            <Button
              variant='secondary'
              onClick={handleCancelSignOut}
              className='px-6'
            >
              Cancel
            </Button>
            <Button
              variant='danger'
              onClick={handleConfirmSignOut}
              className='whitespace-nowrap'
            >
              Sign Out
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Navbar;
