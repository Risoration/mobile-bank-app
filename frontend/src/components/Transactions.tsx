import React, { useMemo, useState } from 'react';
import { Card, CardContent } from './ui/Card';
import Button from './ui/Buttons/Button';

// type Transaction = {
//   account_id: string;
//   account_owner: string | null;
//   amount: number;
//   authorized_date: string | null;
//   date: string;
//   iso_currency_code: string | null;
//   location: any;
//   merchant_name: string | null;
//   name: string;
//   payment_channel: string;
//   payment_meta: any;
//   pending: boolean;
//   personal_finance_category: {
//     primary: string;
//     secondary: string | null;
//     tertiary: string | null;
//   } | null;
//   transaction_id: string;
//   transaction_type: string;
// };

type TransactionsProps = {
  transactions: any[];
  accounts: any[];
  startDate?: string;
  endDate?: string;
  sort?: 'amount_asc' | 'amount_desc' | 'date_asc' | 'date_desc';
  filter?: 'category' | 'account';
  onChangeDateRange?: (start: string, end: string) => void;
};

type SortKey = 'amount_asc' | 'amount_desc' | 'date_asc' | 'date_desc';

export default function Transactions({
  transactions,
  accounts = [],
  startDate,
  endDate,
  sort,
  onChangeDateRange,
}: TransactionsProps) {
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

  const [sortKey, setSortKey] = useState<SortKey>('date_desc');
  const [accountFilter, setAccountFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const formatDate = (iso?: string) => {
    if (!iso) return '';
    try {
      return new Date(iso).toLocaleDateString();
    } catch {
      return iso;
    }
  };

  const getAccountName = (accId: string) => {
    const account = accounts.find(
      (acc) => acc.account_id === accId || acc.id === accId
    );
    return account?.name || account?.official_name || accId;
  };

  const getAccountOptions = useMemo(() => {
    const accountMap = new Map<string, string>();
    for (const t of transactions || []) {
      if (t?.account_id) {
        const accountName = getAccountName(t.account_id);
        accountMap.set(t.account_id, accountName);
      }
    }
    return accountMap;
  }, [transactions, accounts]);

  const accountOptions = useMemo(() => {
    const ids = new Set<string>();
    for (const t of transactions || []) {
      if (t?.account_id) {
        ids.add(t.account_id);
      }
    }
    return ['all', ...Array.from(ids)];
  }, [transactions]);

  const categoryOptions = useMemo(() => {
    const cats = new Set<string>();
    for (const t of transactions || []) {
      const list = Array.isArray(t?.category)
        ? t.category
        : t?.personal_finance_category?.primary
        ? [t.personal_finance_category.primary]
        : t?.category
        ? [t.category]
        : [];
      list.forEach((c: string) => cats.add(c));
    }
    return ['all', ...Array.from(cats)];
  }, [transactions]);

  const displayedTransactions = useMemo(() => {
    if (!Array.isArray(transactions)) {
      return [];
    }

    let result = transactions;

    //filter by account
    if (accountFilter !== 'all') {
      result = result.filter((t) => t.account_id === accountFilter);
    }

    //filter by category, matching any of the categories in the array of that transaction
    if (categoryFilter !== 'all') {
      result = result.filter((t) => {
        const list = Array.isArray(t?.category)
          ? t.category
          : t?.personal_finance_category?.primary
          ? [t.personal_finance_category.primary]
          : t?.category
          ? [t.category]
          : [];
        return list.includes(categoryFilter);
      });
    }

    //sort
    const sorted = [...result].sort((a, b) => {
      const aAmt = Number(a?.amount ?? 0);
      const bAmt = Number(b?.amount ?? 0);
      const aDate = a?.date ? new Date(a.date).getTime() : 0;
      const bDate = b?.date ? new Date(b.date).getTime() : 0;

      switch (sortKey) {
        case 'amount_asc':
          return aAmt - bAmt;
        case 'amount_desc':
          return bAmt - aAmt;
        case 'date_asc':
          return aDate - bDate;
        case 'date_desc':
          return bDate - aDate;
        default:
          return 0;
      }
    });

    return sorted;
  }, [transactions, sortKey, accountFilter, categoryFilter]);

  const clearAllFilters = () => {
    setSortKey('date_desc');
    setAccountFilter('all');
    setCategoryFilter('all');
  };

  return (
    <div className=''>
      <h1 className='text-3xl font-bold mb-4 text-center text-[color:rgb(var(--color-theme-text-primary))]'>
        Transactions
      </h1>

      <div>
        <div className='flex flex-row items-start justify-between gap-3'>
          <div className='mb-4 flex flex-col items-center gap-3'>
            {' '}
            <div className='flex items-center justfy-between gap-2'>
              <label className='text-sm text-[color:rgb(var(--color-theme-text-secondary))]'>
                Start Date
              </label>
              <input
                type='date'
                value={startDate}
                onChange={(e) =>
                  onChangeDateRange?.(e.target.value, endDate || '')
                }
                className='bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/20'
              />
            </div>
            <div className='flex items-center gap-2'>
              <label className='text-sm text-[color:rgb(var(--cololr-theme-text-secondary))] mr-1.5'>
                End Date
              </label>
              <input
                type='date'
                value={endDate}
                onChange={(e) =>
                  onChangeDateRange?.(startDate || '', e.target.value)
                }
                className='bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/20 text-[color:rgb(var(--color-theme-text-primary))]'
              />
            </div>
          </div>

          <div className='flex flex-col items-end gap-3'>
            <div className='flex items-center gap-2'>
              <label className='text-sm text-[color:rgb(var(--color-theme-text-secondary))]'>
                Sort
              </label>
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as SortKey)}
                className='bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 text-end focus:ring-white/20'
              >
                <option value='date_desc'>Date (Newest)</option>
                <option value='date_asc'>Date (Oldest)</option>
                <option value='amount_desc'>Amount (High to Low)</option>
                <option value='amount_asc'>Amount (Low to High)</option>
              </select>
            </div>

            <div className='flex items-center gap-2'>
              <label className='text-sm text-[color:rgb(var(--color-theme-text-secondary))]'>
                Account
              </label>
              <select
                value={accountFilter}
                onChange={(e) => setAccountFilter(e.target.value)}
                className='bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none text-end focus:ring-2 focus:ring-white/20'
              >
                <option value='all'>All accounts</option>
                {Array.from(getAccountOptions.entries()).map(
                  ([accountId, accountName]) => (
                    <option key={accountId} value={accountId}>
                      {accountName}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className='flex items-center gap-2'>
              <label className='text-sm text-[color:rgb(var(--color-theme-text-secondary))]'>
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className='bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none text-end focus:ring-2 focus:ring-white/20'
              >
                {categoryOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt === 'all' ? 'All categories' : opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <Button
          onClick={clearAllFilters}
          variant='secondary'
          className='text-[color:rgb(var(--color-theme-text-secondary))]'
        >
          Clear Filters
        </Button>
      </div>

      <div className='mb-6 flex flex-col '></div>

      {!transactions?.length && (
        <div className='text-center text-[color:rgb(var(--color-theme-text-secondary))]'>
          No transactions found. Connect a bank or adjust the date range.
        </div>
      )}

      {!!transactions?.length && (
        <Card>
          <CardContent>
            <div className='overflow-hidden rounded-xl border border-white/10 bg-black/20'>
              <div className='grid grid-cols-12 gap-4 px-4 py-2 text-sm uppercase tracking-wide text-gray-300 border-b border-white/10'>
                <div className='col-span-3 text-[color:rgb(var(--color-theme-text-primary))]'>
                  Name
                </div>
                <div className='col-span-2 text-[color:rgb(var(--color-theme-text-primary))]'>
                  Account
                </div>
                <div className='col-span-3 text-[color:rgb(var(--color-theme-text-primary))]'>
                  Category
                </div>
                <div className='col-span-2 text-right text-[color:rgb(var(--color-theme-text-primary))]'>
                  Amount
                </div>
                <div className='col-span-2 text-right text-[color:rgb(var(--color-theme-text-primary))]'>
                  Date
                </div>
              </div>
              <ul className='divide-y divide-white/10 px-3 py-2'>
                {displayedTransactions.map((tx: any) => {
                  const amount = tx.amount as number | undefined;
                  const isDebit = amount != null ? amount < 0 : false;
                  const displayAmount = formatCurrency(
                    Math.abs(amount || 0),
                    tx.iso_currency_code || tx.currency
                  );
                  const categories: string = Array.isArray(tx.category)
                    ? tx.category.join(' / ')
                    : tx.personal_finance_category?.primary ||
                      tx.category ||
                      '';
                  return (
                    <li
                      key={
                        tx.transaction_id ||
                        `${tx.account_id}-${tx.date}-${tx.name || 'tx'}`
                      }
                      className='grid grid-cols-12 gap-4 px-4 py-3 hover:bg-white/5'
                    >
                      <div className='col-span-3'>
                        <div className=' font-medium'>
                          {tx.name || tx.merchant_name || 'Transaction'}
                        </div>
                        {tx.pending && (
                          <div className='text-xs text-yellow-300'>Pending</div>
                        )}
                      </div>
                      <div className='col-span-2 text-[color:rgb(var(--cololr-theme-text-secondary))] truncate'>
                        {getAccountName(tx.account_id)}
                      </div>
                      <div className='col-span-3 text-[color:rgb(var(--cololr-theme-text-secondary))] truncate'>
                        {categories}
                      </div>
                      <div
                        className={`col-span-2 text-right font-semibold ${
                          isDebit
                            ? 'text-red-600 dark:text-red-500'
                            : 'text-emerald-600 dark:text-green-500'
                        }`}
                      >
                        {isDebit ? '-' : '+'}
                        {displayAmount}
                      </div>
                      <div className='col-span-2 text-right text-[color:rgb(var(--cololr-theme-text-secondary))]'>
                        {formatDate(tx.date)}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
