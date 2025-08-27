import React, { useState } from 'react';
import InputField from './InputField';
/**
 * PasswordInput Component - A password input field with visibility toggle
 *
 * @param {string} placeholder - Input placeholder text
 * @param {string} type - Input type (usually 'password')
 * @param {string} size - Size variant (not used in current implementation)
 * @param {function} onChange - Change handler function
 * @param {string} className - Additional CSS classes
 * @param {boolean} disabled - Whether input is disabled
 *
 * @example
 * <PasswordInput
 *   placeholder="Enter your password"
 *   onChange={(e) => setPassword(e.target.value)}
 * />
 */
export const PasswordInput = React.forwardRef(
  (
    {
      placeholder,
      type = 'password',
      size,
      onChange,
      className = '',
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
      setVisible(!visible);
    };

    return (
      <div className='relative w-full'>
        <InputField
          ref={ref}
          placeholder={placeholder}
          type={visible ? 'text' : type}
          onChange={onChange}
          className={className}
          disabled={disabled}
        />
        <button
          type='button'
          disabled={disabled}
          onClick={toggleVisibility}
          className='absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 p-1 text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded'
          aria-label='Toggle password visibility'
        >
          {visible ? (
            <svg
              className='w-5 h-5 hover:text-teal-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21'
              />
            </svg>
          ) : (
            <svg
              className='w-5 h-5 hover:text-purple-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
              />
            </svg>
          )}
        </button>
      </div>
    );
  }
);

/**
 * PasswordStrengthMeter Component - Shows password strength with visual indicators
 *
 * @param {number} value - Password strength value (0-5)
 * @param {string} p - Padding class
 * @param {string} w - Width class
 *
 * @example
 * <PasswordStrengthMeter value={3} p="p-2" w="w-full" />
 */
export const PasswordStrengthMeter = ({ value, p = '', w = '' }) => {
  const getStrengthColor = (strength) => {
    if (strength <= 1) return 'bg-red-500';
    if (strength <= 2) return 'bg-orange-500';
    if (strength <= 3) return 'bg-yellow-500';
    if (strength <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthText = (strength) => {
    if (strength <= 1) return 'Very Weak';
    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Fair';
    if (strength <= 4) return 'Good';
    return 'Strong';
  };

  return (
    <div className={`w-full ${p} ${w}`}>
      <div className='flex space-x-1 mb-2'>
        {[1, 2, 3, 4, 5].map((index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded ${
              index <= value ? getStrengthColor(value) : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
      <p className='text-sm text-gray-400'>
        Password Strength: {getStrengthText(value)}
      </p>
    </div>
  );
};

PasswordInput.displayName = 'PasswordInput';
PasswordStrengthMeter.displayName = 'PasswordStrengthMeter';

export default PasswordInput;
