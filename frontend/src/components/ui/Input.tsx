import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className='flex flex-col w-full'>
      {label && (
        <label className='mb-1 text-sm font-medium text-gray-700 dark:text-gray-300'>
          {label}
        </label>
      )}
      <input
        {...props}
        className={`
          w-full px-3 py-2 border border-gray-300 rounded-md text-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500
          bg-white text-gray-900 placeholder-gray-500
          dark:bg-gray-900 dark:text-white dark:placeholder-gray-400
          ${className}
        `}
      />
    </div>
  );
};

export default Input;
