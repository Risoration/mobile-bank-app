import React from 'react';
import { useState, useRef, useEffect } from 'react';
import Button from './Buttons/Button';

interface DropdownProps {
  label: string;
  items: { label: string; onClick: () => void }[];
}

export default function Combobox({ label, items }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='relative inline-block text-left' ref={ref}>
      <Button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        className='inline-flex cursor-none'
        variant='ghost'
      >
        {label}
      </Button>

      {open && (
        <div>
          <div>
            {items.map((item, idx) => (
              <Button
                key={idx}
                onClick={() => {
                  item.onClick();
                  setOpen(false);
                }}
                className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
