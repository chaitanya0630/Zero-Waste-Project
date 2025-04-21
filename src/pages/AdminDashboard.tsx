
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Users, ShoppingBag, Award, UserCheck, Settings, FileText } from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const { userRole, isLoggedIn, loading } = useAuth();
  const navigate = useNavigate();

  const chartData = [
    { name: 'Jan', donations: 65 },
    { name: 'Feb', donations: 59 },
    { name: 'Mar', donations: 80 },
    { name: 'Apr', donations: 81 },
    { name: 'May', donations: 56 },
    { name: 'Jun', donations: 55 },
    { name: 'Jul', donations: 40 },
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

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold fade-in">Admin Dashboard</h1>
          <Button className="bg-zerowaste-primary hover-scale">Generate Report</Button>
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
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50 smooth-transition">
                  <div>
                    <p className="font-medium">Donor Accounts</p>
                    <p className="text-sm text-gray-500">Manage all donor accounts</p>
                  </div>
                  <Button size="sm" className="hover-scale">Manage</Button>
                </div>
                
                <div className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50 smooth-transition">
                  <div>
                    <p className="font-medium">Receiver Organizations</p>
                    <p className="text-sm text-gray-500">Verify and manage receiver accounts</p>
                  </div>
                  <Button size="sm" className="hover-scale">Manage</Button>
                </div>
                
                <div className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50 smooth-transition">
                  <div>
                    <p className="font-medium">Verification Requests</p>
                    <p className="text-sm text-gray-500">Review verification requests (12 pending)</p>
                  </div>
                  <Button size="sm" variant="destructive" className="hover-scale">Review</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover fade-in">
            <CardHeader className="pb-2">
              <CardTitle>Donation Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
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
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
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
                      <p className="font-medium">Food Categories</p>
                      <p className="text-sm text-gray-500">Manage food categories and types</p>
                    </div>
                  </div>
                  <Button size="sm" className="hover-scale">Manage</Button>
                </div>
                
                <div className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50 smooth-transition">
                  <div className="flex items-center">
                    <Settings className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="font-medium">Settings</p>
                      <p className="text-sm text-gray-500">Configure system settings</p>
                    </div>
                  </div>
                  <Button size="sm" className="hover-scale">Configure</Button>
                </div>
                
                <div className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50 smooth-transition">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="font-medium">Reports</p>
                      <p className="text-sm text-gray-500">Download system reports and analytics</p>
                    </div>
                  </div>
                  <Button size="sm" className="hover-scale">Reports</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
