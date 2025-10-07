import React, { useContext, useState } from 'react';
import {
  Building2,
  PieChart,
  FileText,
  ArrowLeftCircle,
  Building,
  Menu,
  X,
  Crown,
} from 'lucide-react';
import Button from './ui/Buttons/Button';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

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
  { id: 'pricing', label: 'Upgrade to Premium', icon: Crown },
];

export default function Sidebar({ activeView, onViewChange, onUpgrade }) {
  const { user } = useContext(UserContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleViewChange = (view) => {
    if (view === 'pricing') {
      onUpgrade();
    } else {
      onViewChange(view);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className='md:block w-55 shadow-md p-4 flex flex-col items-center rounded-2xl h-screen mr-5 bg-[rgb(var(--color-theme-surface))] text-[color:rgb(var(--color-theme-text-primary))]'>
        <nav className='flex flex-col w-full'>
          {navigation.map((item) => {
            const Icon = item.icon;
            const isDisabled =
              item.premium && user?.subscriptionTier === 'free';
            const isActive = activeView === item.id;

            return (
              <div key={item.id} className='relative group'>
                <span
                  className='d-inline-block w-full'
                  data-toggle='tooltip'
                  title={
                    isDisabled
                      ? 'Upgrade to Revolve Premium to access this feature'
                      : ''
                  }
                >
                  <Button
                    variant={
                      item.premium ? 'premium' : isActive ? 'primary' : 'aside'
                    }
                    className={`px-4 py-2 rounded transition-all duration-200 ${
                      isDisabled ? 'pointer-events-none opacity-50' : ''
                    } ${
                      isActive
                        ? 'ring-2 ring-[rgb(var(--color-theme-accent))]'
                        : ''
                    }`}
                    onClick={() => handleViewChange(item.id)}
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

      {/* Mobile Sidebar */}
      <div className='md:hidden'>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className='fixed top-16 left-4 z-50 p-2 bg-[rgb(var(--color-theme-surface))] rounded-lg shadow-md text-[color:rgb(var(--color-theme-text-primary))]'
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className='fixed inset-0 z-40 bg-black bg-opacity-50'
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div
              className='fixed left-0 top-0 h-full w-64 bg-[rgb(var(--color-theme-surface))] shadow-lg'
              onClick={(e) => e.stopPropagation()}
            >
              <div className='p-4 pt-16'>
                <nav className='flex flex-col space-y-2'>
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const isDisabled =
                      item.premium && user?.subscriptionTier === 'free';
                    const isActive = activeView === item.id;

                    return (
                      <Button
                        key={item.id}
                        variant={
                          item.premium
                            ? 'premium'
                            : isActive
                            ? 'primary'
                            : 'aside'
                        }
                        className={`w-full justify-between px-4 py-3 rounded transition-all duration-200 ${
                          isDisabled ? 'pointer-events-none opacity-50' : ''
                        } ${
                          isActive
                            ? 'ring-2 ring-[rgb(var(--color-theme-accent))]'
                            : ''
                        }`}
                        onClick={() => handleViewChange(item.id)}
                        disabled={isDisabled}
                      >
                        <Icon className='w-5 h-5 mr-3' />
                        <span>{item.label}</span>
                      </Button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
