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
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function MainPage() {
  const { user, loading } = useContext(UserContext);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-12-31');

  // Get current tab from URL or default to 'dashboard'
  const currentTab = searchParams.get('tab') || 'dashboard';

  // Function to handle tab changes
  const handleTabChange = (tab: string) => {
    setSearchParams({ tab });
  };

  // Redirect to default tab if no tab is specified
  useEffect(() => {
    if (!searchParams.get('tab')) {
      setSearchParams({ tab: 'dashboard' }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

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

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className='h-full font-thin bg-[rgb(var(--color-theme-background))] text-[color:rgb(var(--color-theme-text-primary))] flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4'></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to home if no user (not authenticated)
  if (!user) {
    window.location.href = '/';
    return null;
  }

  return (
    <div className='h-full font-thin bg-[rgb(var(--color-theme-background))] text-[color:rgb(var(--color-theme-text-primary))]'>
      <div className='flex flex-col md:flex-row justify-between m-3 h-fit bg-[rgb(var(--color-theme-background))]'>
        {/* Sidebar */}
        <Sidebar
          activeView={currentTab}
          onViewChange={handleTabChange}
          onUpgrade={() => navigate('/pricing')}
        />

        {/* Main Content */}
        <main className='flex-1 p-3 md:p-6 overflow-y-auto rounded-2xl bg-[rgb(var(--color-theme-surface))] text-[color:rgb(var(--color-theme-text-primary))] mb-2 md:ml-0'>
          {currentTab === 'dashboard' && (
            <Dashboard accounts={accounts} transactions={transactions} />
          )}
          {currentTab === 'accounts' && (
            <Accounts accounts={accounts} onAccountsUpdate={fetchData} />
          )}
          {currentTab === 'transactions' && (
            <Transactions
              transactions={transactions}
              accounts={accounts}
              startDate={startDate}
              endDate={endDate}
              onChangeDateRange={(s, e) => {
                setStartDate(s);
                setEndDate(e);
              }}
            />
          )}
          {currentTab === 'budgets' && <Budgets />}
          {currentTab === 'reports' && (
            <div className='p-8 text-center'>
              <h2 className='text-2xl font-bold mb-4'>Reports</h2>
              <p className='text-[color:rgb(var(--color-theme-text-secondary))]'>
                Reports feature coming soon!
              </p>
            </div>
          )}
          {currentTab === 'settings' && <Settings />}
        </main>
      </div>
    </div>
  );
}
