import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { FoodDetails, Location } from '@/types';
import useAuth from '@/hooks/useAuth';
import { useToast } from "@/components/ui/use-toast";

export default function DonationForm() {
  const { userProfile } = useAuth();
  const { toast } = useToast();
  
  const [title, setTitle] = useState('');
  const [foodType, setFoodType] = useState('');
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [quantityUnit, setQuantityUnit] = useState('kg');
  const [expiryDate, setExpiryDate] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [pickupDeadline, setPickupDeadline] = useState('');
  const [organizationName, setOrganizationName] = useState(userProfile?.organization_name || '');
  const [loading, setLoading] = useState(false);
  const [analyzeLoading, setAnalyzeLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<{ foodType?: string; quantity?: number; isVegetarian?: boolean } | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeImage = async () => {
    if (!imageFile) return;
    
    setAnalyzeLoading(true);
    
    // This is a placeholder for the AI analysis
    // In the actual implementation, we would send the image to a backend service
    setTimeout(() => {
      // Mock AI suggestions
      setAiSuggestions({
        foodType: 'Mixed Vegetables',
        quantity: 3.5,
        isVegetarian: true
      });
      setAnalyzeLoading(false);
    }, 2000);
  };

  const applyAiSuggestions = () => {
    if (!aiSuggestions) return;
    
    if (aiSuggestions.foodType) setFoodType(aiSuggestions.foodType);
    if (aiSuggestions.quantity) setQuantity(aiSuggestions.quantity.toString());
    if (aiSuggestions.isVegetarian !== undefined) setIsVegetarian(aiSuggestions.isVegetarian);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Create food details object
    const foodDetails: FoodDetails = {
      type: foodType,
      is_vegetarian: isVegetarian,
      quantity: parseFloat(quantity),
      quantity_unit: quantityUnit,
      expiry_date: expiryDate,
      description
    };
    
    // Create location object
    const location: Location = {
      latitude: 0, // Will be filled with geocoding in actual implementation
      longitude: 0, // Will be filled with geocoding in actual implementation
      address,
      city,
      postal_code: postalCode,
      country,
    };
    
    // This is a placeholder for the actual submission
    // In the actual implementation, we would upload the image to Supabase Storage
    // and create a new donation in the database
    console.log("Submitting donation:", {
      title,
      foodDetails,
      location,
      pickup_deadline: pickupDeadline,
      organization: organizationName
    });
    
    // Mock loading state
    setTimeout(() => {
      setLoading(false);
      // Mock success
      toast({
        title: "Success!",
        description: "Your donation has been submitted successfully!",
      });
      
      // Reset form
      setTitle('');
      setFoodType('');
      setIsVegetarian(false);
      setQuantity('');
      setExpiryDate('');
      setDescription('');
      setImageFile(null);
      setImagePreview(null);
      setAddress('');
      setCity('');
      setPostalCode('');
      setCountry('');
      setPickupDeadline('');
      setAiSuggestions(null);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Create Food Donation</CardTitle>
          <CardDescription>
            Share your surplus food with those in need. Please provide accurate information about your donation.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Donation Title</Label>
              <Input 
                id="title" 
                placeholder="e.g., Fresh Vegetables from Local Market"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="organizationName">Organization/NGO Name (Optional)</Label>
              <Input 
                id="organizationName" 
                placeholder="e.g., Food Helpers Inc."
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="image" className="block mb-2">Food Image</Label>
              <div className="flex flex-col items-center space-y-4">
                {imagePreview ? (
                  <div className="relative w-full max-w-md">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-60 object-cover rounded-md"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="absolute top-2 right-2 h-8 w-8 p-0"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                        setAiSuggestions(null);
                      }}
                    >
                      ✕
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-12 w-full max-w-md text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <div className="text-sm text-gray-600">
                        <Label htmlFor="image" className="cursor-pointer text-zerowaste-primary hover:text-zerowaste-success font-medium">
                          Upload an image
                        </Label>
                        <p className="mt-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                    </div>
                    <Input 
                      id="image" 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageChange} 
                      className="hidden"
                      required
                    />
                  </div>
                )}
                
                {imagePreview && (
                  <div className="w-full max-w-md">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full"
                      onClick={handleAnalyzeImage}
                      disabled={analyzeLoading}
                    >
                      {analyzeLoading ? 'Analyzing...' : 'Analyze Image with AI'}
                    </Button>
                    
                    {aiSuggestions && (
                      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-blue-700 text-sm">AI Suggestions</h4>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm"
                            className="h-6 text-xs"
                            onClick={applyAiSuggestions}
                          >
                            Apply All
                          </Button>
                        </div>
                        <ul className="mt-2 text-sm space-y-1">
                          {aiSuggestions.foodType && (
                            <li>Food Type: <span className="font-medium">{aiSuggestions.foodType}</span></li>
                          )}
                          {aiSuggestions.quantity && (
                            <li>Est. Quantity: <span className="font-medium">{aiSuggestions.quantity} kg</span></li>
                          )}
                          {aiSuggestions.isVegetarian !== undefined && (
                            <li>Vegetarian: <span className="font-medium">{aiSuggestions.isVegetarian ? 'Yes' : 'No'}</span></li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Food Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="foodType">Food Type</Label>
                <Input 
                  id="foodType" 
                  placeholder="e.g., Vegetables, Bread, Prepared Meal"
                  value={foodType}
                  onChange={(e) => setFoodType(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="isVegetarian" className="block mb-2">Is it Vegetarian?</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isVegetarian"
                    checked={isVegetarian}
                    onCheckedChange={setIsVegetarian}
                  />
                  <Label htmlFor="isVegetarian">{isVegetarian ? 'Yes' : 'No'}</Label>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <div className="flex">
                  <Input 
                    id="quantity" 
                    type="number"
                    min="0.1"
                    step="0.1"
                    placeholder="e.g., 5"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="rounded-r-none"
                    required
                  />
                  <Select value={quantityUnit} onValueChange={setQuantityUnit}>
                    <SelectTrigger className="w-[80px] rounded-l-none border-l-0">
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="g">g</SelectItem>
                      <SelectItem value="l">liters</SelectItem>
                      <SelectItem value="pcs">pcs</SelectItem>
                      <SelectItem value="servings">servings</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Food Expiry Date</Label>
                <Input 
                  id="expiryDate" 
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Provide more details about the food, such as ingredients, preparation date, storage conditions, etc."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Pickup Information</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input 
                    id="address" 
                    placeholder="e.g., 123 Main St."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    placeholder="e.g., New York"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input 
                    id="postalCode" 
                    placeholder="e.g., 10001"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input 
                    id="country" 
                    placeholder="e.g., United States"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pickupDeadline">Pickup Deadline</Label>
                <Input 
                  id="pickupDeadline" 
                  type="datetime-local"
                  value={pickupDeadline}
                  onChange={(e) => setPickupDeadline(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  This is the latest time the food can be picked up before it's no longer available.
                </p>
              </div>
              
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-sm">
                <p className="font-medium text-amber-800">Note about location privacy</p>
                <p className="text-amber-700 mt-1">
                  Your exact address will only be shown to approved receivers after you've accepted their request.
                  The public map will only show an approximate location.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button">Cancel</Button>
          <Button 
            type="submit" 
            className="bg-zerowaste-primary hover:bg-zerowaste-success"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Create Donation'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
