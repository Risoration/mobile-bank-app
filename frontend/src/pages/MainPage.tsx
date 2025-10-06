import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/userContext';
import Dashboard from '../components/Dashboard';
import Transactions from '../components/Transactions';
import Accounts from '../components/Accounts';
import Settings from '../components/Settings';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import React from 'react';
import Budgets from '../components/Budgets';

export default function MainPage() {
  const { user } = useContext(UserContext);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [pageView, setPageView] = useState('dashboard');
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-12-31');

  const fetchData = async () => {
    if (!user) return;

    try {
      const { data: accData } = await axios.get(`/api/accounts/${user.id}`);
      setAccounts(accData.accounts ?? accData.response ?? []);

      const { data: transData } = await axios.get(
        `/api/transactions/${user.id}`,
        { params: { start_date: startDate, end_date: endDate } }
      );
      setTransactions(transData.transactions ?? transData.response ?? []);
      console.log('Fetched transactions:', transactions);
    } catch (err) {
      console.error('Failed to fetch accounts/transactions', err);
      setAccounts([]);
      setTransactions([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user, startDate, endDate]);

  return (
    <div className='h-full font-thin bg-[rgb(var(--color-theme-background))] text-[color:rgb(var(--color-theme-text-primary))]'>
      <div className='flex flex-col md:flex-row justify-between m-3 h-fit bg-[rgb(var(--color-theme-background))]'>
        {/* Sidebar */}
        <Sidebar onViewChange={setPageView} />

        {/* Main Content */}
        <main className='flex-1 p-3 md:p-6 overflow-y-auto rounded-2xl bg-[rgb(var(--color-theme-surface))] text-[color:rgb(var(--color-theme-text-primary))] mb-2 md:ml-0'>
          {pageView === 'dashboard' && (
            <Dashboard accounts={accounts} transactions={transactions} />
          )}
          {pageView === 'accounts' && (
            <Accounts accounts={accounts} onAccountsUpdate={fetchData} />
          )}
          {pageView === 'transactions' && (
            <Transactions
              transactions={transactions}
              startDate={startDate}
              endDate={endDate}
              onChangeDateRange={(s, e) => {
                setStartDate(s);
                setEndDate(e);
              }}
            />
          )}
          {pageView === 'budgets' && <Budgets />}
          {pageView === 'settings' && <Settings />}
        </main>
      </div>
    </div>
  );
}
