
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import useAuth from '@/hooks/useAuth';

interface LayoutProps {
  children: ReactNode;
  requireAuth?: boolean;
  allowedRoles?: string[];
  hideHeaderForGuests?: boolean;
}

export default function Layout({ children, requireAuth = false, allowedRoles = [], hideHeaderForGuests = false }: LayoutProps) {
  const { isLoggedIn, loading, userRole } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If authentication is required but user is not logged in
    if (!loading && requireAuth && !isLoggedIn) {
      navigate('/auth');
    }
    
    // If specific roles are allowed and user doesn't have the required role
    if (!loading && isLoggedIn && allowedRoles.length > 0 && userRole && !allowedRoles.includes(userRole)) {
      // Redirect based on user role
      if (userRole === 'donor') {
        navigate('/dashboard/donor');
      } else if (userRole === 'receiver') {
        navigate('/dashboard/receiver');
      } else if (userRole === 'admin') {
        navigate('/dashboard/admin');
      } else {
        navigate('/');
      }
    }
  }, [isLoggedIn, loading, requireAuth, allowedRoles, userRole, navigate]);

  // Show nothing during initial auth check
  if (loading && requireAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zerowaste-primary"></div>
      </div>
    );
  }

  // For non-logged in users on pages where we want to hide the header
  if (!isLoggedIn && hideHeaderForGuests) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 bg-zerowaste-background">
          {children}
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-zerowaste-background">
        {children}
      </main>
      <Footer />
    </div>
  );
}
