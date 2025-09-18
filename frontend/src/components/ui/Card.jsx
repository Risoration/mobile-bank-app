import React from 'react';

export function Card({ children, className = '', ...rest }) {
  return (
    <div
      className={`rounded-2xl shadow-2xl m-2 ${className} border-4
                 bg-[rgb(var(--color-theme-surface))] border-[rgb(var(--color-theme-border))]`}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className = '' }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
