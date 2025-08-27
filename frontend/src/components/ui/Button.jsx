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
export const Button = React.forwardRef(
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
      'flex font-medium cursor-pointer rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary: 'text-white border border-blue-600',
      secondary: 'text-gray-300 border border-gray-600',
      outline: 'text-blue-600 border border-blue-600 hover:bg-teal-400',
      ghost: 'text-gray-300 border border-transparent hover:bg-teal-700 w-fit',
      success: 'text-white border border-green-600',
      danger: 'text-white border border-red-600 hover:bg-red-700',
      warning: 'text-white hover:bg-yellow-700 bg-yellow-800',
      aside: 'text-gray-300 border border-transparent hover:bg-teal-700 w-full',
      submit:
        ' text-teal-500 border border-white bg-white hover:bg-teal-500 hover:text-white justify-center',
      register:
        'text-white bg-teal-500 hover:bg-white hover:text-teal-500 justify-center',
      premium: 'text-white hover:bg-yellow-700 bg-yellow-600/40',
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
