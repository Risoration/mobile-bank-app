import React, { useContext } from 'react';
import {
  Building2,
  PieChart,
  FileText,
  Settings,
  ArrowLeftCircle,
  Building,
} from 'lucide-react';
import Button from './ui/Buttons/Button';
import { UserContext } from '../../context/userContext';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  onUpgrade: () => void;
}

const navigation = [
  { id: 'dashboard', label: 'Dashboard', icon: Building },
  { id: 'accounts', label: 'Accounts', icon: Building2 },
  { id: 'transactions', label: 'Transactions', icon: ArrowLeftCircle },
  { id: 'budgets', label: 'Budgets', icon: PieChart, premium: true },
  { id: 'reports', label: 'Reports', icon: FileText, premium: true },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ onViewChange }) {
  const { user } = useContext(UserContext);
  return (
    <aside
      className='w-55 shadow-md p-4 flex flex-col items-center rounded-2xl h-screen mr-5
                 bg-[rgb(var(--color-theme-surface))] text-[color:rgb(var(--color-theme-text-primary))]'
    >
      <nav className='flex flex-col w-full'>
        {navigation.map((item) => {
          const Icon = item.icon;
          const isDisabled = item.premium && user?.subscriptionTier === 'free';

          return (
            <div
              key={item.id}
              className='relative group'
            >
              <span
                className='d-inline-block w-full'
                data-toggle='tooltip'
                title='Updade to Revolve Premium to access this feature'
              >
                <Button
                  variant={item.premium ? 'premium' : 'aside'}
                  className={`px-4 py-2 rounded ${
                    isDisabled ? 'pointer-events-none' : ''
                  }`}
                  onClick={() => onViewChange(item.id)}
                  disabled={isDisabled}
                >
                  <Icon className='w-5 h-5' />
                  <span>{item.label}</span>
                </Button>
              </span>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
