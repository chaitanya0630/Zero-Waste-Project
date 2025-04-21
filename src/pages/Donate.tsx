
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import EnhancedDonationForm from '@/components/donations/EnhancedDonationForm';
import useAuth from '@/hooks/useAuth';

const DonatePage = () => {
  const { isLoggedIn, userRole, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Set page title
    document.title = "Donate Food - ZeroWaste";
    
    // Redirect if not logged in
    if (!loading && !isLoggedIn) {
      navigate('/auth');
    }
  }, [isLoggedIn, loading, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zerowaste-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Donate Surplus Food</h1>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Share your excess food with those in need. Our AI-powered system will help analyze and categorize your donation.
          </p>
        </div>

        <EnhancedDonationForm />
      </div>
    </Layout>
  );
};

export default DonatePage;
