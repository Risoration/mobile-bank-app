import React from 'react';

/**
 * Simple test to verify Tailwind is working
 */
export default function SimpleTest() {
  return (
    <div style={{ backgroundColor: 'red', color: 'white', padding: '20px' }}>
      <h1>INLINE STYLES TEST - This should be red background</h1>
      <div className='bg-blue-500 text-white p-4 rounded'>
        <h2>
          TAILWIND TEST - This should be blue background if Tailwind works
        </h2>
        <p>
          If you see blue background, Tailwind is working. If not, there's an
          issue.
        </p>
      </div>
    </div>
  );
}
