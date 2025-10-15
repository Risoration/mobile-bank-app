import Button from './Button';
import React, { useContext } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { useState, useEffect } from 'react';
import {
  UserContext,
  type UserContextType,
} from '../../../../context/userContext';
import toast from 'react-hot-toast';

interface ConnectBankButtonProps {
  onBankConnected?: () => void;
}

export default function ConnectBankButton({
  onBankConnected,
}: ConnectBankButtonProps) {
  const { user } = useContext(UserContext) as UserContextType;
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    async function fetchLinkToken() {
      try {
        setIsLoading(true);
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

        if (data.error) {
          toast.error('Failed to initialize bank connection');
          console.error('Link token error:', data.error);
          return;
        }

        setLinkToken(data.link_token);
        setIsUpdateMode(false);
      } catch (error) {
        console.error('Error fetching link token:', error);
        toast.error('Failed to initialize bank connection');
      } finally {
        setIsLoading(false);
      }
    }
    fetchLinkToken();
  }, [user?.id]);

  const onSuccess = async (public_token: string, metadata: any) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/exchange_public_token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public_token, userId: user?.id }),
      });

      const data = await response.json();

      if (data.ok) {
        toast.success(
          `${metadata.institution.name} connected successfully! 🎉`,
          { duration: 4000 }
        );
        console.log('Bank connected:', metadata);

        // Trigger refresh of parent component data
        if (onBankConnected) {
          onBankConnected();
        }
      } else {
        toast.error('Failed to connect bank account');
        console.error('Exchange token error:', data.error);
      }
    } catch (error) {
      console.error('Error connecting bank:', error);
      toast.error('Failed to connect bank account');
    } finally {
      setIsLoading(false);
    }
  };

  const onExit = (error: any, metadata: any) => {
    if (error) {
      console.error('Plaid Link error:', error);
      toast.error('Bank connection cancelled or failed');
    }
  };

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess,
    onExit,
  });

  return (
    <Button
      onClick={() => open()}
      disabled={!ready || isLoading}
      variant='addbank'
    >
      {isLoading
        ? 'Loading...'
        : isUpdateMode
        ? 'Update Bank Connection'
        : '+ Add Bank Account'}
    </Button>
  );
}
