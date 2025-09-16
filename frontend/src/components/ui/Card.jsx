import React from 'react';

export function Card({ children, className = '', ...rest }) {
  return (
    <div
      className={`rounded-2xl shadow-2xl m-2 ${className} border-4
                 bg-slate-100 border-slate-300
                 dark:bg-slate-900 dark:border-slate-600`}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className = '' }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
