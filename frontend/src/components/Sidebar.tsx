import React from 'react';
import Button from './ui/Button';
import {
  Building2,
  ArrowLeftRight,
  PieChart,
  FileText,
  Crown,
  ChartNoAxesCombined,
  CreditCard,
  ArrowDownCircle,
  Settings,
  ArrowLeftCircle,
  Building,
} from 'lucide-react';

import type { User } from '../../../shared/user';
import { cn } from '../lib/utils';

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

export default function Sidebar({ user, activeView, onViewChange, onUpgrade }) {
  return (
    <aside className='w-42 shadow-md p-4 flex flex-col items-center rounded-2xl h-screen mr-5'>
      <nav>
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          const isPremiumFeature =
            item.premium && user.subscriptionTier === 'free';

          return (
            <Button
              key={item.id}
              onClick={() => !isPremiumFeature && onViewChange(item.id)}
              variant='primary'
              className={cn(
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : isPremiumFeature
                  ? 'text-slate-400 cursor-not-allowed'
                  : 'text-slate-600 hover:bg-slate-50'
              )}
            ></Button>
          );
        })}
      </nav>
    </aside>
  );
}
