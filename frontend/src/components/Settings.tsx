import Button from './ui/Buttons/Button.tsx';
import { Coins, MonitorCog, Moon } from 'lucide-react';
import { useContext } from 'react';
import { SettingsContext } from '../../context/settingsContext.tsx';
import { useTheme } from '../../context/themeContext.tsx';
import React from 'react';
import { Card } from './ui/Card.jsx';

export default function Settings() {
  const {
    currency,
    // highContrast,
    // largeText,
    setCurrency,
    // setHighContrast,
    // setLargeText,
  } = useContext(SettingsContext);

  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className='text-[color:rgb(var(--color-theme-text-primary))]'>
      <div className='flex flex-row justify-between'>
        <div>
          <div className='flex justify-center flex-col'>
            <h1 className='flex text-3xl font-bold'>Settings</h1>
          </div>
        </div>
        <Button variant='register'>
          <Coins />
          Set up a Budget
        </Button>
      </div>

      <div className='flex justify-center gap-6'>
        <Card className='p-6 w-full max-w-md'>
          <div className='flex items-center gap-3 mb-6'>
            <MonitorCog className='w-6 h-6 text-[rgb(var(--color-theme-accent))]' />
            <h2 className='text-xl font-semibold'>Theme Settings</h2>
          </div>

          <p className='text-[color:rgb(var(--color-theme-text-secondary))] mb-6 text-sm'>
            Choose how you want Revolve to look. You can always change this
            later.
          </p>

          <div className='space-y-4'>
            {/* Dark Theme Toggle */}
            <div className='flex items-center justify-between p-4 rounded-lg border border-[rgb(var(--color-theme-border))] hover:border-[rgb(var(--color-theme-accent)/0.5)] transition-all duration-200'>
              <div className='flex items-center gap-3'>
                <div className='p-2 rounded-full bg-slate-100 dark:bg-slate-800'>
                  <Moon className='w-5 h-5 text-slate-600 dark:text-slate-300' />
                </div>
                <div>
                  <h3 className='font-medium'>Dark Theme</h3>
                  <p className='text-sm text-[color:rgb(var(--color-theme-text-secondary))]'>
                    Easy on the eyes, especially at night
                  </p>
                </div>
              </div>

              {/* Toggle Switch */}
              <div
                className={`relative w-14 h-8 rounded-full border-2 transition-all duration-200 cursor-pointer ${
                  darkMode
                    ? 'border-purple-500 bg-purple-500'
                    : 'border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700'
                }`}
                onClick={() => toggleDarkMode()}
                role='switch'
                tabIndex={0}
                aria-checked={darkMode}
                aria-label='Toggle dark theme'
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleDarkMode();
                  }
                }}
              >
                {/* Toggle thumb */}
                <div
                  className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-200 ${
                    darkMode ? 'right-0.5' : 'left-0.5'
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
