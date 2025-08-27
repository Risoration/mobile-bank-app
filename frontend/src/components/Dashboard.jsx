import { useContext } from 'react';
import { Card, CardContent } from './ui/Card';
import { UserContext } from '../../context/userContext';
import Button from './ui/Button';

export default function Dashboard() {
  const { user } = useContext(UserContext);

  return (
    <div className='flex-1 p-6 overflow-y-auto bg-teal-800 rounded-2xl'>
      {/* Header */}
      <div className='flex flex-row justify-between'>
        <div>
          <div className='flex justify-center flex-col'>
            <h1 className='flex text-3xl text-white font-bold'>
              Welcome back, {user?.firstname || 'User'}!
            </h1>
          </div>
          <p className='text-gray-400'>Here's your financial overview</p>
        </div>
        <Button variant='register' className='flex h-fit'>
          + Account
        </Button>
      </div>
      <div>
        <Card>
          <CardContent>
            <h3>Income</h3>
            <p>£5,000</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3>Expenses</h3>
            <p>£3,000</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
