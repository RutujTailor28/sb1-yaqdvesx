import React from 'react';
import { Plus } from 'lucide-react';
import { useData } from '../context/DataContext';
import { CampaignCard } from '../components/merchants/CampaignCard';
import { Button } from '../components/ui/Button';

export const CampaignsPage: React.FC = () => {
  const { campaigns, isLoading } = useData();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
          <p className="mt-1 text-gray-600">Manage your affiliate marketing campaigns</p>
        </div>
        <Button leftIcon={<Plus size={18} />}>
          Create Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map(campaign => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
};