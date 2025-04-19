import React from 'react';
import { useData } from '../context/DataContext';
import { TrackingLinkCard } from '../components/affiliates/TrackingLinkCard';

export const MyLinksPage: React.FC = () => {
  const { trackingLinks, campaigns, isLoading } = useData();
  
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
        <h1 className="text-2xl font-bold text-gray-900">My Links</h1>
        <p className="mt-1 text-gray-600">Manage your affiliate tracking links</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trackingLinks.map(link => {
          const campaign = campaigns.find(c => c.id === link.campaignId);
          return (
            <TrackingLinkCard 
              key={link.id} 
              trackingLink={link} 
              campaignName={campaign?.name || 'Unknown Campaign'} 
            />
          );
        })}
      </div>
    </div>
  );
};