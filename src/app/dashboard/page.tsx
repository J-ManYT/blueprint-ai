// src/app/dashboard/page.tsx
'use client';
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  id: string;
  email: string;
  essays_used_this_month: number;
  subscription_status: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkUser = useCallback(async () => {
    try {
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
      
      console.log('Auth user:', authUser);
      console.log('Auth error:', authError);
      
      if (authError) {
        console.error('Auth error:', authError);
        router.push('/auth/login');
        return;
      }

      if (!authUser) {
        console.log('No authenticated user found');
        router.push('/auth/login');
        return;
      }

      // Get user data from our users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single();

      console.log('User data:', userData);
      console.log('User error:', userError);

      if (userError && userError.code !== 'PGRST116') {
        // PGRST116 = "not found" error, which is fine - we'll create the user
        console.error('Database error:', userError);
        throw userError;
      }

      if (!userData) {
        console.log('Creating new user record...');
        // Create user record if it doesn't exist
        const { data: newUser, error: insertError } = await supabase
          .from('users')
          .insert([
            {
              id: authUser.id,
              email: authUser.email!,
              essays_used_this_month: 0,
              subscription_status: 'free'
            }
          ])
          .select()
          .single();

        if (insertError) {
          console.error('Insert error:', insertError);
          throw insertError;
        }
        
        console.log('New user created:', newUser);
        setUser(newUser);
      } else {
        console.log('Existing user found:', userData);
        setUser(userData);
      }
    } catch (error) {
      console.error('CheckUser error:', error);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading user data...</p>
        </div>
      </div>
    );
  }

  const essaysRemaining = user?.subscription_status === 'premium' ? '∞' : Math.max(0, 3 - (user?.essays_used_this_month || 0));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Blueprint.AI Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Section */}
          <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
            <div className="px-6 py-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Welcome back, {user?.email}!
              </h2>
              <p className="text-gray-600">
                Ready to get feedback on your college essays?
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                      <span className="text-blue-600 font-bold">{essaysRemaining}</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Essays Remaining</p>
                    <p className="text-xs text-gray-400">This month</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                      <span className="text-green-600 font-bold">{user?.essays_used_this_month || 0}</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Essays Reviewed</p>
                    <p className="text-xs text-gray-400">This month</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center ${
                      user?.subscription_status === 'premium' ? 'bg-purple-100' : 'bg-gray-100'
                    }`}>
                      <span className={`font-bold text-xs ${
                        user?.subscription_status === 'premium' ? 'text-purple-600' : 'text-gray-600'
                      }`}>
                        {user?.subscription_status === 'premium' ? 'PRO' : 'FREE'}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Plan</p>
                    <p className="text-xs text-gray-400">
                      {user?.subscription_status === 'premium' ? 'Premium' : 'Free'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-4">
                <Link href="/essay-feedback">
                  <button className="w-full bg-[#0F2D52] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#1a4a7a] transition-colors">
                    Submit New Essay for Review
                  </button>
                </Link>
                
                {user?.subscription_status === 'free' && (
                  <button className="w-full border-2 border-blue-600 text-blue-600 py-3 px-4 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                    Upgrade to Premium - Unlimited Essays
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}