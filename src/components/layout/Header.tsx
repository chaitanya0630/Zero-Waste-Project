import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Home, MapPin, HelpCircle, User, LogIn, LogOut, Settings } from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import LogoIcon from './LogoIcon';
import { useToast } from '@/components/ui/use-toast';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType;
}

export default function Header() {
  const { isLoggedIn, userProfile, userRole, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      logout();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      navigate('/');
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  const baseNavigation: NavigationItem[] = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About Us', href: '/about', icon: HelpCircle },
    { name: 'How It Works', href: '/how-it-works', icon: HelpCircle },
  ];

  const donorNavigation: NavigationItem[] = [
    { name: 'Dashboard', href: '/', icon: Settings },
    { name: 'Donate', href: '/donate', icon: Settings },
    { name: 'About Us', href: '/about', icon: HelpCircle },
    { name: 'How It Works', href: '/how-it-works', icon: HelpCircle }
  ];

  const receiverNavigation: NavigationItem[] = [
    { name: 'Dashboard', href: '/', icon: Settings },
    { name: 'Find Food', href: '/map', icon: MapPin },
    { name: 'About Us', href: '/about', icon: HelpCircle },
    { name: 'How It Works', href: '/how-it-works', icon: HelpCircle }
  ];

  // 🛠️ Fix: Create navigation array based on user role
  const navigation: NavigationItem[] = userRole === 'donor'
    ? donorNavigation
    : userRole === 'receiver'
    ? receiverNavigation
    : baseNavigation;

  if (userRole === 'admin') {
    return null;
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <LogoIcon className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold text-gray-900">ZeroWaste</span>
            </Link>
            <nav className="hidden md:ml-8 md:flex md:space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-md ${
                    location.pathname === item.href
                      ? 'text-gray-900 bg-gray-100'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="mr-1.5 h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden md:ml-6 md:flex md:items-center">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userProfile?.avatar_url || ""} alt={userProfile?.first_name} />
                      <AvatarFallback>
                        {userProfile?.first_name?.[0] || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="font-medium">
                    {userProfile?.first_name} {userProfile?.last_name}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild className="ml-4">
                <Link to="/auth" className="flex items-center">
                  <LogIn className="mr-1 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
            )}
          </div>

          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  location.pathname === item.href
                    ? 'bg-gray-100 border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center">
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </div>
              </Link>
            ))}

            {!isLoggedIn && (
              <Link
                to="/auth"
                className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center">
                  <LogIn className="mr-3 h-5 w-5" />
                  Sign In
                </div>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
