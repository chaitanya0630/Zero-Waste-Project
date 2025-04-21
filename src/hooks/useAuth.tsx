
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useAuthStore } from '@/lib/store';
import { UserRole } from '@/types';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  isLoggedIn: boolean;
  userId: string | null;
  userRole: UserRole | null;
  userProfile: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, userId, userRole, userProfile, setLoggedIn, setLoggedOut } = useAuthStore();

  useEffect(() => {
    const checkSession = async () => {
      try {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Session check error:', error);
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      let role: UserRole = 'donor';
      let profile = {
        first_name: 'Madhurima',
        last_name: '',
        avatar_url: null,
        organization_name: ''
      };
      
      // Set user role and profile based on email
      if (email.toLowerCase() === 'admin@zerowaste.org') {
        role = 'admin';
        profile.first_name = 'Chaitanya';
        profile.last_name = 'Gowri';
        profile.organization_name = 'ZeroWaste Admin';
      } else if (email.toLowerCase() === 'receiver@zerowaste.org') {
        role = 'receiver';
        profile.first_name = 'Tharun';
        profile.last_name = '';
        profile.organization_name = 'Food Bank NGO';
      } else if (email.toLowerCase() === 'donor1@zerowaste.org') {
        role = 'donor';
        profile.first_name = 'Madhurima';
        profile.last_name = '';
        profile.organization_name = 'Fresh Foods Restaurant';
      } else if (email.toLowerCase() === 'donor2@zerowaste.org') {
        role = 'donor';
        profile.first_name = 'Thanu';
        profile.last_name = 'Sree';
        profile.organization_name = 'Community Kitchen';
      }
      
      const userId = `demo-${Math.random().toString(36).substring(2, 15)}`;
      setLoggedIn(userId, role, profile);
      
      return { success: true, data: { user: { id: userId } } };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, data: { user: null, session: null } };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setLoggedOut();
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userId,
        userRole,
        userProfile,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };

export default function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
