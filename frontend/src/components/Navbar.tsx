import { useNavigate } from 'react-router-dom';
import { useContext, useState, useRef, useEffect } from 'react';
import { UserContext } from '../../context/userContext';
import axios from 'axios';
import Button from './ui/Buttons/Button';
import Modal from './Modal';
import {
  LogIn,
  Sun,
  Moon,
  Menu,
  X,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Home,
  DollarSign,
  BarChart3,
  Shield,
} from 'lucide-react';
import React from 'react';
import { useTheme } from '../../context/themeContext';

const Navbar = ({ openLogin }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { darkMode, toggleDarkMode } = useTheme();
  const [signOutModalOpen, setSignOutModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    setIsUserMenuOpen(false);
  };

  const handleConfirmSignOut = () => {
    setSignOutModalOpen(false);
    logout();
  };

  const handleCancelSignOut = () => {
    setSignOutModalOpen(false);
  };

  const navigationLinks = [];

  const userMenuItems = [
    { name: 'Dashboard', icon: BarChart3, action: () => navigate('/main') },
    {
      name: 'Settings',
      icon: Settings,
      action: () => navigate('/main?tab=settings'),
    },
    {
      name: 'Sign Out',
      icon: LogOut,
      action: handleSignOutClick,
      isDanger: true,
    },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav className='hidden lg:flex items-center justify-between px-6 py-4 bg-[rgb(var(--color-theme-background))] border-b border-[rgb(var(--color-theme-border))] backdrop-blur-sm'>
        {/* Logo */}
        <div className='flex items-center'>
          <div
            className='flex items-center cursor-pointer group'
            onClick={user ? () => navigate('/main') : () => navigate('/home')}
          >
            <div className='w-8 h-8 bg-gradient-to-br from-[rgb(var(--color-theme-accent))] to-[rgb(var(--color-theme-primary))] rounded-lg flex items-center justify-center mr-3 group-hover:scale-105 transition-transform duration-200'>
              <DollarSign className='w-5 h-5 text-white' />
            </div>
            <span className='text-2xl font-bold text-[color:rgb(var(--color-theme-text-primary))] group-hover:text-[rgb(var(--color-theme-accent))] transition-colors duration-200'>
              Revolve
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className='hidden md:flex items-center space-x-8'>{}</div>

        {/* Right side */}
        <div className='flex items-center space-x-4'>
          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className='p-2 rounded-lg bg-[rgb(var(--color-theme-surface))] hover:bg-[rgb(var(--color-theme-muted))] transition-colors duration-200'
            aria-label='Toggle theme'
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {!user ? (
            <Button
              variant='primary'
              onClick={openLogin}
              className='flex items-center space-x-2 px-6 py-2 rounded-lg font-medium'
            >
              <LogIn size={16} />
              <span>Sign In</span>
            </Button>
          ) : (
            <div className='relative' ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className='flex items-center space-x-3 p-2 rounded-lg bg-[rgb(var(--color-theme-surface))] hover:bg-[rgb(var(--color-theme-muted))] transition-colors duration-200'
              >
                <div className='w-8 h-8 bg-gradient-to-br from-[rgb(var(--color-theme-accent))] to-[rgb(var(--color-theme-primary))] rounded-full flex items-center justify-center'>
                  <User size={16} className='text-white' />
                </div>
                <div className='text-left'>
                  <div className='text-sm font-medium text-[color:rgb(var(--color-theme-text-primary))]'>
                    {user?.firstname} {user?.lastname}
                  </div>
                  <div className='text-xs text-[color:rgb(var(--color-theme-text-secondary))]'>
                    Premium Member
                  </div>
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    isUserMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className='absolute right-0 mt-2 w-56 bg-[rgb(var(--color-theme-surface))] rounded-xl shadow-lg border border-[rgb(var(--color-theme-border))] py-2 z-50'>
                  {userMenuItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          item.action();
                          setIsUserMenuOpen(false);
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-[rgb(var(--color-theme-muted))] transition-colors duration-200 ${
                          item.isDanger
                            ? 'text-red-500 hover:text-red-600'
                            : 'text-[color:rgb(var(--color-theme-text-primary))]'
                        }`}
                      >
                        <Icon size={16} />
                        <span className='font-medium'>{item.name}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className='lg:hidden flex items-center justify-between px-4 py-4 bg-[rgb(var(--color-theme-background))] border-b border-[rgb(var(--color-theme-border))]'>
        {/* Logo */}
        <div
          className='flex items-center cursor-pointer'
          onClick={user ? () => navigate('/main') : () => navigate('/home')}
        >
          <div className='w-8 h-8 bg-gradient-to-br from-[rgb(var(--color-theme-accent))] to-[rgb(var(--color-theme-primary))] rounded-lg flex items-center justify-center mr-3'>
            <DollarSign className='w-5 h-5 text-white' />
          </div>
          <span className='text-xl font-bold text-[color:rgb(var(--color-theme-text-primary))]'>
            Revolve
          </span>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className='p-2 rounded-lg bg-[rgb(var(--color-theme-surface))] hover:bg-[rgb(var(--color-theme-muted))] transition-colors duration-200'
          aria-label='Toggle menu'
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <div className='bg-[rgb(var(--color-theme-surface))] border-b border-[rgb(var(--color-theme-border))] px-4 py-6'>
          {/* Navigation Links */}
          <div className='space-y-4 mb-6'>{}</div>

          {/* Theme Toggle */}
          <div className='flex items-center justify-between p-3 rounded-lg bg-[rgb(var(--color-theme-background))] mb-6'>
            <span className='font-medium text-[color:rgb(var(--color-theme-text-primary))]'>
              Theme
            </span>
            <button
              onClick={toggleDarkMode}
              className='flex items-center space-x-2 p-2 rounded-lg bg-[rgb(var(--color-theme-surface))] hover:bg-[rgb(var(--color-theme-muted))] transition-colors duration-200'
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              <span className='text-sm'>{darkMode ? 'Light' : 'Dark'}</span>
            </button>
          </div>

          {/* User Section */}
          {!user ? (
            <Button
              variant='primary'
              onClick={() => {
                openLogin();
                setIsMobileMenuOpen(false);
              }}
              className='w-full flex items-center justify-center space-x-2 py-3 rounded-lg font-medium'
            >
              <LogIn size={16} />
              <span>Sign In</span>
            </Button>
          ) : (
            <div className='space-y-4'>
              {/* User Info */}
              <div className='flex items-center space-x-3 p-3 rounded-lg bg-[rgb(var(--color-theme-background))]'>
                <div className='w-10 h-10 bg-gradient-to-br from-[rgb(var(--color-theme-accent))] to-[rgb(var(--color-theme-primary))] rounded-full flex items-center justify-center'>
                  <User size={20} className='text-white' />
                </div>
                <div>
                  <div className='font-medium text-[color:rgb(var(--color-theme-text-primary))]'>
                    {user?.firstname} {user?.lastname}
                  </div>
                  <div className='text-sm text-[color:rgb(var(--color-theme-text-secondary))]'>
                    Premium Member
                  </div>
                </div>
              </div>

              {/* User Menu Items */}
              <div className='space-y-2'>
                {userMenuItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        item.action();
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-[rgb(var(--color-theme-muted))] transition-colors duration-200 ${
                        item.isDanger
                          ? 'text-red-500 hover:text-red-600'
                          : 'text-[color:rgb(var(--color-theme-text-primary))]'
                      }`}
                    >
                      <Icon size={20} />
                      <span className='font-medium'>{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sign Out Confirmation Modal */}
      <Modal isOpen={signOutModalOpen} onClose={handleCancelSignOut}>
        <div className='text-center bg-[rgb(var(--color-theme-surface))] p-8 rounded-2xl max-w-md mx-4 border border-[rgb(var(--color-theme-border))]'>
          <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
            <LogOut className='w-8 h-8 text-red-600' />
          </div>
          <h3 className='text-xl font-semibold mb-3 text-[color:rgb(var(--color-theme-text-primary))]'>
            Sign Out
          </h3>
          <p className='text-[color:rgb(var(--color-theme-text-secondary))] mb-6 leading-relaxed'>
            Are you sure you want to sign out? You'll need to log in again to
            access your account.
          </p>
          <div className='flex gap-3 justify-center'>
            <Button
              variant='secondary'
              onClick={handleCancelSignOut}
              className='px-6 py-2'
            >
              Cancel
            </Button>
            <Button
              variant='danger'
              onClick={handleConfirmSignOut}
              className='px-6 py-2'
            >
              Sign Out
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Navbar;
