import React, { useContext } from 'react';
import { Card, CardContent } from './ui/Card';
import ConnectBankButton from './ui/Buttons/ConnectBankButton';
import { UserContext } from '../../context/userContext';

type AccountsProps = {
  accounts: any[];
  onAccountsUpdate?: () => void;
};

export default function Accounts({
  accounts,
  onAccountsUpdate,
}: AccountsProps) {
  const { user } = useContext(UserContext);

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

  return (
    <div className=''>
      <div className='flex flex-row justify-between'>
        <div>
          <div className='flex justify-center flex-col text-[color:rgb(var(--color-theme-text-primary))]'>
            <h1 className='flex text-3xl font-bold'>Accounts</h1>
          </div>
          <p className='text-[color:rgb(var(--color-theme-text-secondary))]'>
            Here's your financial overview
          </p>
        </div>
        <div className='flex gap-2'>
          <ConnectBankButton></ConnectBankButton>
        </div>
      </div>

      {!accounts?.length && (
        <div className='text-center text-gray-300'>
          No accounts found. Connect a bank to view accounts.
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
