import React from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { StatCards } from '../components/dashboard/StatCards';
import { ConversionTable } from '../components/affiliates/ConversionTable';
import { CampaignCard } from '../components/merchants/CampaignCard';
import { TrackingLinkCard } from '../components/affiliates/TrackingLinkCard';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { analytics, campaigns, trackingLinks, conversions, isLoading } = useData();
  
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
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-gray-600">
          {user?.role === 'merchant'
            ? 'Monitor your affiliate marketing campaigns'
            : 'Track your affiliate marketing performance'}
        </p>
      </div>
      
      <StatCards analytics={analytics} />
      
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {user?.role === 'merchant' ? 'Recent Campaigns' : 'Your Active Links'}
        </h2>
        
        {user?.role === 'merchant' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.slice(0, 3).map(campaign => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        ) : (
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
        )}
      </div>
      
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Recent Conversions
        </h2>
        <ConversionTable conversions={conversions.slice(0, 5)} />
      </div>
    </div>
  );
};