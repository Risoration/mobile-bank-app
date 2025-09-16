import React from 'react';
import { Card, CardContent } from './ui/Card';
import ConnectBankButton from './ui/Buttons/ConnectBankButton';

type AccountsProps = {
  accounts: any[];
};

export default function Accounts({ accounts }: AccountsProps) {
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
    <div className='text-white'>
      <div className='flex flex-row justify-between'>
        <div>
          <div className='flex justify-center flex-col'>
            <h1 className='flex text-3xl text-white font-bold'>Accounts</h1>
          </div>
          <p className='text-gray-400'>Here's your financial overview</p>
        </div>
        <ConnectBankButton></ConnectBankButton>
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
                <div className='flex items-baseline justify-between'>
                  <h2 className='text-xl font-semibold'>
                    {acc.name || acc.official_name || 'Account'}
                  </h2>
                  {acc.mask && (
                    <span className='text-sm text-gray-300'>
                      •••• {acc.mask}
                    </span>
                  )}
                </div>

                <div className='mt-1 text-sm text-gray-300'>
                  {(acc.subtype || acc.type) && (
                    <span>{acc.subtype || acc.type}</span>
                  )}
                </div>

                <div className='mt-4'>
                  <div className='text-2xl font-bold'>
                    {formatCurrency(
                      acc?.balances?.current,
                      acc?.balances?.iso_currency_code
                    )}
                  </div>
                  <div className='text-sm text-gray-300'>
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
