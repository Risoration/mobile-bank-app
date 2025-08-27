import React from 'react';

export function Card({ children }) {
  return (
    <div className='rounded-lg border border-gray-200 bg-white shadow-sm'>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '' }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
