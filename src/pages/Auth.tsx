
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';
import useAuth from '@/hooks/useAuth';

const Auth = () => {
  const { isLoggedIn, userRole, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Sign In or Sign Up - ZeroWaste";
    if (!loading && isLoggedIn) {
      // Redirect based on user role
      switch(userRole) {
        case 'donor':
          navigate('/dashboard/donor');
          break;
        case 'receiver':
          navigate('/dashboard/receiver');
          break;
        case 'admin':
          navigate('/dashboard/admin');
          break;
        default:
          navigate('/');
      }
    }
  }, [isLoggedIn, loading, navigate, userRole]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zerowaste-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Background image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-10 z-0"
        style={{ backgroundImage: `url('/lovable-uploads/1143f05d-090d-4579-ada5-9ce35dd3e129.png')` }}
      ></div>
      
      <div className="relative z-10 w-full max-w-md p-8 mx-auto my-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome to ZeroWaste
          </h1>
          <p className="mt-2 text-gray-600">
            Join our community to reduce food waste and help those in need.
          </p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
