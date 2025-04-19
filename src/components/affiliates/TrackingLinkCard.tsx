import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy, ExternalLink, LineChart } from 'lucide-react';
import { TrackingLink } from '../../types';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';

interface TrackingLinkCardProps {
  trackingLink: TrackingLink;
  campaignName: string;
}

export const TrackingLinkCard: React.FC<TrackingLinkCardProps> = ({ 
  trackingLink, 
  campaignName 
}) => {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(trackingLink.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };
  
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  const getConversionRate = () => {
    if (trackingLink.clicks === 0) return '0%';
    return ((trackingLink.conversions / trackingLink.clicks) * 100).toFixed(2) + '%';
  };
  
  return (
    <Card hover>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-1">{campaignName}</h3>
        <p className="text-sm text-gray-500 mb-4">Created on {formatDate(trackingLink.createdAt)}</p>
        
        <div className="bg-gray-50 p-3 rounded-md mb-6 flex flex-col">
          <span className="text-xs text-gray-500 mb-1">Tracking URL</span>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700 truncate mr-2">{trackingLink.url}</span>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={copyToClipboard}
              leftIcon={<Copy size={14} />}
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-2">
          <div>
            <p className="text-xs text-gray-500">Clicks</p>
            <p className="text-lg font-semibold">{formatNumber(trackingLink.clicks)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Conversions</p>
            <p className="text-lg font-semibold">{formatNumber(trackingLink.conversions)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Conv. Rate</p>
            <p className="text-lg font-semibold">{getConversionRate()}</p>
          </div>
        </div>
        
        <div>
          <p className="text-xs text-gray-500">Revenue Generated</p>
          <p className="text-xl font-semibold text-gray-900">{formatCurrency(trackingLink.revenue)}</p>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center">
        <Button
          size="sm"
          variant="outline"
          leftIcon={<ExternalLink size={14} />}
          onClick={() => window.open(trackingLink.url, '_blank')}
        >
          Visit Link
        </Button>
        
        <Link
          to={`/my-links/${trackingLink.id}`}
          className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          <LineChart size={14} className="mr-1" />
          View Stats
        </Link>
      </CardFooter>
    </Card>
  );
};