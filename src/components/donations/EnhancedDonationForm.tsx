
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { MapPin, Calendar as CalendarIcon, Image, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";
import useAuth from '@/hooks/useAuth';

const EnhancedDonationForm = () => {
  const [title, setTitle] = useState('');
  const [foodType, setFoodType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('kg');
  const [isVegetarian, setIsVegetarian] = useState(true);
  const [isPerishable, setIsPerishable] = useState(true);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [deadline, setDeadline] = useState<Date | undefined>(new Date());
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [aiEstimatedQuantity, setAiEstimatedQuantity] = useState<string | null>(null);
  const [aiEstimatedType, setAiEstimatedType] = useState<string | null>(null);
  
  const { toast } = useToast();
  const { userProfile } = useAuth();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setImage(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
      
      // Simulate AI processing
      setAiProcessing(true);
      setTimeout(() => {
        setAiEstimatedQuantity((Math.random() * 5 + 1).toFixed(1));
        setAiEstimatedType(['Vegetables', 'Fruits', 'Bread', 'Cooked Food'][Math.floor(Math.random() * 4)]);
        setAiProcessing(false);
      }, 2000);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          
          // Simulate reverse geocoding
          setLocation(`Sample Address, Near ${Math.floor(Math.random() * 100)} Street, City`);
          setLoading(false);
          
          toast({
            title: "Location detected",
            description: "Your current location has been added to the form.",
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          setLoading(false);
          toast({
            title: "Location error",
            description: "Could not detect your location. Please enter it manually.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Location not supported",
        description: "Geolocation is not supported by your browser.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Donation posted successfully",
        description: "Your food donation has been posted and is now visible to recipients.",
      });
      
      // Reset form
      setTitle('');
      setFoodType('');
      setQuantity('');
      setUnit('kg');
      setIsVegetarian(true);
      setIsPerishable(true);
      setDescription('');
      setLocation('');
      setDeadline(new Date());
      setImage(null);
      setImagePreview(null);
      setAiEstimatedQuantity(null);
      setAiEstimatedType(null);
      setLoading(false);
    }, 1500);
  };

  return (
    <Card className="p-6 max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title">Donation Title</Label>
          <Input
            id="title"
            placeholder="E.g., Fresh Vegetables from Community Garden"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="image">Upload Food Image</Label>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 mt-1 cursor-pointer hover:bg-gray-50 transition-all">
              <input 
                type="file" 
                id="image" 
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <label htmlFor="image" className="cursor-pointer w-full h-full flex flex-col items-center">
                {imagePreview ? (
                  <img 
                    src={imagePreview} 
                    alt="Food preview" 
                    className="w-full h-40 object-cover rounded-lg"
                  />
                ) : (
                  <>
                    <Image className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Click to upload an image</p>
                    <p className="text-xs text-gray-400 mt-1">JPG, PNG or GIF. Max 5MB.</p>
                  </>
                )}
              </label>
            </div>
            {aiProcessing && (
              <p className="text-sm text-blue-600 animate-pulse mt-2 flex items-center">
                <span className="mr-2 h-2 w-2 bg-blue-600 rounded-full"></span>
                AI analyzing image...
              </p>
            )}
            {aiEstimatedQuantity && (
              <div className="mt-2 bg-green-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-green-800">AI Detected:</p>
                <p className="text-sm text-green-700">
                  ~ {aiEstimatedQuantity} {unit} of {aiEstimatedType}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Click to use these estimates or enter your own below.
                </p>
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="foodType">Food Type</Label>
              <Select value={foodType} onValueChange={setFoodType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select food type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vegetables">Vegetables</SelectItem>
                  <SelectItem value="fruits">Fruits</SelectItem>
                  <SelectItem value="grains">Grains & Rice</SelectItem>
                  <SelectItem value="dairy">Dairy Products</SelectItem>
                  <SelectItem value="bread">Bread & Bakery</SelectItem>
                  <SelectItem value="cooked">Cooked Food</SelectItem>
                  <SelectItem value="canned">Canned Goods</SelectItem>
                  <SelectItem value="packaged">Packaged Food</SelectItem>
                  <SelectItem value="beverages">Beverages</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <div className="flex">
                  <Input
                    id="quantity"
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="0.0"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                    className="rounded-r-none"
                  />
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger className="w-24 rounded-l-none border-l-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">Kg</SelectItem>
                      <SelectItem value="ltr">Liters</SelectItem>
                      <SelectItem value="items">Items</SelectItem>
                      <SelectItem value="servings">Servings</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label>Pickup Deadline</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {deadline ? format(deadline, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={deadline}
                      onSelect={setDeadline}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="isVegetarian" 
                  checked={isVegetarian}
                  onCheckedChange={setIsVegetarian}
                />
                <Label htmlFor="isVegetarian">Vegetarian</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="isPerishable" 
                  checked={isPerishable}
                  onCheckedChange={setIsPerishable}
                />
                <Label htmlFor="isPerishable">Perishable</Label>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Provide additional details about the food donation"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        
        <div>
          <div className="flex justify-between items-end mb-2">
            <Label htmlFor="location">Pickup Location</Label>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={getCurrentLocation}
              className="flex items-center text-xs"
              disabled={loading}
            >
              <MapPin className="h-3 w-3 mr-1" />
              {loading ? 'Detecting...' : 'Use Current Location'}
            </Button>
          </div>
          <Input
            id="location"
            placeholder="Enter pickup address"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          {userProfile?.organization_name && (
            <p className="text-sm text-gray-500 mt-2">
              Listed organization: {userProfile.organization_name}
            </p>
          )}
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-zerowaste-primary"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Post Food Donation'}
        </Button>
      </form>
    </Card>
  );
};

export default EnhancedDonationForm;
