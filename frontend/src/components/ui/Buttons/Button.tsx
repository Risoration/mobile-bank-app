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
      'flex justify-between rounded text-center items-center font-medium h-fit m-2 ' +
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-inherit';

    const variants = {
      primary:
        'bg-[rgb(var(--color-theme-primary))] hover:bg-[rgb(var(--color-theme-primary)/0.9)] text-[color:rgb(var(--color-theme-text-button))] border border-[rgb(var(--color-theme-border))]',
      secondary:
        'bg-[rgb(var(--color-theme-surface))] hover:bg-[rgb(var(--color-theme-muted))] text-[color:rgb(var(--color-theme-text-button))] border border-[rgb(var(--color-theme-border))]',
      success:
        'bg-[rgb(var(--color-theme-success))] hover:bg-[rgb(var(--color-theme-success)/0.9)] text-[color:rgb(var(--color-theme-text-button))] border border-[rgb(var(--color-theme-border))] rounded-md',
      danger:
        'bg-[rgb(var(--color-theme-error))] hover:bg-[rgb(var(--color-theme-error)/0.9)] text-[color:rgb(var(--color-theme-text-button))] border border-[rgb(var(--color-theme-border))]',
      submit:
        'text-[color:rgb(var(--color-theme-text-button))] bg-white hover:bg-[rgb(var(--color-theme-muted))] justify-center border border-[rgb(var(--color-theme-border))]',
      register:
        'border border-[rgb(var(--color-theme-border))] bg-[rgb(var(--color-theme-primary))] hover:bg-white hover:text-[color:rgb(var(--color-theme-primary))] justify-center text-[color:rgb(var(--color-theme-text-button))]',
      addbank:
        'text-[color:rgb(var(--color-theme-text-button))] bg-[rgb(var(--color-theme-accent))] hover:bg-[rgb(var(--color-theme-accent)/0.9)]',
      premium:
        'w-full bg-yellow-600/40 hover:bg-yellow-700 text-[color:rgb(var(--color-theme-text-button))] border border-[rgb(var(--color-theme-border))]',
      muted:
        'border border-[rgb(var(--color-theme-border))] bg-[rgb(var(--color-theme-muted))] text-[color:rgb(var(--color-theme-text-button))] hover:bg-[rgb(var(--color-theme-muted)/0.9)]',
      aside:
        'w-full border border-[rgb(var(--color-theme-border))] bg-[rgb(var(--color-theme-muted))] hover:bg-[rgb(var(--color-theme-primary)/0.9)] text-[rgb(var(--color-theme-text-button))]',
    };

    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
      xl: 'px-8 py-4 text-xl',
    };

    const buttonClasses = `${className} ${baseClasses} ${variants[variant]} ${sizes[size]}`;

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
