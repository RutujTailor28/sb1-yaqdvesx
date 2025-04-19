import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { AppLayout } from './components/layout/AppLayout';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { CampaignsPage } from './pages/CampaignsPage';
import { AffiliatesPage } from './pages/AffiliatesPage';
import { PayoutsPage } from './pages/PayoutsPage';
import { MyLinksPage } from './pages/MyLinksPage';
import { EarningsPage } from './pages/EarningsPage';
import { NotFoundPage } from './pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="campaigns" element={<CampaignsPage />} />
              <Route path="affiliates" element={<AffiliatesPage />} />
              <Route path="payouts" element={<PayoutsPage />} />
              <Route path="my-links" element={<MyLinksPage />} />
              <Route path="earnings" element={<EarningsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;