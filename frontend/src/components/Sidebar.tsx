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
import { useTheme } from '../../context/themeContext';

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
      className={`w-42 shadow-md p-4 flex flex-col items-center
                  rounded-2xl h-screen mr-5 dark:bg-gray-900 dark:text-gray-100
                bg-gray-100 text-gray-900
                `}
    >
      <nav className='flex flex-col w-full'>
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex items-center gap-2 w-full mb-4 px-4 py-3
                          rounded-2xl font-medium cursor-pointer
                        bg-gray-200 hover:bg-teal-200
                        text-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-teal-700
                      `}
            >
              <Icon className='w-5 h-5' />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
