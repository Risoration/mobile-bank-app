import React, { useContext, useState, useEffect } from 'react';
import { Card, CardContent } from './ui/Card';
import { UserContext } from '../../context/userContext';
import ConnectBankButton from './ui/Buttons/ConnectBankButton';
import { Transaction } from '../../../shared/user';
import { SettingsContext } from '../../context/settingsContext';

export default function Dashboard({ accounts, transactions }) {
  const { user } = useContext(UserContext);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (accounts?.length > 0 && !selectedAccountId) {
      setSelectedAccountId(null); // default to first account
    }
  }, [accounts, selectedAccountId]);

  const formatCurrency = (amount: number, currency = 'GBP') => {
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

  const filteredTransactions = (transactions || []).filter(
    (tx) => !selectedAccountId || tx.account_id === selectedAccountId
  );

  const totalAccounts = accounts?.length || 0;
  const totalBalance = (accounts || []).reduce((sum: number, acc) => {
    const balance = acc?.balances?.current ?? 0;
    return sum + balance;
  }, 0);

  const totalTransactions = filteredTransactions.length;
  const totals = filteredTransactions.reduce(
    (agg: any, tx: Transaction) => {
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
  const selectedAccount = accounts.find(
    (acc) => acc.account_id === selectedAccountId
  );

  //display variables to render
  const displayCurrency = selectedAccount?.balances?.iso_currency_code || 'GBP';
  const displayBalance =
    selectedAccountId && selectedAccount
      ? selectedAccount.balances.current ?? 0
      : totalBalance;
  const displayAccounts =
    selectedAccountId && selectedAccount
      ? selectedAccount.name
      : 'All Accounts';

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
        <div>
          <label className='text-sm text-[color:rgb(var(--color-theme-text-secondary))] mt-1'>
            Select Account to Overview:
          </label>
          <select
            value={selectedAccountId || ''}
            onChange={(e) => setSelectedAccountId(e.target.value || null)}
            className='ml-2 p-2 border border-gray-300 rounded'
          >
            <option
              value=''
              className='bg-[color:rgb(var(--color-theme-surface))] text-[color:rgb(var(--color-theme-text-primary))]'
            >
              All Accounts
            </option>
            {accounts?.map((acc) => (
              <option
                key={acc.account_id}
                value={acc.account_id}
                className='bg-[color:rgb(var(--color-theme-surface))] text-[color:rgb(var(--color-theme-text-primary))]'
              >
                {acc.name} (
                {formatCurrency(
                  acc.balances.current,
                  acc.balances.iso_currency_code
                )}
                )
              </option>
            ))}
          </select>
        </div>
        <div className='flex flex-col text-center'>
          <ConnectBankButton
            onBankConnected={() => window.location.reload()}
          ></ConnectBankButton>
          <p className='text-[color:rgb(var(--color-theme-text-secondary))] text-lg'>
            {totalAccounts} Accounts Connected
          </p>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6'>
        <Card>
          <CardContent>
            <h3 className='text-[color:rgb(var(--color-theme-text-secondary))] text-sm'>
              Overview of
            </h3>
            <p className='text-2xl text-[color:rgb(var(--color-theme-text-secondary))] font-semibold'>
              {displayAccounts}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3 className='text-[color:rgb(var(--color-theme-text-primary))] text-sm'>
              Total Balance
            </h3>
            <p className='text-2xl text-[color:rgb(var(--color-theme-text-secondary))] font-semibold'>
              {formatCurrency(displayBalance, displayCurrency)}
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
