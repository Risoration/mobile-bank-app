import React from 'react';

/**
 * Button Component - A reusable button component with consistent styling
 *
 * @param {string} variant - Button style variant
 * @param {string} size - Button size
 * @param {string} className - Additional CSS classes
 * @param {boolean} disabled - Whether button is disabled
 * @param {string} type - Button type (button n, submit, reset)
 * @param {function} onClick - Click handler function
 * @param {React.ReactNode} children - Button content
 *
 * @example
 * // Primary button
 * <Button onClick={handleClick}>Click Me</Button>
 *
 * // Submit button
 * <Button type="submit" variant="submit" size="lg">
 *   Submit Form
 * </Button>
 *
 * // Ghost button for navigation
 * <Button variant="ghost" size="sm" onClick={navigate}>
 *   Go Back
 * </Button>
 */
interface ButtonProps {
  children?: React.ReactNode;
  variant?: string;
  size?: string;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      className = '',
      disabled = false,
      type = 'button',
      onClick,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'flex justify-between text-center items-center font-medium cursor-pointer rounded-md transition-colors h-fit m-2';

    const variants = {
      primary: ' border border-blue-600',
      secondary: 'text-gray-300 border border-gray-600',
      success:
        ' border rounded-md hover:bg-teal-700 dark:hover:bg-slate-200 dark:hover:text-slate-950',
      danger: ' border border-red-600 hover:bg-red-700',
      aside: `text-slate-200 border w-full bg-teal-900 hover:bg-teal-700 text-slate-900 dark:bg-teal-500 dark:hover-teal-400 dark:text-slate-200`,
      submit: 'text-teal-500 bg-white hover:bg-teal-500 hover: justify-center',
      register:
        ' border border-teal bg-teal-500 hover:bg-white hover:text-teal-500 justify-center',
      addbank: ' hover:text-teal-800 bg-teal-500 hover:bg-teal-400',
      premium: ' hover:bg-yellow-700 bg-yellow-600/40',
    };

    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
      xl: 'px-8 py-4 text-xl',
    };

    const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses}
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
