
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Check, Bell, ShoppingBag, Heart, Calendar, List } from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FoodItem {
  id: string;
  title: string;
  quantity: string;
  type: string;
  distance: string;
  expiry: string;
  donor: string;
  location: string;
  image?: string;
}

const ReceiverDashboard = () => {
  const { userRole, userProfile, isLoggedIn, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [availableFoodItems, setAvailableFoodItems] = useState<FoodItem[]>([
    {
      id: 'food-1',
      title: 'Rice and Curry',
      quantity: '5 kg',
      type: 'Vegetarian',
      distance: '1.2 km',
      expiry: '2 hours',
      donor: 'Hotel Saravana',
      location: 'Gandhi Road, Tirupathi',
    },
    {
      id: 'food-2',
      title: 'Bread and Pastries',
      quantity: '10 pieces',
      type: 'Vegetarian',
      distance: '0.8 km',
      expiry: '5 hours',
      donor: 'Bakery Paradise',
      location: 'Market Street, Tirupathi',
    },
    {
      id: 'food-3',
      title: 'Mixed Vegetables',
      quantity: '3 kg',
      type: 'Vegetarian',
      distance: '3.1 km',
      expiry: '12 hours',
      donor: 'Fresh Farm Market',
      location: 'Tiruchanoor Road, Tirupathi',
    },
    {
      id: 'food-4',
      title: 'Cooked Meals',
      quantity: '8 servings',
      type: 'Non-Vegetarian',
      distance: '4.5 km',
      expiry: '4 hours',
      donor: 'Food Express Restaurant',
      location: 'Main Road, Tirupathi',
    }
  ]);
  
  const [myRequests, setMyRequests] = useState([
    {
      id: 'req-1',
      foodTitle: 'Rice and Dal',
      requestDate: '2023-04-17',
      status: 'approved',
      pickupTime: '2023-04-17 16:00',
      donor: 'Madhurima'
    },
    {
      id: 'req-2',
      foodTitle: 'Vegetable Biryani',
      requestDate: '2023-04-16',
      status: 'pending',
      donor: 'Thanu Sree'
    },
    {
      id: 'req-3',
      foodTitle: 'Fruits and Snacks',
      requestDate: '2023-04-15',
      status: 'completed',
      pickupTime: '2023-04-15 10:30',
      donor: 'Madhurima'
    }
  ]);

  useEffect(() => {
    document.title = "Receiver Dashboard - ZeroWaste";
    
    // Redirect if not logged in or not a receiver
    if (!loading && (!isLoggedIn || userRole !== 'receiver')) {
      navigate('/auth');
    }
  }, [isLoggedIn, userRole, loading, navigate]);

  const handleFoodRequest = (foodId: string) => {
    const foodItem = availableFoodItems.find(item => item.id === foodId);
    if (foodItem) {
      toast({
        title: "Request Sent",
        description: `Your request for ${foodItem.title} has been sent to ${foodItem.donor}.`,
      });
      
      // Remove the requested item from available food
      setAvailableFoodItems(items => items.filter(item => item.id !== foodId));
      
      // Add to my requests
      setMyRequests(prev => [
        {
          id: `req-${Math.random().toString(36).substr(2, 9)}`,
          foodTitle: foodItem.title,
          requestDate: new Date().toISOString().split('T')[0],
          status: 'pending',
          donor: foodItem.donor
        },
        ...prev
      ]);
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold fade-in">Receiver Dashboard</h1>
            <p className="text-gray-600">Welcome back, {userProfile?.first_name}!</p>
          </div>
          <div className="flex gap-4">
            <Button className="bg-zerowaste-primary hover:bg-zerowaste-primary/90 hover:scale-105 transition-all duration-300">
              <MapPin className="mr-2 h-4 w-4" /> View Map
            </Button>
            <Button variant="outline">
              <Bell className="mr-2 h-4 w-4" /> Notifications
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="card-hover fade-in">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-50 rounded-full float-animation">
                  <List className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">My Requests</p>
                  <p className="text-3xl font-semibold">{myRequests.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover fade-in">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-50 rounded-full float-animation">
                  <ShoppingBag className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Food Received</p>
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
                  <p className="text-sm font-medium text-gray-500">People Served</p>
                  <p className="text-3xl font-semibold">72</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="card-hover fade-in">
            <CardHeader>
              <CardTitle>Available Food</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableFoodItems.length > 0 ? (
                  availableFoodItems.map((food) => (
                    <div key={food.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-all">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h3 className="font-medium">{food.title}</h3>
                          <div className="text-sm text-gray-500">
                            <p>Quantity: {food.quantity} | {food.type}</p>
                            <p className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" /> {food.distance} away • {food.location}
                            </p>
                            <p className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" /> Expires in: {food.expiry}
                            </p>
                            <p>Donor: {food.donor}</p>
                          </div>
                        </div>
                        <Button 
                          size="sm"
                          className="bg-zerowaste-primary hover:bg-zerowaste-primary/90 hover:scale-105 transition-all duration-300"
                          onClick={() => handleFoodRequest(food.id)}
                        >
                          Request
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 border rounded-lg text-center text-gray-500">
                    <ShoppingBag className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                    <p>No available food donations at this moment.</p>
                    <p>Check back later or view the map for more options.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover fade-in">
            <CardHeader>
              <CardTitle>My Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="approved">Approved</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-4">
                  {myRequests.map((request) => (
                    <div key={request.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-all">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{request.foodTitle}</h3>
                          <div className="text-sm text-gray-500">
                            <p>Requested on: {request.requestDate}</p>
                            <p>Donor: {request.donor}</p>
                            {request.pickupTime && <p>Pickup time: {request.pickupTime}</p>}
                          </div>
                        </div>
                        <div>
                          {request.status === 'pending' && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Pending
                            </span>
                          )}
                          {request.status === 'approved' && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Approved
                            </span>
                          )}
                          {request.status === 'completed' && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Completed
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-3 flex gap-2">
                        {request.status === 'approved' && (
                          <>
                            <Button size="sm" className="bg-zerowaste-primary hover:bg-zerowaste-primary/90">
                              <MapPin className="mr-1 h-3 w-3" /> Get Directions
                            </Button>
                            <Button size="sm" variant="outline">
                              <Check className="mr-1 h-3 w-3" /> Mark as Received
                            </Button>
                          </>
                        )}
                        {request.status === 'pending' && (
                          <Button size="sm" variant="outline" className="text-red-500">
                            Cancel Request
                          </Button>
                        )}
                        {request.status === 'completed' && (
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="pending" className="space-y-4">
                  {myRequests.filter(r => r.status === 'pending').map((request) => (
                    <div key={request.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-all">
                      {/* Same structure as above, filtered for pending */}
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{request.foodTitle}</h3>
                          <div className="text-sm text-gray-500">
                            <p>Requested on: {request.requestDate}</p>
                            <p>Donor: {request.donor}</p>
                          </div>
                        </div>
                        <div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="outline" className="text-red-500">
                          Cancel Request
                        </Button>
                      </div>
                    </div>
                  ))}
                  {myRequests.filter(r => r.status === 'pending').length === 0 && (
                    <div className="p-4 border rounded-lg text-center text-gray-500">
                      <Calendar className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                      <p>No pending requests</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="approved" className="space-y-4">
                  {myRequests.filter(r => r.status === 'approved').map((request) => (
                    <div key={request.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-all">
                      {/* Same structure as above, filtered for approved */}
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{request.foodTitle}</h3>
                          <div className="text-sm text-gray-500">
                            <p>Requested on: {request.requestDate}</p>
                            <p>Donor: {request.donor}</p>
                            <p>Pickup time: {request.pickupTime}</p>
                          </div>
                        </div>
                        <div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Approved
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" className="bg-zerowaste-primary hover:bg-zerowaste-primary/90">
                          <MapPin className="mr-1 h-3 w-3" /> Get Directions
                        </Button>
                        <Button size="sm" variant="outline">
                          <Check className="mr-1 h-3 w-3" /> Mark as Received
                        </Button>
                      </div>
                    </div>
                  ))}
                  {myRequests.filter(r => r.status === 'approved').length === 0 && (
                    <div className="p-4 border rounded-lg text-center text-gray-500">
                      <Calendar className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                      <p>No approved requests</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="completed" className="space-y-4">
                  {myRequests.filter(r => r.status === 'completed').map((request) => (
                    <div key={request.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-all">
                      {/* Same structure as above, filtered for completed */}
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{request.foodTitle}</h3>
                          <div className="text-sm text-gray-500">
                            <p>Requested on: {request.requestDate}</p>
                            <p>Donor: {request.donor}</p>
                            <p>Pickup time: {request.pickupTime}</p>
                          </div>
                        </div>
                        <div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Completed
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                  {myRequests.filter(r => r.status === 'completed').length === 0 && (
                    <div className="p-4 border rounded-lg text-center text-gray-500">
                      <Calendar className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                      <p>No completed requests</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ReceiverDashboard;
