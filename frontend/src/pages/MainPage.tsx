import Button from '../components/ui/Buttons/Button';
import { ArrowDownCircle, CreditCard, SettingsIcon, Crown } from 'lucide-react';
import '../index.css';
import { ChartNoAxesCombined } from 'lucide-react';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/userContext';
import Dashboard from '../components/Dashboard';
import Transactions from '../components/Transactions';
import Accounts from '../components/Accounts';
import Settings from '../components/Settings';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import React from 'react';
import { useTheme } from '../../context/themeContext';

export default function MainPage() {
  const { user } = useContext(UserContext);
  const { darkMode } = useTheme();
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [pageView, setPageView] = useState('dashboard');
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-12-31');

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const { data: accData } = await axios.get(`/api/accounts/${user.id}`);
        setAccounts(accData.accounts ?? accData.response ?? []);

        const { data: transData } = await axios.get(
          `/api/transactions/${user.id}`,
          { params: { start_date: startDate, end_date: endDate } }
        );
        setTransactions(transData.transactions ?? transData.response ?? []);
      } catch (err) {
        console.error('Failed to fetch accounts/transactions', err);
        setAccounts([]);
        setTransactions([]);
      }
    };

    fetchData();
  }, [user, startDate, endDate]);

  return (
    <div
      className={`min-h-screen font-thin dark:bg-gray-900 dark:text-gray-100 bg-gray-100 text-gray-900`}
    >
      <div className='flex justify-between m-3 h-fit bg-gray-100 dark:bg-gray-900'>
        {/* Sidebar */}
        <Sidebar onViewChange={setPageView} />

        {/* Main Content */}
        <main
          className={
            ' flex-1 p-6 overflow-y-auto rounded-2xl dark:bg-teal-900 dark:text-gray-100 bg-teal-100 text-gray-900'
          }
        >
          {pageView === 'dashboard' && (
            <Dashboard accounts={accounts} transactions={transactions} />
          )}
          {pageView === 'accounts' && <Accounts accounts={accounts} />}
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
          {pageView === 'settings' && <Settings />}
        </main>
      </div>
    </div>
  );
}
