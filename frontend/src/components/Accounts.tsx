import React, { useContext, useState } from 'react';
import { Card, CardContent } from './ui/Card';
import ConnectBankButton from './ui/Buttons/ConnectBankButton';
import { UserContext } from '../../context/userContext';
import Button from './ui/Buttons/Button';
import { RefreshCw, Unplug, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

type AccountsProps = {
  accounts: any[];
  onAccountsUpdate?: () => void;
};

export default function Accounts({
  accounts,
  onAccountsUpdate,
}: AccountsProps) {
  const { user } = useContext(UserContext);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  const formatCurrency = (amount?: number, currency?: string) => {
    if (amount == null) return '-';
    try {
      return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currency || 'USD',
        maximumFractionDigits: 2,
      }).format(amount);
    } catch {
      return amount.toFixed(2);
    }
  };

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      toast.loading('Refreshing accounts...', { id: 'refresh' });

      // Call the sync endpoint to get latest data
      await fetch(`/api/transactions/sync/${user?.id}`, {
        method: 'POST',
      });

      // Refresh the data in parent component
      if (onAccountsUpdate) {
        await onAccountsUpdate();
      }

      toast.success('Accounts refreshed successfully!', { id: 'refresh' });
    } catch (error) {
      console.error('Error refreshing accounts:', error);
      toast.error('Failed to refresh accounts', { id: 'refresh' });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleDisconnectBank = async () => {
    if (
      !confirm(
        'Are you sure you want to disconnect your bank? This will remove all linked accounts and transactions.'
      )
    ) {
      return;
    }

    try {
      setIsDisconnecting(true);
      toast.loading('Disconnecting bank...', { id: 'disconnect' });

      const response = await fetch(`/api/accounts/${user?.id}/bank`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Bank disconnected successfully!', { id: 'disconnect' });

        // Refresh the data in parent component
        if (onAccountsUpdate) {
          await onAccountsUpdate();
        }
      } else {
        toast.error('Failed to disconnect bank', { id: 'disconnect' });
      }
    } catch (error) {
      console.error('Error disconnecting bank:', error);
      toast.error('Failed to disconnect bank', { id: 'disconnect' });
    } finally {
      setIsDisconnecting(false);
    }
  };

  return (
    <div className=''>
      <div className='flex flex-row justify-between items-start mb-6'>
        <div>
          <div className='flex justify-center flex-col text-[color:rgb(var(--color-theme-text-primary))]'>
            <h1 className='flex text-3xl font-bold'>Accounts</h1>
          </div>
          <p className='text-[color:rgb(var(--color-theme-text-secondary))]'>
            Here's your financial overview
          </p>
        </div>
        <div className='flex gap-2'>
          {accounts?.length > 0 && (
            <>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className='p-2 rounded-lg bg-[rgb(var(--color-theme-surface))] hover:bg-[rgb(var(--color-theme-muted))] border border-[rgb(var(--color-theme-border))] transition-colors duration-200 disabled:opacity-50'
                title='Refresh accounts'
              >
                <RefreshCw
                  size={20}
                  className={isRefreshing ? 'animate-spin' : ''}
                />
              </button>
              <button
                onClick={handleDisconnectBank}
                disabled={isDisconnecting}
                className='p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-500 transition-colors duration-200 disabled:opacity-50'
                title='Disconnect bank'
              >
                <Unplug size={20} />
              </button>
            </>
          )}
          <ConnectBankButton
            onBankConnected={onAccountsUpdate}
          ></ConnectBankButton>
        </div>
      </div>

      {!accounts?.length && (
        <div className='flex flex-col items-center justify-center py-16 text-center'>
          <div className='w-16 h-16 bg-[rgb(var(--color-theme-muted))] rounded-full flex items-center justify-center mb-4'>
            <AlertCircle
              size={32}
              className='text-[color:rgb(var(--color-theme-text-secondary))]'
            />
          </div>
          <h3 className='text-xl font-semibold text-[color:rgb(var(--color-theme-text-primary))] mb-2'>
            No Bank Accounts Connected
          </h3>
          <p className='text-[color:rgb(var(--color-theme-text-secondary))] max-w-md mb-6'>
            Connect your bank account to automatically track your transactions,
            manage budgets, and get insights into your spending.
          </p>
          <ConnectBankButton onBankConnected={onAccountsUpdate} />
        </div>
      )}

      {!!accounts?.length && (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {accounts.map((acc: any) => (
            <Card key={acc.account_id || acc.id}>
              <CardContent>
                <div className='flex items-baseline justify-between text-[color:rgb(var(--color-theme-text-primary))]'>
                  <h2 className='text-xl font-semibold'>
                    {acc.name || acc.official_name || 'Account'}
                  </h2>
                  <div className='flex items-center gap-2'>
                    {acc.mask && (
                      <span className='text-sm text-[color:rgb(var(--color-theme-text-primary))]'>
                        •••• {acc.mask}
                      </span>
                    )}
                  </div>
                </div>

                <div className='mt-1 text-sm text-[color:rgb(var(--color-theme-text-secondary))]'>
                  {(acc.subtype || acc.type) && (
                    <span>{acc.subtype || acc.type}</span>
                  )}
                </div>

                <div className='mt-4'>
                  <div className='text-2xl font-bold text-[color:rgb(var(--color-theme-text-secondary))]'>
                    {formatCurrency(
                      acc?.balances?.current,
                      acc?.balances?.iso_currency_code
                    )}
                  </div>
                  <div className='text-sm text-[color:rgb(var(--color-theme-text-secondary))]'>
                    Available:{' '}
                    {formatCurrency(
                      acc?.balances?.available,
                      acc?.balances?.iso_currency_code
                    )}
                  </div>
                </div>

                <div className='mt-4 text-xs text-gray-400'>
                  ID: {acc.account_id || acc.id}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
