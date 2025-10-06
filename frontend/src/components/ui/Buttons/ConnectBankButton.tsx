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
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    async function fetchLinkToken() {
      // First check if user has an existing bank connection by trying to fetch accounts
      try {
        const accountsRes = await fetch(`/api/accounts/${user?.id}`);
        const accountsData = await accountsRes.json();

        // If user has existing connection but needs update (error_code present), use update mode
        if (accountsData.error_code === 'ITEM_LOGIN_REQUIRED') {
          const updateRes = await fetch('/api/create_link_token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: user?.id, updateMode: true }),
          });
          const updateData = await updateRes.json();
          setLinkToken(updateData.link_token);
          setIsUpdateMode(true);
          return;
        }
      } catch (error) {
        // If accounts fetch fails, user might not have a connection yet
        console.log('No existing bank connection found');
      }

      // Default to regular mode for new connections
      const res = await fetch('/api/create_link_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user?.id }),
      });

      const data = await res.json();
      setLinkToken(data.link_token);
      setIsUpdateMode(false);
    }
    fetchLinkToken();
  }, [user?.id]);

  const onSuccess = async (public_token, metadata) => {
    try {
      await fetch('/api/exchange_public_token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public_token, userId: user?.id }),
      });
      console.log('Bank connected:', metadata);
    } catch (error) {
      console.error('Error connecting bank:', error);
    }
  };

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess,
  });

  return (
    <Button onClick={() => open()} disabled={!ready} variant='addbank'>
      {isUpdateMode ? 'Update Bank Connection' : '+ Add Bank Account'}
    </Button>
  );
}
