import React from 'react';
import { Card, CardContent } from './ui/Card';

type TransactionsProps = {
  transactions: any[];
  startDate?: string;
  endDate?: string;
  onChangeDateRange?: (start: string, end: string) => void;
};

export default function Transactions({
  transactions,
  startDate,
  endDate,
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

  const formatDate = (iso?: string) => {
    if (!iso) return '';
    try {
      return new Date(iso).toLocaleDateString();
    } catch {
      return iso;
    }
  };

  return (
    <div className='text-white'>
      <h1 className='text-3xl font-bold mb-4 text-center'>Transactions</h1>

      {/* <div className='mb-6 flex flex-col sm:flex-row items-center justify-between gap-3'>
        <div className='flex items-center gap-2'>
          <label className='text-sm text-gray-300'>Start</label>
          <input
            type='date'
            value={startDate}
            onChange={(e) => onChangeDateRange?.(e.target.value, endDate || '')}
            className='bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/20'
          />
        </div>
        <div className='flex items-center gap-2'>
          <label className='text-sm text-gray-300'>End</label>
          <input
            type='date'
            value={endDate}
            onChange={(e) =>
              onChangeDateRange?.(startDate || '', e.target.value)
            }
            className='bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/20'
          />
        </div>
      </div> */}

      {!transactions?.length && (
        <div className='text-center text-gray-300'>
          No transactions found. Connect a bank or adjust the date range.
        </div>
      )}

      {!!transactions?.length && (
        <Card>
          <CardContent>
            <div className='overflow-hidden rounded-xl border border-white/10 bg-black/20'>
              <div className='grid grid-cols-12 gap-4 px-4 py-2 text-xs uppercase tracking-wide text-gray-300 border-b border-white/10'>
                <div className='col-span-3'>Name</div>
                <div className='col-span-2'>Account</div>
                <div className='col-span-3'>Category</div>
                <div className='col-span-2 text-right'>Amount</div>
                <div className='col-span-2 text-right'>Date</div>
              </div>
              <ul className='divide-y divide-white/10'>
                {transactions.map((tx: any) => {
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
                      <div className='col-span-3 truncate'>
                        <div className='font-medium'>
                          {tx.name || tx.merchant_name || 'Transaction'}
                        </div>
                        {tx.pending && (
                          <div className='text-xs text-yellow-300'>Pending</div>
                        )}
                      </div>
                      <div className='col-span-2 text-gray-300 truncate'>
                        {tx.account_id}
                      </div>
                      <div className='col-span-3 text-gray-300 truncate'>
                        {categories}
                      </div>
                      <div
                        className={`col-span-2 text-right font-semibold ${
                          isDebit ? 'text-red-300' : 'text-green-300'
                        }`}
                      >
                        {isDebit ? '-' : '+'}
                        {displayAmount}
                      </div>
                      <div className='col-span-2 text-right text-gray-300'>
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
