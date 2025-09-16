import Button from './ui/Buttons/Button.tsx';
import { Coins, MonitorCog, Moon, Sun } from 'lucide-react';
import { useContext } from 'react';
import { SettingsContext } from '../../context/settingsContext.tsx';
import { useTheme } from '../../context/themeContext.tsx';
import React from 'react';

export default function Settings() {
  const {
    currency,
    highContrast,
    largeText,
    setCurrency,
    setHighContrast,
    setLargeText,
  } = useContext(SettingsContext);

  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className='text-white'>
      <div className='flex flex-row justify-between'>
        <div>
          <div className='flex justify-center flex-col'>
            <h1 className='flex text-3xl text-white font-bold'>Settings</h1>
          </div>
        </div>
        <Button variant='register'>
          <Coins />
          Set up a Budget
        </Button>
      </div>

      <div className='flex justify-center gap-6'>
        <section className='flex flex-col items-center rounded-2xl border border-white/10 p-4 bg-black/30'>
          <h2 className='text-lg font-semibold mb-1'>Theme</h2>
          <div className='form-check form-switch !bg-green'>
            <input
              className='form-check-input'
              type='checkbox'
              value=''
              id='checkDarkMode'
              onClick={() => toggleDarkMode()}
            />
            Dark Mode
            <label className='form-check-label' htmlFor='checkDarkMode' />
          </div>
          <h2 className='text-lg font-semibold my-3'>Currency</h2>
        </section>
      </div>
    </div>
  );
}
