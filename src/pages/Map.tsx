
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import MapView from '@/components/map/MapView';
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAuth from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MapPage = () => {
  const { isLoggedIn, loading, userProfile } = useAuth();
  const navigate = useNavigate();
  const [distance, setDistance] = useState<number[]>([10]);
  const [foodType, setFoodType] = useState<string>("all");
  const [dietaryPreference, setDietaryPreference] = useState<string>("all");
  const [freshness, setFreshness] = useState<string>("all");
  const [organizationName, setOrganizationName] = useState(userProfile?.organization_name || '');
  const [showOrgInput, setShowOrgInput] = useState(false);
  
  useEffect(() => {
    // Set page title
    document.title = "Food Map - ZeroWaste";
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zerowaste-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Food Availability Map</h1>
          <p className="mt-2 text-gray-600">Find food donations available in your area.</p>
        </div>

        {!isLoggedIn && (
          <Card className="mb-6 border-yellow-200 bg-yellow-50">
            <CardContent className="pt-6">
              <div className="flex items-start">
                <div className="mr-4 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-yellow-800">
                    For the best experience and to request food donations, please <a href="/auth" className="font-medium underline">sign in</a> or <a href="/auth" className="font-medium underline">create an account</a>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Organization Name Input (when not logged in or when updating info) */}
        {(!isLoggedIn || showOrgInput) && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Organization Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="organizationName">Organization/NGO Name</Label>
                <Input 
                  id="organizationName" 
                  placeholder="e.g., Community Food Bank"
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                />
                <p className="text-sm text-gray-500">This information will be used when you request food donations.</p>
                
                {isLoggedIn && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowOrgInput(false)}
                    className="mt-2"
                  >
                    Done
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filter Controls */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h2 className="font-semibold text-lg mb-4">Filter Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <Label>Distance: {distance[0]} km</Label>
              <Slider 
                value={distance}
                onValueChange={setDistance}
                max={50}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0 km</span>
                <span>50 km</span>
              </div>
            </div>
            
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">Food Type</Label>
              <Select value={foodType} onValueChange={setFoodType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="vegetables">Vegetables</SelectItem>
                  <SelectItem value="fruits">Fruits</SelectItem>
                  <SelectItem value="grains">Rice & Grains</SelectItem>
                  <SelectItem value="bakery">Bread & Bakery</SelectItem>
                  <SelectItem value="prepared">Prepared Meals</SelectItem>
                  <SelectItem value="dairy">Dairy Products</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="block text-sm font-medium text-gray-700">Dietary Preference</Label>
              <RadioGroup 
                value={dietaryPreference} 
                onValueChange={setDietaryPreference}
                className="flex flex-col space-y-2 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all">All Food</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vegetarian" id="vegetarian" />
                  <Label htmlFor="vegetarian">Vegetarian Only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nonvegetarian" id="nonvegetarian" />
                  <Label htmlFor="nonvegetarian">Non-Vegetarian Available</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label className="block text-sm font-medium text-gray-700">Freshness</Label>
              <RadioGroup 
                value={freshness} 
                onValueChange={setFreshness}
                className="flex flex-col space-y-2 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all-freshness" />
                  <Label htmlFor="all-freshness">All</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fresh" id="fresh" />
                  <Label htmlFor="fresh">Fresh Only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="expiring" id="expiring" />
                  <Label htmlFor="expiring">Include Near Expiry</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            {isLoggedIn && !showOrgInput && (
              <Button 
                variant="outline" 
                onClick={() => setShowOrgInput(true)}
                className="text-zerowaste-primary border-zerowaste-primary/30"
              >
                Update Organization Info
              </Button>
            )}
            
            <div className={isLoggedIn && !showOrgInput ? '' : 'ml-auto'}>
              <Button className="bg-zerowaste-primary hover:bg-zerowaste-success">
                Apply Filters
              </Button>
            </div>
          </div>
        </div>

        <MapView 
          filterDistance={distance[0]} 
          filterFoodType={foodType !== "all" ? foodType : null} 
          filterVegetarian={dietaryPreference === "vegetarian" ? true : dietaryPreference === "nonvegetarian" ? false : null}
          filterFreshness={freshness !== "all" ? freshness : null}
          organizationName={organizationName}
          isLoggedIn={isLoggedIn}
        />
        
        {!isLoggedIn && (
          <div className="mt-8 text-center">
            <p className="mb-4 text-gray-600">Want to request food donations?</p>
            <Button 
              className="bg-zerowaste-primary hover:bg-zerowaste-success"
              onClick={() => navigate('/auth')}
            >
              Sign In or Create Account
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MapPage;
