import { useContext } from 'react';
import { Card, CardContent } from './ui/Card';
import { UserContext } from '../../context/userContext';
import ConnectBankButton from './ui/Buttons/ConnectBankButton';
import React from 'react';

export default function Dashboard({ accounts, transactions }) {
  const { user } = useContext(UserContext);
  const formatCurrency = (amount, currency = 'GBP') => {
    if (amount == null) return '-';
    try {
      return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency,
        maximumFractionDigits: 2,
      }).format(amount);
    } catch (e) {
      return amount.toFixed(2);
    }
  };

  const totalAccounts = accounts?.length || 0;
  const totalBalance = (accounts || []).reduce((sum: number, acc) => {
    const balance = acc?.balances?.current ?? 0;
    return sum + balance;
  }, 0);
  const displayCurrency = accounts?.[0]?.balances?.iso_currency_code || 'GBP';

  const totalTransactions = transactions?.length || 0;
  const totals = (transactions || []).reduce(
    (agg, tx) => {
      const amt = typeof tx.amount === 'number' ? tx.amount : 0;
      if (amt < 0) {
        agg.expenses += Math.abs(amt);
      } else {
        agg.income += amt;
      }
      return agg;
    },
    { income: 0, expenses: 0 }
  );
  const net = totals.income - totals.expenses;

  return (
    <div className='flex-1 p-6 overflow-y-auto bg-[rgb(var(--color-theme-surface))] rounded-2xl'>
      {/* Header */}
      <div className='flex flex-row justify-between'>
        <div>
          <div className='flex justify-center flex-col'>
            <h1 className='flex text-3xl text-[color:rgb(var(--color-theme-text-primary))] font-bold'>
              Welcome back, {user?.firstname}!
            </h1>
          </div>
          <p className='text-[color:rgb(var(--color-theme-text-secondary))]'>
            Here's your financial overview
          </p>
        </div>
        <ConnectBankButton></ConnectBankButton>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6'>
        <Card>
          <CardContent>
            <h3 className='text-[color:rgb(var(--color-theme-text-secondary))] text-sm'>
              Accounts
            </h3>
            <p className='text-2xl text-[color:rgb(var(--color-theme-text-secondary))] font-semibold'>
              {totalAccounts}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3 className='text-[color:rgb(var(--color-theme-text-primary))] text-sm'>
              Total Balance
            </h3>
            <p className='text-2xl text-[color:rgb(var(--color-theme-text-secondary))] font-semibold'>
              {formatCurrency(totalBalance, displayCurrency)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3 className='text-[color:rgb(var(--color-theme-text-secondary))] text-sm'>
              Income
            </h3>
            <p className='text-2xl text-[color:rgb(var(--color-theme-success))] font-semibold'>
              {formatCurrency(
                totals.income,
                transactions?.[0]?.iso_currency_code || displayCurrency
              )}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3 className='text-[color:rgb(var(--color-theme-text-secondary))] text-sm'>
              Expenses
            </h3>
            <p className='text-2xl text-[color:rgb(var(--color-theme-error))] font-semibold'>
              {formatCurrency(
                totals.expenses,
                transactions?.[0]?.iso_currency_code || displayCurrency
              )}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
        <Card>
          <CardContent>
            <h3 className='text-[color:rgb(var(--color-theme-text-secondary))] text-sm'>
              Transactions
            </h3>
            <p className='text-2xl text-[color:rgb(var(--color-theme-text-primary))] font-semibold'>
              {totalTransactions}
            </p>
          </CardContent>
        </Card>
        <Card className='md:col-span-2'>
          <CardContent>
            <h3 className='text-[color:rgb(var(--color-theme-text-secondary))] text-sm'>
              Net
            </h3>
            <p
              className={`text-2xl font-semibold ${
                net >= 0
                  ? 'text-[color:rgb(var(--color-theme-success))]'
                  : 'text-[color:rgb(var(--color-theme-error))]'
              }`}
            >
              {formatCurrency(
                net,
                transactions?.[0]?.iso_currency_code || displayCurrency
              )}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
