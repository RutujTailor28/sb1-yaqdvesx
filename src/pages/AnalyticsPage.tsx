import React from 'react';
import { LineChart, BarChart, DollarSign, Users } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Card, CardContent } from '../components/ui/Card';
import { StatCards } from '../components/dashboard/StatCards';

export const AnalyticsPage: React.FC = () => {
  const { analytics, isLoading } = useData();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="mt-1 text-gray-600">Track your performance metrics and insights</p>
      </div>

      <StatCards analytics={analytics} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
              <LineChart className="text-gray-400" size={20} />
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">Revenue chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Conversion Rate</h3>
              <BarChart className="text-gray-400" size={20} />
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">Conversion chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Top Performers</h3>
              <Users className="text-gray-400" size={20} />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users size={16} className="text-blue-600" />
                  </div>
                  <span className="ml-3 font-medium">Affiliate 1</span>
                </div>
                <span className="text-green-600 font-medium">$1,234</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users size={16} className="text-blue-600" />
                  </div>
                  <span className="ml-3 font-medium">Affiliate 2</span>
                </div>
                <span className="text-green-600 font-medium">$987</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Revenue by Campaign</h3>
              <DollarSign className="text-gray-400" size={20} />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Summer Sale 2025</span>
                <span className="text-green-600 font-medium">$2,345</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">New Product Launch</span>
                <span className="text-green-600 font-medium">$1,678</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};