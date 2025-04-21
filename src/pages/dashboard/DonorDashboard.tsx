
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Check, X, File, ShoppingBag, Heart } from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const DonorDashboard = () => {
  const { userRole, userProfile, isLoggedIn, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Donor Dashboard - ZeroWaste";
    
    // Redirect if not logged in or not a donor
    if (!loading && (!isLoggedIn || userRole !== 'donor')) {
      navigate('/auth');
    }
  }, [isLoggedIn, userRole, loading, navigate]);

  const handleDonationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Donation Posted Successfully",
      description: "Your food donation has been posted and is now visible to receivers.",
    });
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

  if (!isLoggedIn || userRole !== 'donor') {
    return null; // Will redirect in useEffect
  }

  // Sample donation data
  const donationHistory = [
    {
      id: 'don-1',
      title: 'Rice and Curry',
      quantity: '5 kg',
      type: 'Vegetarian',
      expiry: '2 hours',
      status: 'pending',
      createdAt: '2 hours ago'
    },
    {
      id: 'don-2',
      title: 'Bread and Pastries',
      quantity: '10 pieces',
      type: 'Vegetarian',
      expiry: '5 hours',
      status: 'accepted',
      createdAt: '5 hours ago'
    },
    {
      id: 'don-3',
      title: 'Mixed Vegetables',
      quantity: '3 kg',
      type: 'Vegetarian',
      expiry: '12 hours',
      status: 'picked',
      createdAt: '1 day ago'
    },
    {
      id: 'don-4',
      title: 'Cooked Meals',
      quantity: '8 servings',
      type: 'Non-Vegetarian',
      expiry: '4 hours',
      status: 'verified',
      createdAt: '2 days ago'
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold fade-in">Donor Dashboard</h1>
            <p className="text-gray-600">Welcome back, {userProfile?.first_name}!</p>
          </div>
          <Button className="bg-zerowaste-primary hover:bg-zerowaste-primary/90 hover:scale-105 transition-all duration-300">
            <Heart className="mr-2 h-4 w-4" /> Impact Stats
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="card-hover fade-in">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-50 rounded-full float-animation">
                  <ShoppingBag className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Donations</p>
                  <p className="text-3xl font-semibold">24</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover fade-in">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-50 rounded-full float-animation">
                  <Check className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Donations Claimed</p>
                  <p className="text-3xl font-semibold">18</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover fade-in">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-50 rounded-full float-animation">
                  <Heart className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Lives Impacted</p>
                  <p className="text-3xl font-semibold">120+</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card className="card-hover fade-in">
              <CardHeader>
                <CardTitle>Post New Donation</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleDonationSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Food Title</Label>
                    <Input id="title" placeholder="E.g., Rice and Curry" required />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input id="quantity" placeholder="E.g., 5 kg" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="type">Food Type</Label>
                      <select 
                        id="type" 
                        className="w-full rounded-md border border-input bg-white px-3 py-2"
                        required
                      >
                        <option value="">Select Type</option>
                        <option value="veg">Vegetarian</option>
                        <option value="non-veg">Non-Vegetarian</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="shelf-life">Food Freshness</Label>
                      <select 
                        id="shelf-life" 
                        className="w-full rounded-md border border-input bg-white px-3 py-2"
                        required
                      >
                        <option value="">Select Freshness</option>
                        <option value="fresh">Fresh (24+ hours)</option>
                        <option value="day">Same Day (12-24 hours)</option>
                        <option value="few-hours">Few Hours (2-12 hours)</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="pickup-time">Pickup Deadline</Label>
                      <Input id="pickup-time" type="time" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Pickup Location</Label>
                    <div className="flex items-center">
                      <Input id="location" placeholder="Enter address or use current location" required className="flex-1" />
                      <Button type="button" variant="outline" size="icon" className="ml-2">
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="image">Upload Image</Label>
                    <Input id="image" type="file" accept="image/*" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Additional Details</Label>
                    <textarea 
                      id="description" 
                      rows={3} 
                      className="w-full rounded-md border border-input bg-white px-3 py-2" 
                      placeholder="Any specific details about the food..."
                    ></textarea>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-zerowaste-primary hover:bg-zerowaste-primary/90 hover:scale-105 transition-all duration-300"
                  >
                    Post Donation
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-3">
            <Card className="card-hover fade-in">
              <CardHeader>
                <CardTitle>My Donations</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="active">
                  <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="accepted">Accepted</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="expired">Expired</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="active" className="space-y-4">
                    {donationHistory
                      .filter(d => d.status === 'pending')
                      .map(donation => (
                        <div key={donation.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-all">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{donation.title}</h3>
                              <div className="text-sm text-gray-500 space-y-1">
                                <p>Quantity: {donation.quantity} | {donation.type}</p>
                                <p className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" /> Expires in: {donation.expiry}
                                </p>
                              </div>
                            </div>
                            <div>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Pending
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700 hover:bg-red-50">Cancel</Button>
                          </div>
                        </div>
                      ))}
                  </TabsContent>
                  
                  <TabsContent value="accepted" className="space-y-4">
                    {donationHistory
                      .filter(d => d.status === 'accepted')
                      .map(donation => (
                        <div key={donation.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-all">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{donation.title}</h3>
                              <div className="text-sm text-gray-500 space-y-1">
                                <p>Quantity: {donation.quantity} | {donation.type}</p>
                                <p className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" /> Pickup in: {donation.expiry}
                                </p>
                              </div>
                            </div>
                            <div>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Accepted
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" variant="outline">Receiver Details</Button>
                            <Button size="sm" variant="outline">Contact</Button>
                          </div>
                        </div>
                      ))}
                  </TabsContent>
                  
                  <TabsContent value="completed" className="space-y-4">
                    {donationHistory
                      .filter(d => ['picked', 'verified'].includes(d.status))
                      .map(donation => (
                        <div key={donation.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-all">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{donation.title}</h3>
                              <div className="text-sm text-gray-500">
                                <p>Quantity: {donation.quantity} | {donation.type}</p>
                                <p>Completed: {donation.createdAt}</p>
                              </div>
                            </div>
                            <div>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                {donation.status === 'picked' ? 'Picked Up' : 'Verified'}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" variant="outline">View Details</Button>
                            <Button size="sm" variant="outline">Download Receipt</Button>
                          </div>
                        </div>
                      ))}
                  </TabsContent>
                  
                  <TabsContent value="expired" className="space-y-4">
                    <div className="p-4 border rounded-lg text-center text-gray-500">
                      <File className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                      <p>No expired donations</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DonorDashboard;
