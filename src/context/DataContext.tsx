import React, { createContext, useContext, useState, useEffect } from 'react';
import { Campaign, TrackingLink, Conversion, Analytics, Notification } from '../types';
import { useAuth } from './AuthContext';

interface DataContextType {
  campaigns: Campaign[];
  trackingLinks: TrackingLink[];
  conversions: Conversion[];
  notifications: Notification[];
  analytics: Analytics;
  isLoading: boolean;
  createCampaign: (campaign: Omit<Campaign, 'id' | 'merchantId' | 'createdAt' | 'updatedAt'>) => Promise<Campaign>;
  updateCampaign: (id: string, updates: Partial<Campaign>) => Promise<Campaign>;
  createTrackingLink: (campaignId: string) => Promise<TrackingLink>;
  markNotificationAsRead: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Mock data
const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-1',
    merchantId: '1',
    name: 'Summer Sale 2025',
    description: 'Promote our summer collection with special discounts',
    commission: { type: 'percentage', value: 10 },
    status: 'active',
    startDate: new Date('2025-06-01'),
    endDate: new Date('2025-08-31'),
    createdAt: new Date('2025-05-15'),
    updatedAt: new Date('2025-05-15')
  },
  {
    id: 'camp-2',
    merchantId: '1',
    name: 'New Product Launch',
    description: 'Help us promote our latest flagship product',
    commission: { type: 'fixed', value: 25 },
    status: 'active',
    startDate: new Date('2025-07-01'),
    createdAt: new Date('2025-06-15'),
    updatedAt: new Date('2025-06-15')
  }
];

const MOCK_TRACKING_LINKS: TrackingLink[] = [
  {
    id: 'link-1',
    campaignId: 'camp-1',
    affiliateId: '2',
    url: 'https://example.com/product?ref=aff123',
    shortCode: 'aff123',
    createdAt: new Date('2025-06-02'),
    clicks: 156,
    conversions: 23,
    revenue: 2760
  },
  {
    id: 'link-2',
    campaignId: 'camp-2',
    affiliateId: '2',
    url: 'https://example.com/new?ref=aff456',
    shortCode: 'aff456',
    createdAt: new Date('2025-07-05'),
    clicks: 89,
    conversions: 12,
    revenue: 1450
  }
];

const MOCK_CONVERSIONS: Conversion[] = [
  {
    id: 'conv-1',
    trackingLinkId: 'link-1',
    campaignId: 'camp-1',
    affiliateId: '2',
    merchantId: '1',
    amount: 120,
    commission: 12,
    status: 'approved',
    createdAt: new Date('2025-06-10')
  },
  {
    id: 'conv-2',
    trackingLinkId: 'link-1',
    campaignId: 'camp-1',
    affiliateId: '2',
    merchantId: '1',
    amount: 85,
    commission: 8.5,
    status: 'approved',
    createdAt: new Date('2025-06-12')
  }
];

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    userId: '2',
    title: 'New Conversion',
    message: 'You earned $12 from a new conversion!',
    read: false,
    createdAt: new Date('2025-06-10'),
    type: 'conversion'
  },
  {
    id: 'notif-2',
    userId: '1',
    title: 'New Affiliate Signup',
    message: 'A new affiliate has joined your campaign',
    read: true,
    createdAt: new Date('2025-06-05'),
    type: 'system'
  }
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [trackingLinks, setTrackingLinks] = useState<TrackingLink[]>([]);
  const [conversions, setConversions] = useState<Conversion[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [analytics, setAnalytics] = useState<Analytics>({
    clicks: 0,
    conversions: 0,
    conversionRate: 0,
    revenue: 0,
    commission: 0
  });

  useEffect(() => {
    if (!user) return;
    
    // Simulate API call to fetch data
    const loadData = async () => {
      setIsLoading(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Filter data based on user role
        if (user.role === 'merchant') {
          setCampaigns(MOCK_CAMPAIGNS.filter(c => c.merchantId === user.id));
          const merchantTrackingLinks = MOCK_TRACKING_LINKS.filter(
            link => MOCK_CAMPAIGNS.some(c => c.id === link.campaignId && c.merchantId === user.id)
          );
          setTrackingLinks(merchantTrackingLinks);
          setConversions(MOCK_CONVERSIONS.filter(c => c.merchantId === user.id));
        } else {
          // Affiliate view
          setCampaigns(MOCK_CAMPAIGNS);
          setTrackingLinks(MOCK_TRACKING_LINKS.filter(t => t.affiliateId === user.id));
          setConversions(MOCK_CONVERSIONS.filter(c => c.affiliateId === user.id));
        }
        
        setNotifications(MOCK_NOTIFICATIONS.filter(n => n.userId === user.id));
        
        // Calculate analytics
        const userLinks = user.role === 'affiliate' 
          ? MOCK_TRACKING_LINKS.filter(t => t.affiliateId === user.id)
          : MOCK_TRACKING_LINKS.filter(
              link => MOCK_CAMPAIGNS.some(c => c.id === link.campaignId && c.merchantId === user.id)
            );
            
        const userConversions = user.role === 'affiliate'
          ? MOCK_CONVERSIONS.filter(c => c.affiliateId === user.id)
          : MOCK_CONVERSIONS.filter(c => c.merchantId === user.id);
        
        const totalClicks = userLinks.reduce((sum, link) => sum + link.clicks, 0);
        const totalConversions = userConversions.length;
        const totalRevenue = userLinks.reduce((sum, link) => sum + link.revenue, 0);
        const totalCommission = userConversions.reduce((sum, conv) => sum + conv.commission, 0);
        
        setAnalytics({
          clicks: totalClicks,
          conversions: totalConversions,
          conversionRate: totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0,
          revenue: totalRevenue,
          commission: totalCommission
        });
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [user]);

  const createCampaign = async (campaignData: Omit<Campaign, 'id' | 'merchantId' | 'createdAt' | 'updatedAt'>) => {
    if (!user || user.role !== 'merchant') {
      throw new Error('Only merchants can create campaigns');
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newCampaign: Campaign = {
      ...campaignData,
      id: `camp-${Date.now()}`,
      merchantId: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setCampaigns(prev => [...prev, newCampaign]);
    return newCampaign;
  };

  const updateCampaign = async (id: string, updates: Partial<Campaign>) => {
    if (!user || user.role !== 'merchant') {
      throw new Error('Only merchants can update campaigns');
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let updatedCampaign: Campaign | undefined;
    
    setCampaigns(prev => 
      prev.map(camp => {
        if (camp.id === id) {
          updatedCampaign = {
            ...camp,
            ...updates,
            updatedAt: new Date()
          };
          return updatedCampaign;
        }
        return camp;
      })
    );
    
    if (!updatedCampaign) {
      throw new Error('Campaign not found');
    }
    
    return updatedCampaign;
  };

  const createTrackingLink = async (campaignId: string) => {
    if (!user || user.role !== 'affiliate') {
      throw new Error('Only affiliates can create tracking links');
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Generate a random short code
    const shortCode = `aff${Math.floor(Math.random() * 1000)}${Date.now().toString().slice(-4)}`;
    
    const newLink: TrackingLink = {
      id: `link-${Date.now()}`,
      campaignId,
      affiliateId: user.id,
      url: `https://example.com/product?ref=${shortCode}`,
      shortCode,
      createdAt: new Date(),
      clicks: 0,
      conversions: 0,
      revenue: 0
    };
    
    setTrackingLinks(prev => [...prev, newLink]);
    return newLink;
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  return (
    <DataContext.Provider value={{
      campaigns,
      trackingLinks,
      conversions,
      notifications,
      analytics,
      isLoading,
      createCampaign,
      updateCampaign,
      createTrackingLink,
      markNotificationAsRead
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};