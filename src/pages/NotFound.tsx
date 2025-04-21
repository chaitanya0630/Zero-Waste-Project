
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';

const NotFound = () => {
  useEffect(() => {
    // Set page title
    document.title = "Page Not Found - ZeroWaste";
  }, []);

  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-zerowaste-primary mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Oops! This page has been composted.</p>
          <Button className="bg-zerowaste-primary hover:bg-zerowaste-success" asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
