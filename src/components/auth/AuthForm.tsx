import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useAuth from '@/hooks/useAuth';

const AuthForm = () => {
  const [activeTab, setActiveTab] = useState<'sign-in' | 'sign-up'>('sign-in');
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    organizationName: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login, userRole } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (userRole) {
      switch (userRole) {
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
  }, [userRole, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errorMessage) setErrorMessage(null);
  };

  const validateForm = () => {
    if (loginMethod === 'email') {
      if (!formData.email || !formData.email.includes('@')) {
        setErrorMessage('Please enter a valid email address');
        return false;
      }
    } else {
      if (!formData.phone || formData.phone.length < 10) {
        setErrorMessage('Please enter a valid phone number');
        return false;
      }
    }
    
    if (!formData.password || formData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      return false;
    }
    
    if (activeTab === 'sign-up' && formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      setErrorMessage(null);
      
      const identifier = loginMethod === 'email' ? formData.email : formData.phone;
      const result = await login(identifier, formData.password);
      
      if (result.success) {
        toast({
          title: "Success!",
          description: activeTab === 'sign-in' ? "Successfully signed in" : "Account created successfully",
        });
      } else {
        throw new Error("Authentication failed");
      }
    } catch (error) {
      console.error('Auth error:', error);
      setErrorMessage('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoUserDetails = (role: 'donor1' | 'donor2' | 'receiver' | 'admin') => {
    switch(role) {
      case 'admin':
        setFormData({
          ...formData,
          email: 'admin@zerowaste.org',
          phone: '9876543210',
          password: 'adminpassword',
          confirmPassword: 'adminpassword'
        });
        break;
      case 'receiver':
        setFormData({
          ...formData,
          email: 'receiver@zerowaste.org',
          phone: '9876543211',
          password: 'receiverpassword',
          confirmPassword: 'receiverpassword'
        });
        break;
      case 'donor1':
        setFormData({
          ...formData,
          email: 'donor1@zerowaste.org',
          phone: '9876543212',
          password: 'donorpassword',
          confirmPassword: 'donorpassword'
        });
        break;
      case 'donor2':
        setFormData({
          ...formData,
          email: 'donor2@zerowaste.org',
          phone: '9876543213',
          password: 'donorpassword',
          confirmPassword: 'donorpassword'
        });
    }
  };

  return (
    <Card className="w-full shadow-xl border border-gray-200">
      <CardHeader className="pb-4">
        <Tabs 
          defaultValue={activeTab} 
          onValueChange={(value) => setActiveTab(value as 'sign-in' | 'sign-up')}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sign-in">Sign In</TabsTrigger>
            <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-700 font-medium">Sign in with</Label>
            <RadioGroup 
              value={loginMethod} 
              onValueChange={(value) => setLoginMethod(value as 'email' | 'phone')}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="email-option" />
                <Label htmlFor="email-option" className="text-gray-700">Email</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="phone" id="phone-option" />
                <Label htmlFor="phone-option" className="text-gray-700">Phone</Label>
              </div>
            </RadioGroup>
          </div>
          
          {loginMethod === 'email' ? (
            <div>
              <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
              <Input 
                type="email"
                id="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="border-gray-300 focus:border-zerowaste-primary transition-all"
              />
            </div>
          ) : (
            <div>
              <Label htmlFor="phone" className="text-gray-700 font-medium">Phone Number</Label>
              <Input 
                type="tel"
                id="phone" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
                className="border-gray-300 focus:border-zerowaste-primary transition-all"
              />
            </div>
          )}
          
          <div>
            <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="border-gray-300 focus:border-zerowaste-primary transition-all"
            />
          </div>
          
          {activeTab === 'sign-up' && (
            <>
              <div>
                <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">Confirm Password</Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  className="border-gray-300 focus:border-zerowaste-primary transition-all"
                />
              </div>
              
              <div>
                <Label htmlFor="organizationName" className="text-gray-700 font-medium">Organization/NGO Name (Optional)</Label>
                <Input
                  type="text"
                  id="organizationName"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  placeholder="Enter your organization name if applicable"
                  className="border-gray-300 focus:border-zerowaste-primary transition-all"
                />
              </div>
            </>
          )}
          
          {errorMessage && (
            <div className="text-red-600 bg-red-50 p-2 rounded-md text-sm border border-red-200">{errorMessage}</div>
          )}
          
          <Button 
            disabled={loading} 
            type="submit" 
            className="w-full bg-zerowaste-primary hover:bg-zerowaste-primary/90 hover:scale-105 transition-all duration-300"
          >
            {loading ? 'Loading...' : activeTab === 'sign-in' ? 'Sign In' : 'Create Account'}
          </Button>
          
          <div className="mt-6">
            <p className="text-center text-sm text-gray-500">
              {activeTab === 'sign-in' 
                ? "Don't have an account? Switch to Sign Up" 
                : "Already have an account? Switch to Sign In"}
            </p>
            
            <div className="mt-4">
              <Button 
                type="button" 
                variant="outline" 
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all"
                onClick={() => {
                  setActiveTab(activeTab === 'sign-in' ? 'sign-up' : 'sign-in');
                  setErrorMessage(null);
                }}
              >
                {activeTab === 'sign-in' ? 'Create New Account' : 'Sign In Instead'}
              </Button>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <p className="text-center text-sm font-medium text-gray-700">Demo Accounts:</p>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                onClick={() => fillDemoUserDetails('donor1')}
              >
                Madhurima (Donor)
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                onClick={() => fillDemoUserDetails('donor2')}
              >
                Thanu Sree (Donor)
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                onClick={() => fillDemoUserDetails('receiver')}
              >
                Tharun (Receiver)
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                onClick={() => fillDemoUserDetails('admin')}
              >
                Chaitanya Gowri (Admin)
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AuthForm;
