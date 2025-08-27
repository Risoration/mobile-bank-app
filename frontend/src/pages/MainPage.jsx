import Button from '../components/ui/Button';
import { ArrowDownCircle, CreditCard, SettingsIcon, Crown } from 'lucide-react';
import '../index.css';
import { ChartNoAxesCombined } from 'lucide-react';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';
import Dashboard from '../components/Dashboard';
import Transactions from '../components/Transactions';
import Accounts from '../components/Accounts';
import Settings from '../components/Settings';

export default function MainPage() {
  const { user } = useContext(UserContext);
  const [pageView, setPageView] = useState('dashboard');

  return (
    <div className='font-thin'>
      <div className='flex m-5 h-screen bg-black'>
        {/* Sidebar */}
        <aside className='w-42 shadow-md p-4 flex flex-col items-center rounded-2xl h-screen mr-5'>
          <nav>
            <Button
              variant='aside'
              className='flex justify-between text-end mb-10'
              onClick={() => setPageView('dashboard')}
            >
              <ChartNoAxesCombined className='mr-2' />
              Dashboard
            </Button>
            <Button
              variant='aside'
              className='flex justify-between text-end mb-10'
              onClick={() => setPageView('accounts')}
            >
              <CreditCard className='mr-2' />
              Accounts
            </Button>
            <Button
              variant='aside'
              className='flex justify-between text-start mb-10 focus:'
              onClick={() => setPageView('transactions')}
            >
              <ArrowDownCircle className='mr-2' />
              Transactions
            </Button>
            <Button
              variant='aside'
              className='flex justify-between text-start mb-10'
              onClick={() => setPageView('settings')}
            >
              <SettingsIcon className='mr-2' />
              Settings
            </Button>
            <Button variant='premium' className=''>
              <Crown className='mr-2' />
              Upgrade to Premium
            </Button>
          </nav>
        </aside>
        {/* Main Content */}
        <main className='flex-1 p-6 overflow-y-auto bg-teal-800 rounded-2xl'>
          {pageView === 'dashboard' && <Dashboard />}
          {pageView === 'accounts' && <Accounts />}
          {pageView === 'transactions' && <Transactions />}
          {pageView === 'payments' && <Payments />}
          {pageView === 'settings' && <Settings />}
        </main>
      </div>
    </div>
  );
}
