import Button from './Button';
import React from 'react';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

export const UpgradeButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      variant='premium'
      className='px-4 py-2 rounded flex items-center'
      onClick={() => navigate('/pricing')}
    >
      <Star className='mr-2 ' />
      Revolve Premium
    </Button>
  );
};
