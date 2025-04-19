import React from 'react';
import { Users, TrendingUp, DollarSign } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';

export const AffiliatesPage: React.FC = () => {
  const mockAffiliates = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      status: 'active',
      earnings: 1234.56,
      conversions: 45
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael@example.com',
      status: 'active',
      earnings: 987.65,
      conversions: 32
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Affiliates</h1>
        <p className="mt-1 text-gray-600">Manage your affiliate partners</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <Users size={24} className="text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Affiliates</p>
                <p className="text-2xl font-semibold text-gray-900">24</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp size={24} className="text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Affiliates</p>
                <p className="text-2xl font-semibold text-gray-900">18</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <DollarSign size={24} className="text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Paid</p>
                <p className="text-2xl font-semibold text-gray-900">$12,345</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Affiliate Partners</h2>
          </div>
          
          <div className="space-y-4">
            {mockAffiliates.map(affiliate => (
              <div key={affiliate.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Avatar name={affiliate.name} size="md" />
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">{affiliate.name}</p>
                    <p className="text-sm text-gray-500">{affiliate.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Earnings</p>
                    <p className="font-medium text-gray-900">${affiliate.earnings.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Conversions</p>
                    <p className="font-medium text-gray-900">{affiliate.conversions}</p>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};