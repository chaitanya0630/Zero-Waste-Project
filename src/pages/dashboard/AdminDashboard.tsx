
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, ShoppingBag, Award, UserCheck, Settings, FileText, Flag, BarChart } from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminDashboard = () => {
  const { userRole, userProfile, isLoggedIn, loading } = useAuth();
  const navigate = useNavigate();

  const chartData = [
    { name: 'Jan', donations: 65, co2: 120 },
    { name: 'Feb', donations: 59, co2: 100 },
    { name: 'Mar', donations: 80, co2: 150 },
    { name: 'Apr', donations: 81, co2: 155 },
    { name: 'May', donations: 56, co2: 95 },
    { name: 'Jun', donations: 55, co2: 90 },
    { name: 'Jul', donations: 40, co2: 75 },
  ];

  useEffect(() => {
    document.title = "Admin Dashboard - ZeroWaste";
    
    // Redirect if not logged in or not an admin
    if (!loading && (!isLoggedIn || userRole !== 'admin')) {
      navigate('/auth');
    }
  }, [isLoggedIn, userRole, loading, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zerowaste-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!isLoggedIn || userRole !== 'admin') {
    return null; // Will redirect in useEffect
  }

  // Sample data
  const pendingVerifications = [
    { id: 1, name: 'Food For All NGO', date: '2023-04-15', type: 'NGO', status: 'pending' },
    { id: 2, name: 'Helping Hands', date: '2023-04-17', type: 'Organization', status: 'pending' },
    { id: 3, name: 'Community Kitchen', date: '2023-04-18', type: 'Restaurant', status: 'pending' }
  ];

  const flaggedUsers = [
    { id: 1, name: 'User123', reason: 'Multiple expired donations', date: '2023-04-10' },
    { id: 2, name: 'Organization456', reason: 'Reported by receivers', date: '2023-04-12' }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold fade-in">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, {userProfile?.first_name} {userProfile?.last_name}!</p>
          </div>
          <Button className="bg-zerowaste-primary hover:bg-zerowaste-primary/90 hover:scale-105 transition-all duration-300">
            <FileText className="mr-2 h-4 w-4" /> Generate Report
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="card-hover fade-in">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-50 rounded-full float-animation">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Users</p>
                  <p className="text-3xl font-semibold">1,248</p>
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
                  <p className="text-sm font-medium text-gray-500">Total Donations</p>
                  <p className="text-3xl font-semibold">3,782</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover fade-in">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-50 rounded-full float-animation">
                  <UserCheck className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Verified Receivers</p>
                  <p className="text-3xl font-semibold">152</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover fade-in">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-50 rounded-full float-animation">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Food Saved (kg)</p>
                  <p className="text-3xl font-semibold">12,450</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="card-hover fade-in">
            <CardHeader className="pb-2">
              <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="donations">
                <TabsList className="mb-4">
                  <TabsTrigger value="donations">Donations</TabsTrigger>
                  <TabsTrigger value="impact">Environmental Impact</TabsTrigger>
                  <TabsTrigger value="users">Users</TabsTrigger>
                </TabsList>
                
                <TabsContent value="donations" className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={chartData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="donations" fill="#4CAF50" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </TabsContent>
                
                <TabsContent value="impact" className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={chartData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="co2" fill="#3B82F6" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </TabsContent>
                
                <TabsContent value="users" className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={[
                        { name: 'Jan', donors: 35, receivers: 25 },
                        { name: 'Feb', donors: 28, receivers: 18 },
                        { name: 'Mar', donors: 40, receivers: 30 },
                        { name: 'Apr', donors: 43, receivers: 35 },
                        { name: 'May', donors: 28, receivers: 20 },
                        { name: 'Jun', donors: 30, receivers: 22 },
                        { name: 'Jul', donors: 20, receivers: 15 },
                      ]}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="donors" fill="#FF7043" />
                      <Bar dataKey="receivers" fill="#9C27B0" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card className="card-hover fade-in">
            <CardHeader className="pb-2">
              <CardTitle>Verification Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingVerifications.map(req => (
                  <div key={req.id} className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50 smooth-transition">
                    <div>
                      <p className="font-medium">{req.name}</p>
                      <p className="text-sm text-gray-500">{req.type} • Requested on {req.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-green-600 hover:bg-green-50 hover:text-green-700">Approve</Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50 hover:text-red-700">Reject</Button>
                    </div>
                  </div>
                ))}
                
                <Button size="sm" className="w-full bg-zerowaste-primary hover:bg-zerowaste-primary/90 hover:scale-105 transition-all duration-300">
                  View All Requests
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="card-hover fade-in">
            <CardHeader className="pb-2">
              <CardTitle>System Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50 smooth-transition">
                  <div className="flex items-center">
                    <Settings className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="font-medium">User Management</p>
                      <p className="text-sm text-gray-500">Manage users, roles and permissions</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-zerowaste-primary hover:bg-zerowaste-primary/90 hover:scale-105 transition-all duration-300">Manage</Button>
                </div>
                
                <div className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50 smooth-transition">
                  <div className="flex items-center">
                    <Settings className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="font-medium">Food Categories</p>
                      <p className="text-sm text-gray-500">Manage food categories and types</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-zerowaste-primary hover:bg-zerowaste-primary/90 hover:scale-105 transition-all duration-300">Manage</Button>
                </div>
                
                <div className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50 smooth-transition">
                  <div className="flex items-center">
                    <Settings className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="font-medium">System Settings</p>
                      <p className="text-sm text-gray-500">Configure system settings</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-zerowaste-primary hover:bg-zerowaste-primary/90 hover:scale-105 transition-all duration-300">Configure</Button>
                </div>
                
                <div className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50 smooth-transition">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="font-medium">Reports</p>
                      <p className="text-sm text-gray-500">Download system reports and analytics</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-zerowaste-primary hover:bg-zerowaste-primary/90 hover:scale-105 transition-all duration-300">Reports</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover fade-in">
            <CardHeader className="pb-2">
              <CardTitle>Flagged Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {flaggedUsers.map(user => (
                  <div key={user.id} className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50 smooth-transition">
                    <div>
                      <div className="flex items-center">
                        <Flag className="h-4 w-4 text-red-500 mr-2" />
                        <p className="font-medium">{user.name}</p>
                      </div>
                      <p className="text-sm text-gray-500">{user.reason} • Flagged on {user.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Review</Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50 hover:text-red-700">Ban User</Button>
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50 smooth-transition">
                  <div className="flex items-center">
                    <Flag className="h-4 w-4 text-orange-500 mr-2" />
                    <div>
                      <p className="font-medium">Expired Donations</p>
                      <p className="text-sm text-gray-500">12 expired donations need review</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-zerowaste-primary hover:bg-zerowaste-primary/90 hover:scale-105 transition-all duration-300">Review</Button>
                </div>
                
                <Button size="sm" className="w-full bg-zerowaste-primary hover:bg-zerowaste-primary/90 hover:scale-105 transition-all duration-300">
                  View All Flags
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="card-hover fade-in">
          <CardHeader className="pb-2">
            <CardTitle>Impact Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <BarChart className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-bold text-green-700">12,450 kg</p>
                <p className="text-sm text-green-600">Food Waste Saved</p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <p className="text-2xl font-bold text-blue-700">6,200+</p>
                <p className="text-sm text-blue-600">People Served</p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg text-center">
                <Award className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <p className="text-2xl font-bold text-purple-700">23.4 tons</p>
                <p className="text-sm text-purple-600">CO₂ Emissions Prevented</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
