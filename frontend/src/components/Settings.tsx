import Button from './ui/Buttons/Button.tsx';
import { Coins, DollarSign, MonitorCog, Moon, Sun } from 'lucide-react';
import { useContext } from 'react';
import { SettingsContext } from '../../context/settingsContext.tsx';
import { useTheme } from '../../context/themeContext.tsx';
import React from 'react';
import { Card } from './ui/Card.jsx';
import { log } from 'console';

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
        <Card className='p-2'>
          <h2 className='text-lg font-semibold mb-1'>Theme</h2>
          <div className='form-check form-switch !bg-green'>
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
        </Card>
      </div>
    </div>
  );
}
