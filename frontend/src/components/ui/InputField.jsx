import React from 'react';

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

export const InputField = React.forwardRef(
  (
    {
      placeholder,
      type = 'input',
      size,
      onChange,
      className = '',
      disabled = false,
      ...props
    },
    ref
  ) => {
    return (
      <div className='relative w-full'>
        <input
          {...props}
          ref={ref}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          className='w-full bg-black placeholder:text-sm placeholder-white text-white px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
        />
      </div>
    );
  }
);

InputField.displayName = 'Input Field';

export default InputField;
