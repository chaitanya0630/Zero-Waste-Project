
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import useAuth from '@/hooks/useAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Leaf, Scale, User, Users } from 'lucide-react';

const Profile = () => {
  const { isLoggedIn, userProfile, loading, userRole, userId } = useAuth();
  const navigate = useNavigate();
  
  // Mock data for demo
  const [stats, setStats] = useState({
    donationsCount: 12,
    requestsCount: 5,
    foodSavedKg: 74.2,
    co2SavedKg: 163.24,
    peopleServed: 48
  });
  
  // Mock donations data for demo
  const [donations, setDonations] = useState([
    {
      id: '1',
      title: 'Fresh Vegetables Assortment',
      status: 'pending',
      created_at: '2025-04-16T10:30:00Z',
      food_details: { quantity: 5, quantity_unit: 'kg', type: 'Vegetables', is_vegetarian: true },
      image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: '2',
      title: 'Bread and Pastry Selection',
      status: 'accepted',
      created_at: '2025-04-15T14:20:00Z',
      food_details: { quantity: 2, quantity_unit: 'kg', type: 'Bakery', is_vegetarian: true },
      image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: '3',
      title: 'Cooked Rice and Curry',
      status: 'completed',
      created_at: '2025-04-12T09:45:00Z',
      food_details: { quantity: 3, quantity_unit: 'kg', type: 'Prepared Meals', is_vegetarian: false },
      image_url: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    }
  ]);
  
  // Mock requests data for demo
  const [requests, setRequests] = useState([
    {
      id: '101',
      status: 'pending',
      created_at: '2025-04-16T11:20:00Z',
      donation: {
        title: 'Fresh Fruits Assortment', 
        food_details: { quantity: 4, quantity_unit: 'kg', type: 'Fruits' },
        image_url: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
      },
      donor: { first_name: 'Jane', last_name: 'Smith' }
    },
    {
      id: '102',
      status: 'accepted',
      created_at: '2025-04-14T16:30:00Z',
      donation: {
        title: 'Rice and Lentils', 
        food_details: { quantity: 6, quantity_unit: 'kg', type: 'Grains' },
        image_url: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
      },
      donor: { first_name: 'Michael', last_name: 'Johnson' }
    },
  ]);

  useEffect(() => {
    document.title = "Your Profile - ZeroWaste";
    
    // Redirect to auth if not logged in
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

  if (!isLoggedIn) {
    return null; // This should not render as the useEffect will redirect
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'accepted': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'expired': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
              <AvatarImage src={userProfile?.avatar_url || ''} />
              <AvatarFallback className="bg-zerowaste-primary text-white text-2xl">
                {userProfile?.first_name?.[0]}{userProfile?.last_name?.[0]}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {userProfile?.first_name} {userProfile?.last_name}
                  </h1>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="capitalize">
                      {userRole}
                    </Badge>
                    {userProfile?.organization_name && (
                      <Badge variant="outline" className="bg-blue-50">
                        {userProfile.organization_name}
                      </Badge>
                    )}
                  </div>
                </div>
                <Button>Edit Profile</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-zerowaste-primary/10 p-3 mb-2">
                  <Scale className="h-6 w-6 text-zerowaste-primary" />
                </div>
                <div className="text-2xl font-bold">{stats.donationsCount}</div>
                <p className="text-sm text-gray-500">Donations</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-zerowaste-secondary/10 p-3 mb-2">
                  <Users className="h-6 w-6 text-zerowaste-secondary" />
                </div>
                <div className="text-2xl font-bold">{stats.requestsCount}</div>
                <p className="text-sm text-gray-500">Requests</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-zerowaste-success/10 p-3 mb-2">
                  <Leaf className="h-6 w-6 text-zerowaste-success" />
                </div>
                <div className="text-2xl font-bold">{stats.foodSavedKg} kg</div>
                <p className="text-sm text-gray-500">Food Saved</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-teal-100 p-3 mb-2">
                  <User className="h-6 w-6 text-teal-600" />
                </div>
                <div className="text-2xl font-bold">{stats.peopleServed}</div>
                <p className="text-sm text-gray-500">People Served</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-amber-100 p-3 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-2xl font-bold">{stats.co2SavedKg} kg</div>
                <p className="text-sm text-gray-500">CO₂ Saved</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Tabs */}
        <Tabs defaultValue="donations" className="w-full">
          <TabsList className="w-full max-w-md mx-auto mb-6">
            <TabsTrigger value="donations" className="flex-1">My Donations</TabsTrigger>
            <TabsTrigger value="requests" className="flex-1">My Requests</TabsTrigger>
            <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="donations">
            <Card>
              <CardHeader>
                <CardTitle>Your Donations</CardTitle>
                <CardDescription>Manage and track the food you've donated</CardDescription>
              </CardHeader>
              <CardContent>
                {donations.length > 0 ? (
                  <div className="space-y-4">
                    {donations.map((donation) => (
                      <div key={donation.id} className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg">
                        <div className="w-full md:w-32 h-24 flex-shrink-0">
                          <img 
                            src={donation.image_url} 
                            alt={donation.title} 
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium">{donation.title}</h3>
                            <Badge className={`${getStatusColor(donation.status)} capitalize`}>
                              {donation.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {donation.food_details.quantity} {donation.food_details.quantity_unit} • 
                            {donation.food_details.type} • 
                            {donation.food_details.is_vegetarian ? ' Vegetarian' : ' Non-Vegetarian'}
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            Posted on {formatDate(donation.created_at)}
                          </p>
                        </div>
                        <div className="flex flex-col justify-center gap-2 mt-4 md:mt-0">
                          <Button variant="outline" size="sm">View Details</Button>
                          {donation.status === 'pending' && (
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                              Cancel
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">You haven't made any donations yet.</p>
                    <Button className="mt-4 bg-zerowaste-primary hover:bg-zerowaste-success">
                      Donate Food
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle>Your Requests</CardTitle>
                <CardDescription>Track the status of your food pickup requests</CardDescription>
              </CardHeader>
              <CardContent>
                {requests.length > 0 ? (
                  <div className="space-y-4">
                    {requests.map((request) => (
                      <div key={request.id} className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg">
                        <div className="w-full md:w-32 h-24 flex-shrink-0">
                          <img 
                            src={request.donation.image_url} 
                            alt={request.donation.title} 
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium">{request.donation.title}</h3>
                            <Badge className={`${getStatusColor(request.status)} capitalize`}>
                              {request.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {request.donation.food_details.quantity} {request.donation.food_details.quantity_unit} • 
                            {request.donation.food_details.type}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            From: {request.donor.first_name} {request.donor.last_name}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Requested on {formatDate(request.created_at)}
                          </p>
                        </div>
                        <div className="flex flex-col justify-center gap-2 mt-4 md:mt-0">
                          <Button variant="outline" size="sm">View Details</Button>
                          {request.status === 'pending' && (
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                              Cancel
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">You haven't made any requests yet.</p>
                    <Button className="mt-4 bg-zerowaste-secondary hover:bg-zerowaste-accent">
                      Find Food
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Update your profile and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input 
                          type="text" 
                          className="w-full p-2 border border-gray-300 rounded-md" 
                          value={userProfile?.first_name || ''}
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input 
                          type="text" 
                          className="w-full p-2 border border-gray-300 rounded-md" 
                          value={userProfile?.last_name || ''}
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Organization/NGO Name</label>
                        <input 
                          type="text" 
                          className="w-full p-2 border border-gray-300 rounded-md" 
                          placeholder="Enter your organization name if applicable"
                          value={userProfile?.organization_name || ''}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-gray-500">Receive email notifications about your donations and requests</p>
                        </div>
                        <div className="flex items-center">
                          <div className="relative inline-block w-10 mr-2 align-middle select-none">
                            <input type="checkbox" name="email-notifications" id="email-notifications" defaultChecked className="w-0 h-0 absolute opacity-0" />
                            <label htmlFor="email-notifications" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer">
                              <span className="translate-x-4 block h-6 w-6 rounded-full bg-white shadow transform transition duration-300"></span>
                            </label>
                          </div>
                          <label htmlFor="email-notifications" className="text-sm cursor-pointer">Enabled</label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">SMS Notifications</p>
                          <p className="text-sm text-gray-500">Receive text messages for urgent updates</p>
                        </div>
                        <div className="flex items-center">
                          <div className="relative inline-block w-10 mr-2 align-middle select-none">
                            <input type="checkbox" name="sms-notifications" id="sms-notifications" className="w-0 h-0 absolute opacity-0" />
                            <label htmlFor="sms-notifications" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer">
                              <span className="translate-x-0 block h-6 w-6 rounded-full bg-white shadow transform transition duration-300"></span>
                            </label>
                          </div>
                          <label htmlFor="sms-notifications" className="text-sm cursor-pointer">Disabled</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;
