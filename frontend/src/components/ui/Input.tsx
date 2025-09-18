import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className='flex flex-col w-full'>
      {label && (
        <label className='mb-1 text-sm font-medium text-[color:rgb(var(--color-theme-text-secondary))]'>
          {label}
        </label>
      )}
      <input
        {...props}
        className={`
          w-full px-3 py-2 border rounded-md text-sm
          focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-theme-primary))]
          bg-[rgb(var(--color-theme-surface))] text-[color:rgb(var(--color-theme-text-primary))] placeholder-[color:rgb(var(--color-theme-text-secondary))]
          border-[rgb(var(--color-theme-border))]
          ${className}
        `}
      />
    </div>
  );
};

export default Input;
