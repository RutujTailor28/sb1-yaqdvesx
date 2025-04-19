import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, DollarSign } from 'lucide-react';
import { Campaign } from '../../types';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface CampaignCardProps {
  campaign: Campaign;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  const statusColors = {
    active: 'success',
    paused: 'warning',
    ended: 'danger'
  } as const;
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };
  
  const formatCommission = () => {
    if (campaign.commission.type === 'percentage') {
      return `${campaign.commission.value}%`;
    } else {
      return `$${campaign.commission.value}`;
    }
  };
  
  return (
    <Card hover>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{campaign.name}</h3>
          <Badge 
            variant={statusColors[campaign.status]}
            className="capitalize"
          >
            {campaign.status}
          </Badge>
        </div>
        
        <p className="text-gray-600 mb-6">{campaign.description}</p>
        
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-500">
            <DollarSign size={16} className="mr-2 text-gray-400" />
            <span>Commission: {formatCommission()}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={16} className="mr-2 text-gray-400" />
            <span>Start date: {formatDate(campaign.startDate)}</span>
          </div>
          
          {campaign.endDate && (
            <div className="flex items-center text-sm text-gray-500">
              <Calendar size={16} className="mr-2 text-gray-400" />
              <span>End date: {formatDate(campaign.endDate)}</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 flex justify-between items-center">
        <div className="flex items-center text-sm text-gray-500">
          <Users size={16} className="mr-1 text-gray-400" />
          <span>5 affiliates</span>
        </div>
        
        <Link
          to={`/campaigns/${campaign.id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
};