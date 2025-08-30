import React from 'react';

export function Card({ children }) {
  return <div className='rounded-2xl bg-white shadow-2xl m-2'>{children}</div>;
}

export function CardContent({ children, className = '' }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
