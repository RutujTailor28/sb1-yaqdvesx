import React from 'react';
import { DollarSign, Calendar, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const PayoutsPage: React.FC = () => {
  const mockPayouts = [
    {
      id: '1',
      affiliate: 'Sarah Johnson',
      amount: 534.21,
      status: 'completed',
      date: '2025-03-15'
    },
    {
      id: '2',
      affiliate: 'Michael Chen',
      amount: 289.45,
      status: 'pending',
      date: '2025-03-14'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payouts</h1>
        <p className="mt-1 text-gray-600">Manage affiliate payments and transactions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <DollarSign size={24} className="text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Paid</p>
                <p className="text-2xl font-semibold text-gray-900">$12,345</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock size={24} className="text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-2xl font-semibold text-gray-900">$2,789</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <Calendar size={24} className="text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Next Payout</p>
                <p className="text-2xl font-semibold text-gray-900">Mar 31</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Payouts</h2>
            <Button variant="outline" leftIcon={<DollarSign size={18} />}>
              Process Payouts
            </Button>
          </div>
          
          <div className="space-y-4">
            {mockPayouts.map(payout => (
              <div key={payout.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <DollarSign size={20} className="text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">{payout.affiliate}</p>
                    <p className="text-sm text-gray-500">{payout.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="font-medium text-gray-900">${payout.amount.toFixed(2)}</p>
                  <Badge
                    variant={payout.status === 'completed' ? 'success' : 'warning'}
                    leftIcon={payout.status === 'completed' ? <CheckCircle size={14} /> : <Clock size={14} />}
                  >
                    {payout.status === 'completed' ? 'Completed' : 'Pending'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};