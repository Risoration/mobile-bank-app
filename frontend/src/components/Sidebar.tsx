import React from 'react';
import {
  Building2,
  PieChart,
  FileText,
  Settings,
  ArrowLeftCircle,
  Building,
} from 'lucide-react';
import type { User } from '../../../shared/user';
import Button from './ui/Buttons/Button';

interface SidebarProps {
  user: User;
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
  return (
    <aside
      className='w-55 shadow-md p-4 flex flex-col items-center rounded-2xl h-screen mr-5
                 bg-gray-100 text-gray-900 dark:bg-slate-900 dark:text-white'
    >
      <nav className='flex flex-col w-full'>
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <Button
              key={item.id}
              variant='aside'
              className='text-center'
              onClick={() => onViewChange(item.id)}
            >
              <Icon className='w-5 h-5' />
              <span>{item.label}</span>
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}
