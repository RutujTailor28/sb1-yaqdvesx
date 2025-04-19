export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'merchant' | 'affiliate';
  createdAt: Date;
}

export interface Campaign {
  id: string;
  merchantId: string;
  name: string;
  description: string;
  commission: {
    type: 'percentage' | 'fixed';
    value: number;
  };
  status: 'active' | 'paused' | 'ended';
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TrackingLink {
  id: string;
  campaignId: string;
  affiliateId: string;
  url: string;
  shortCode: string;
  createdAt: Date;
  clicks: number;
  conversions: number;
  revenue: number;
}

export interface Conversion {
  id: string;
  trackingLinkId: string;
  campaignId: string;
  affiliateId: string;
  merchantId: string;
  amount: number;
  commission: number;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  createdAt: Date;
}

export interface Analytics {
  clicks: number;
  conversions: number;
  conversionRate: number;
  revenue: number;
  commission: number;
  periodComparison?: {
    clicks: number;
    conversions: number;
    revenue: number;
    commission: number;
  };
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  type: 'conversion' | 'payment' | 'campaign' | 'system';
}