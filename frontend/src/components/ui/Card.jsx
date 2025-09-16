import React from 'react';

export function Card({ children, className = '', ...rest }) {
  return (
    <div
      className={`rounded-2xl bg-black/30 shadow-2xl m-2 ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className = '' }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
