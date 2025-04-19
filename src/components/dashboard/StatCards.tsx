import React from 'react';
import { DollarSign, Users, MousePointer, ShoppingCart } from 'lucide-react';
import { Stat } from '../ui/Stat';
import { Analytics } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface StatCardsProps {
  analytics: Analytics;
}

export const StatCards: React.FC<StatCardsProps> = ({ analytics }) => {
  const { user } = useAuth();
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };
  
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };
  
  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value / 100);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Stat
        title="Total Clicks"
        value={formatNumber(analytics.clicks)}
        icon={<MousePointer size={24} />}
      />
      
      <Stat
        title="Conversions"
        value={formatNumber(analytics.conversions)}
        icon={<ShoppingCart size={24} />}
        trend={{
          value: 12.5,
          isPositive: true
        }}
      />
      
      <Stat
        title={user?.role === 'merchant' ? 'Total Revenue' : 'Total Earnings'}
        value={formatCurrency(user?.role === 'merchant' ? analytics.revenue : analytics.commission)}
        icon={<DollarSign size={24} />}
        trend={{
          value: 8.2,
          isPositive: true
        }}
      />
      
      <Stat
        title="Conversion Rate"
        value={formatPercentage(analytics.conversionRate)}
        icon={<Users size={24} />}
        trend={{
          value: 3.1,
          isPositive: false
        }}
      />
    </div>
  );
};