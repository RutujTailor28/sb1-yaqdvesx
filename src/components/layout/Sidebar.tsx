import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  LineChart, 
  Share2, 
  Users, 
  DollarSign, 
  Settings, 
  Bell, 
  HelpCircle,
  FolderOpen
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  if (!user) return null;
  
  const isActive = (path: string) => location.pathname === path;
  
  const merchantLinks = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <LayoutDashboard size={20} />
    },
    {
      name: 'Campaigns',
      path: '/campaigns',
      icon: <FolderOpen size={20} />
    },
    {
      name: 'Analytics',
      path: '/analytics',
      icon: <LineChart size={20} />
    },
    {
      name: 'Affiliates',
      path: '/affiliates',
      icon: <Users size={20} />
    },
    {
      name: 'Payouts',
      path: '/payouts',
      icon: <DollarSign size={20} />
    }
  ];
  
  const affiliateLinks = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <LayoutDashboard size={20} />
    },
    {
      name: 'My Links',
      path: '/my-links',
      icon: <Share2 size={20} />
    },
    {
      name: 'Analytics',
      path: '/analytics',
      icon: <LineChart size={20} />
    },
    {
      name: 'Earnings',
      path: '/earnings',
      icon: <DollarSign size={20} />
    }
  ];
  
  const navigationLinks = user.role === 'merchant' ? merchantLinks : affiliateLinks;
  
  return (
    <aside className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-gray-900 text-white">
      <div className="h-full flex flex-col">
        <div className="h-16 flex items-center px-4 border-b border-gray-800">
          <Link to="/" className="flex items-center">
            <div className="text-blue-400 mr-2">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
              </svg>
            </div>
            <span className="text-lg font-bold">AffiliateTrack</span>
          </Link>
        </div>
        
        <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigationLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`group flex items-center px-4 py-2 text-sm font-medium rounded-md transition duration-150 ease-in-out ${
                  isActive(item.path)
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <div className="mr-3 flex-shrink-0 text-gray-400 group-hover:text-gray-300">
                  {item.icon}
                </div>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="border-t border-gray-800 pt-4 pb-3">
          <div className="px-2 space-y-1">
            <Link
              to="/notifications"
              className="group flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition duration-150 ease-in-out"
            >
              <Bell size={20} className="mr-3 text-gray-400 group-hover:text-gray-300" />
              Notifications
            </Link>
            <Link
              to="/settings"
              className="group flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition duration-150 ease-in-out"
            >
              <Settings size={20} className="mr-3 text-gray-400 group-hover:text-gray-300" />
              Settings
            </Link>
            <Link
              to="/help"
              className="group flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition duration-150 ease-in-out"
            >
              <HelpCircle size={20} className="mr-3 text-gray-400 group-hover:text-gray-300" />
              Help &amp; Support
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};