import React, { useState } from 'react';
import { Mail, Lock, User, Building, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const { register, isLoading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'merchant' | 'affiliate'>('affiliate');
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      await register(name, email, password, role);
    } catch (err) {
      setError('Failed to create account. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Create an account</h2>
        <p className="mt-2 text-gray-600">Sign up to get started with AffiliateTrack</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <Input
          label="Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus
          leftIcon={<User size={18} />}
          placeholder="Your name"
        />
        
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          leftIcon={<Mail size={18} />}
          placeholder="you@example.com"
        />
        
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          leftIcon={<Lock size={18} />}
          placeholder="••••••••"
          helperText="Password must be at least 8 characters"
        />
        
        <Input
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          leftIcon={<Lock size={18} />}
          placeholder="••••••••"
        />
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            I am a:
          </label>
          <div className="mt-1 grid grid-cols-2 gap-3">
            <div 
              className={`relative border rounded-md px-6 py-4 flex items-center justify-center cursor-pointer focus:outline-none ${
                role === 'merchant'
                  ? 'bg-blue-50 border-blue-500'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setRole('merchant')}
            >
              <Building 
                size={20} 
                className={role === 'merchant' ? 'text-blue-500' : 'text-gray-400'} 
              />
              <span 
                className={`ml-2 text-sm font-medium ${
                  role === 'merchant' ? 'text-blue-900' : 'text-gray-900'
                }`}
              >
                Merchant
              </span>
            </div>
            <div 
              className={`relative border rounded-md px-6 py-4 flex items-center justify-center cursor-pointer focus:outline-none ${
                role === 'affiliate'
                  ? 'bg-blue-50 border-blue-500'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setRole('affiliate')}
            >
              <Users 
                size={20} 
                className={role === 'affiliate' ? 'text-blue-500' : 'text-gray-400'} 
              />
              <span 
                className={`ml-2 text-sm font-medium ${
                  role === 'affiliate' ? 'text-blue-900' : 'text-gray-900'
                }`}
              >
                Affiliate
              </span>
            </div>
          </div>
        </div>
        
        <div>
          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
          >
            Create Account
          </Button>
        </div>
      </form>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};