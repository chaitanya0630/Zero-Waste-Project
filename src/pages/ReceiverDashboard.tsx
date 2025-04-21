
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import DashboardStats from '@/components/dashboard/DashboardStats';
import RequestsList from '@/components/dashboard/RequestsList';
import DonationsList from '@/components/dashboard/DonationsList';
import useAuth from '@/hooks/useAuth';
import { Request, Donation } from '@/types';
import { supabase } from '@/integrations/supabase/client';

const ReceiverDashboard = () => {
  const { userRole, userId, isLoggedIn, loading } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<Request[]>([]);
  const [availableDonations, setAvailableDonations] = useState<Donation[]>([]);
  const [stats, setStats] = useState({
    requestsCount: 0,
    pendingRequestsCount: 0,
    acceptedRequestsCount: 0,
  });

  useEffect(() => {
    document.title = "Receiver Dashboard - ZeroWaste";
    
    // Redirect if not logged in or not a receiver
    if (!loading && (!isLoggedIn || userRole !== 'receiver')) {
      navigate('/auth');
    }
    
    if (isLoggedIn && userId && userRole === 'receiver') {
      fetchReceiverData(userId);
    }
  }, [isLoggedIn, userId, userRole, loading, navigate]);

  const fetchReceiverData = async (receiverId: string) => {
    // Fetch requests made by this receiver
    const { data: requestsData } = await supabase
      .from('requests')
      .select(`
        *,
        donations:donation_id(*),
        profiles:receiver_id(*)
      `)
      .eq('receiver_id', receiverId);
    
    if (requestsData) {
      setRequests(requestsData as unknown as Request[]);
      
      // Calculate stats
      setStats({
        requestsCount: requestsData.length,
        pendingRequestsCount: requestsData.filter(r => r.status === 'pending').length,
        acceptedRequestsCount: requestsData.filter(r => r.status === 'accepted').length,
      });
    }
    
    // Fetch available donations
    const { data: donationsData } = await supabase
      .from('donations')
      .select(`
        *,
        profiles:donor_id(*)
      `)
      .eq('status', 'pending');
    
    if (donationsData) {
      // Convert JSON data to match our type structure
      const typedDonations = donationsData.map(d => ({
        ...d,
        food_details: d.food_details as unknown as Donation["food_details"],
        location: d.location as unknown as Donation["location"]
      }));
      
      setAvailableDonations(typedDonations);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zerowaste-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!isLoggedIn || userRole !== 'receiver') {
    return null; // Will redirect in useEffect
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8 fade-in">Receiver Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 fade-in">
          <DashboardStats 
            requestsCount={stats.requestsCount}
            pendingRequestsCount={stats.pendingRequestsCount}
            acceptedRequestsCount={stats.acceptedRequestsCount}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="fade-in">
            <h2 className="text-2xl font-bold mb-4">My Requests</h2>
            <RequestsList requests={requests} />
          </div>
          <div className="fade-in">
            <h2 className="text-2xl font-bold mb-4">Available Food</h2>
            <DonationsList 
              donations={availableDonations} 
              receiverId={userId as string}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReceiverDashboard;
