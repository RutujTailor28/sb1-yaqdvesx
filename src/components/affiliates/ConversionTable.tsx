import React from 'react';
import { Clock, Check, X, AlertTriangle } from 'lucide-react';
import { Conversion } from '../../types';
import { DataTable } from '../ui/DataTable';
import { Badge } from '../ui/Badge';

interface ConversionTableProps {
  conversions: Conversion[];
  isLoading?: boolean;
}

export const ConversionTable: React.FC<ConversionTableProps> = ({ 
  conversions, 
  isLoading = false 
}) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  const statusBadge = (status: Conversion['status']) => {
    const statusConfig = {
      pending: { variant: 'warning', icon: <AlertTriangle size={12} className="mr-1" /> },
      approved: { variant: 'success', icon: <Check size={12} className="mr-1" /> },
      rejected: { variant: 'danger', icon: <X size={12} className="mr-1" /> },
      paid: { variant: 'primary', icon: <Clock size={12} className="mr-1" /> }
    } as const;
    
    const config = statusConfig[status];
    
    return (
      <Badge variant={config.variant} className="flex items-center">
        {config.icon}
        <span className="capitalize">{status}</span>
      </Badge>
    );
  };
  
  const columns = [
    {
      header: 'Date',
      accessor: (conversion: Conversion) => formatDate(conversion.createdAt)
    },
    {
      header: 'Order Amount',
      accessor: (conversion: Conversion) => formatCurrency(conversion.amount)
    },
    {
      header: 'Commission',
      accessor: (conversion: Conversion) => formatCurrency(conversion.commission)
    },
    {
      header: 'Status',
      accessor: (conversion: Conversion) => statusBadge(conversion.status)
    }
  ];
  
  return (
    <DataTable
      data={conversions}
      columns={columns}
      keyExtractor={(conversion) => conversion.id}
      isLoading={isLoading}
      emptyMessage="No conversions recorded yet"
    />
  );
};