import Button from './Button';
import React, { useContext } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { useState, useEffect } from 'react';
import {
  UserContext,
  type UserContextType,
} from '../../../../context/userContext';

export default function ConnectBankButton() {
  const { user } = useContext(UserContext) as UserContextType;
  const [linkToken, setLinkToken] = useState(null);

  useEffect(() => {
    if (!user?.id) return;

    async function fetchLinkToken() {
      const res = await fetch('/api/create_link_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user?.id }),
      });
      const data = await res.json();
      setLinkToken(data.link_token);
    }
    fetchLinkToken();
  }, [user?.id]);

  const onSuccess = async (public_token, metadata) => {
    await fetch('/api/exchange_public_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ public_token, userId: user?.id }),
    });
    console.log('Bank connected:', metadata);
  };

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess,
  });

  return (
    <Button
      onClick={() => open()}
      disabled={!ready}
      variant='addbank'
    >
      + Add Bank Account
    </Button>
  );
}
