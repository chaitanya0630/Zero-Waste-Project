import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Leaf, Utensils, Brain, Heart, ArrowRight, Clock, User, Settings, Users } from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import DashboardStats from '@/components/dashboard/DashboardStats';

const Index = () => {
  const { isLoggedIn, userRole, userProfile } = useAuth();

  useEffect(() => {
    document.title = "ZeroWaste - AI-Powered Food Donation Platform";
  }, []);

  const renderDonorDashboard = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome, {userProfile?.first_name}!</h1>
        <p className="text-gray-600 mt-2">Track your donations and impact</p>
      </div>
      
      <DashboardStats 
        requestsCount={8}
        pendingRequestsCount={3}
        acceptedRequestsCount={5}
        peopleServed={150}
        foodSavedKg={75}
        co2SavedKg={25}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Donations</h3>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">Fresh Vegetables</h4>
                  <p className="text-sm text-gray-600">Quantity: 5kg</p>
                </div>
                <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">Active</span>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">Bread and Pastries</h4>
                  <p className="text-sm text-gray-600">Quantity: 3kg</p>
                </div>
                <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800">Pending</span>
              </div>
            </div>
          </div>
          <Button className="w-full mt-4" asChild>
            <Link to="/donate">New Donation</Link>
          </Button>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Impact Summary</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-blue-500 mr-2" />
                <span>People Helped</span>
              </div>
              <span className="font-semibold">150+</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Leaf className="h-5 w-5 text-green-500 mr-2" />
                <span>Food Saved</span>
              </div>
              <span className="font-semibold">75 kg</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderReceiverDashboard = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome, {userProfile?.first_name}!</h1>
        <p className="text-gray-600 mt-2">Find and request available food donations</p>
      </div>

      <DashboardStats 
        requestsCount={5}
        pendingRequestsCount={2}
        acceptedRequestsCount={3}
        peopleServed={75}
        foodSavedKg={45}
        co2SavedKg={15}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Available Donations Nearby</h3>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">Restaurant Surplus</h4>
                  <p className="text-sm text-gray-600">2.5 km away • Fresh Food</p>
                </div>
                <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">Available</span>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">Bakery Items</h4>
                  <p className="text-sm text-gray-600">1.8 km away • Fresh Food</p>
                </div>
                <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">Available</span>
              </div>
            </div>
          </div>
          <Button className="w-full mt-4" asChild>
            <Link to="/dashboard/geomap">View Map</Link>
          </Button>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">Pickup Completed</h4>
                  <p className="text-sm text-gray-600">Fresh vegetables • 3kg</p>
                </div>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">Request Sent</h4>
                  <p className="text-sm text-gray-600">Bread and pastries • 2kg</p>
                </div>
                <span className="text-sm text-gray-500">1 day ago</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  if (!isLoggedIn) {
    return (
      <Layout hideHeaderForGuests={true}>
        <section className="relative min-h-screen overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              className="w-full h-full object-cover" 
              src="/lovable-uploads/43d0ad50-d726-4c5b-aa10-736424bcee52.png" 
              alt="Food donation" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
          </div>
          
          <div className="relative z-10 flex items-center justify-center min-h-[80vh]">
            <div className="text-center max-w-4xl mx-auto px-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                <span className="block mb-2">Reduce Food Waste</span>
                <span className="text-zerowaste-primary">Feed Communities</span>
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Join our mission to reduce food waste and help those in need.
              </p>
              <Button 
                className="bg-zerowaste-primary hover:bg-zerowaste-primary/90 text-lg" 
                size="lg" 
                asChild
              >
                <Link to="/auth">Join Now</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white" id="how-it-works">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 section-fade-in">
              <h2 className="text-3xl font-bold text-gray-900">How ZeroWaste Works</h2>
              <p className="mt-3 max-w-2xl mx-auto text-gray-500">
                Our platform makes food donation simple, efficient, and impactful.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="card-hover border-2 border-transparent hover:border-zerowaste-primary/20 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-zerowaste-primary bg-opacity-10 w-12 h-12 flex items-center justify-center mb-4 mx-auto float-animation">
                    <Utensils className="h-6 w-6 text-zerowaste-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">Donate Surplus Food</h3>
                  <p className="text-gray-600 text-center">
                    Post your surplus food with AI-assisted quantity and type estimation. Set pickup information and location.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-hover border-2 border-transparent hover:border-zerowaste-secondary/20 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-zerowaste-secondary bg-opacity-10 w-12 h-12 flex items-center justify-center mb-4 mx-auto float-animation">
                    <MapPin className="h-6 w-6 text-zerowaste-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">Find Available Food</h3>
                  <p className="text-gray-600 text-center">
                    Browse our interactive map to find available donations near you. Request pickup with just a few clicks.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-hover border-2 border-transparent hover:border-zerowaste-accent/20 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-zerowaste-accent bg-opacity-10 w-12 h-12 flex items-center justify-center mb-4 mx-auto float-animation">
                    <Clock className="h-6 w-6 text-zerowaste-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">Complete Transaction</h3>
                  <p className="text-gray-600 text-center">
                    Coordinate pickup, confirm receipt, and provide feedback. Track your impact on reducing food waste.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white" id="about-us">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">About ZeroWaste</h2>
              <p className="mt-3 max-w-2xl mx-auto text-gray-500">
                We're on a mission to reduce food waste and hunger in communities worldwide.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-gray-600 mb-6">
                  At ZeroWaste, we believe that no good food should go to waste while people go hungry. Our platform connects those with surplus food to individuals and organizations that need it most.
                </p>
                <p className="text-gray-600">
                  Through technology and community engagement, we're building a world where excess food finds its way to those who need it, reducing waste and fighting hunger simultaneously.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="/lovable-uploads/6d2e9654-6c00-46b3-8fa6-be2f13a58429.png" 
                  alt="Food donation" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="bg-gradient-to-r from-zerowaste-primary to-zerowaste-success py-16 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 section-fade-in">
              <h2 className="text-3xl font-bold">Our Impact</h2>
              <p className="mt-2 max-w-2xl mx-auto">Together we're making a difference in our communities</p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center section-fade-in p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300">
                <p className="text-4xl font-bold">10,000+</p>
                <p className="mt-2">Kg of Food Saved</p>
              </div>
              <div className="text-center section-fade-in p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300">
                <p className="text-4xl font-bold">5,000+</p>
                <p className="mt-2">People Served</p>
              </div>
              <div className="text-center section-fade-in p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300">
                <p className="text-4xl font-bold">800+</p>
                <p className="mt-2">Active Donors</p>
              </div>
              <div className="text-center section-fade-in p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300">
                <p className="text-4xl font-bold">250+</p>
                <p className="mt-2">Partner Organizations</p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="rounded-lg bg-gradient-to-r from-zerowaste-accent/10 to-zerowaste-primary/10 p-10 shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-3xl font-bold text-gray-900 section-fade-in">Start Making a Difference Today</h2>
              <p className="mt-3 max-w-md mx-auto text-gray-600 section-fade-in">
                Together, we can reduce food waste and hunger in our communities.
              </p>
              <div className="mt-8 flex justify-center">
                <Button className="bg-zerowaste-primary text-white hover:bg-zerowaste-success hover-scale" size="lg" asChild>
                  <Link to="/auth">
                    <Heart className="mr-2 h-5 w-5" />
                    Join Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {userRole === 'donor' && renderDonorDashboard()}
      {userRole === 'receiver' && renderReceiverDashboard()}
      {userRole === 'admin' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <Button asChild>
              <Link to="/dashboard/admin">Go to Admin Dashboard</Link>
            </Button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Index;
