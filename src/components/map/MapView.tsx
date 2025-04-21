
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Donation } from '@/types';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface MapViewProps {
  filterDistance?: number;
  filterFoodType?: string | null;
  filterVegetarian?: boolean | null;
  filterFreshness?: string | null;
  organizationName?: string;
  isLoggedIn?: boolean;
}

export default function MapView({ 
  filterDistance = 10,
  filterFoodType = null,
  filterVegetarian = null,
  filterFreshness = null,
  organizationName = '',
  isLoggedIn = false
}: MapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  // Initialize map when component mounts
  useEffect(() => {
    // Check if the user has stored a Mapbox token in localStorage
    const storedToken = localStorage.getItem('mapboxToken');
    if (storedToken) {
      setMapboxToken(storedToken);
      setShowTokenInput(false);
    } else {
      setShowTokenInput(true);
    }

    // Try to get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { longitude, latitude } = position.coords;
        setUserLocation([longitude, latitude]);
      }, (error) => {
        console.error("Error getting location:", error);
        // Default to Tirupati, Andhra Pradesh, India if location access is denied
        setUserLocation([79.4192, 13.6288]); // Tirupati coordinates
      });
    } else {
      // Default to Tirupati if geolocation is not supported
      setUserLocation([79.4192, 13.6288]); // Tirupati coordinates
    }
  }, []);

  // Fetch donations from database
  useEffect(() => {
    const fetchDonations = async () => {
      if (!mapLoaded) return;

      try {
        const { data, error } = await supabase
          .from('donations')
          .select(`
            *,
            profiles:donor_id(*)
          `)
          .eq('status', 'pending');

        if (error) {
          console.error("Error fetching donations:", error);
          return;
        }

        if (data) {
          // Convert JSON data to match our type structure
          const typedDonations = data.map(d => ({
            ...d,
            food_details: d.food_details as unknown as Donation["food_details"],
            location: d.location as unknown as Donation["location"]
          }));
          
          setDonations(typedDonations);
          
          // Clear existing markers
          markers.current.forEach(marker => marker.remove());
          markers.current = [];

          // Add markers for new data
          typedDonations.forEach(donation => {
            // Apply filters
            if (!shouldShowDonation(donation)) return;

            addMarker(donation);
          });
        }
      } catch (error) {
        console.error("Error in fetchDonations:", error);
      }
    };

    fetchDonations();
  }, [mapLoaded, filterDistance, filterFoodType, filterVegetarian, filterFreshness]);

  // Initialize the map
  useEffect(() => {
    // Only initialize the map if we have a token and user location
    if (!mapboxToken || !mapContainerRef.current || !userLocation) return;
    
    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: userLocation, // Center on user's location
        zoom: 12
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.current.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      }));

      // Add user location marker
      new mapboxgl.Marker({ color: '#1E40AF' })
        .setLngLat(userLocation)
        .setPopup(new mapboxgl.Popup().setHTML('<div class="p-2"><strong>Your Location</strong></div>'))
        .addTo(map.current);

      map.current.on('load', () => {
        setMapLoaded(true);
      });

      return () => {
        // Cleanup markers
        markers.current.forEach(marker => marker.remove());
        markers.current = [];
        
        // Cleanup map
        if (map.current) {
          map.current.remove();
          map.current = null;
        }
      };
    } catch (error) {
      console.error("Error initializing map:", error);
      toast({
        title: "Map Error",
        description: "There was an error initializing the map. Please check your Mapbox token.",
        variant: "destructive"
      });
      setShowTokenInput(true);
    }
  }, [mapboxToken, userLocation, toast]);

  const shouldShowDonation = (donation: Donation): boolean => {
    // Apply food type filter
    if (filterFoodType && donation.food_details.type.toLowerCase() !== filterFoodType) {
      return false;
    }

    // Apply vegetarian filter
    if (filterVegetarian !== null && donation.food_details.is_vegetarian !== filterVegetarian) {
      return false;
    }

    // Apply freshness filter
    if (filterFreshness) {
      const isExpiring = new Date(donation.food_details.expiry_date).getTime() - Date.now() < 86400000 * 3; // 3 days
      if (filterFreshness === 'fresh' && isExpiring) {
        return false;
      }
      if (filterFreshness === 'expiring' && !isExpiring) {
        return false;
      }
    }

    // Apply distance filter
    if (userLocation && filterDistance) {
      const donationLocation: [number, number] = [donation.location.longitude, donation.location.latitude];
      const distance = calculateDistance(userLocation, donationLocation);
      return distance <= filterDistance;
    }

    return true;
  };

  const calculateDistance = (point1: [number, number], point2: [number, number]): number => {
    // Haversine formula for calculating distance between two points on Earth
    const [lon1, lat1] = point1;
    const [lon2, lat2] = point2;
    
    const toRadian = (degree: number) => degree * (Math.PI / 180);
    
    const R = 6371; // Earth's radius in km
    const dLat = toRadian(lat2 - lat1);
    const dLon = toRadian(lon2 - lon1);
    
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(toRadian(lat1)) * Math.cos(toRadian(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
      
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance;
  };

  const handleRequestFood = (donation: Donation) => {
    setSelectedDonation(donation);
    setRequestDialogOpen(true);
  };

  const handleSubmitRequest = async () => {
    if (!selectedDonation) return;
    
    setSubmitting(true);
    
    try {
      // This is a mock submission - in a real app, this would create a request in the database
      console.log("Submitting request:", {
        donationId: selectedDonation.id,
        message: requestMessage,
        organizationName
      });
      
      // Simulate API call
      setTimeout(() => {
        setSubmitting(false);
        setRequestDialogOpen(false);
        setRequestMessage('');
        
        // Show success message
        toast({
          title: "Request Sent!",
          description: "Your food request has been sent to the donor. You will be notified when they respond.",
        });
      }, 1500);
    } catch (error) {
      console.error("Error submitting request:", error);
      setSubmitting(false);
      
      toast({
        title: "Error",
        description: "There was a problem sending your request. Please try again.",
        variant: "destructive"
      });
    }
  };

  const addMarker = (donation: any) => {
    if (!map.current) return;
    
    // Determine marker color based on status and expiry date
    let color;
    const now = new Date();
    const expiryDate = new Date(donation.food_details.expiry_date);
    const timeUntilExpiry = expiryDate.getTime() - now.getTime();
    const hoursUntilExpiry = timeUntilExpiry / (1000 * 60 * 60);
    
    if (donation.status === 'pending') {
      if (hoursUntilExpiry <= 24) {
        color = '#F59E0B'; // Yellow/Orange for expiring soon (within 24 hours)
      } else {
        color = '#10B981'; // Green for fresh
      }
    } else if (donation.status === 'accepted') {
      color = '#6366F1'; // Purple for accepted
    } else {
      color = '#EF4444'; // Red for expired or unavailable
    }
    
    // Create popup for marker
    const popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML(`
        <div class="p-3 max-w-xs">
          <h3 class="font-semibold text-base mb-1">${donation.title}</h3>
          <p class="text-xs text-gray-600 mb-2">${donation.location.address}, ${donation.location.city}</p>
          <div class="flex items-center gap-2 mb-2">
            <span class="text-xs font-medium bg-gray-100 px-2 py-1 rounded">
              ${donation.food_details.type}
            </span>
            ${donation.food_details.is_vegetarian ? 
              '<span class="text-xs text-white bg-green-600 px-2 py-1 rounded">Vegetarian</span>' : 
              '<span class="text-xs text-white bg-red-500 px-2 py-1 rounded">Non-Veg</span>'}
          </div>
          <p class="text-xs mt-1">
            <span class="font-medium">Quantity:</span> ${donation.food_details.quantity} ${donation.food_details.quantity_unit}
          </p>
          <p class="text-xs">
            <span class="font-medium">Pickup by:</span> ${new Date(donation.pickup_deadline).toLocaleString()}
          </p>
          <button id="request-btn-${donation.id}" class="mt-3 bg-zerowaste-primary text-white text-xs px-4 py-1 rounded hover:bg-zerowaste-success w-full">
            Request Pickup
          </button>
          ${!isLoggedIn ? '<p class="text-xs text-gray-500 mt-1 text-center">(Sign in required)</p>' : ''}
        </div>
      `);
    
    // Create and add marker
    const marker = new mapboxgl.Marker({ color })
      .setLngLat([donation.location.longitude, donation.location.latitude])
      .setPopup(popup)
      .addTo(map.current);
    
    markers.current.push(marker);
    
    // Add event listener to request button
    popup.on('open', () => {
      setTimeout(() => {
        const requestBtn = document.getElementById(`request-btn-${donation.id}`);
        if (requestBtn) {
          requestBtn.addEventListener('click', () => {
            if (!isLoggedIn) {
              toast({
                title: "Sign In Required",
                description: "Please sign in to request food pickup.",
                variant: "destructive"
              });
              return;
            }
            handleRequestFood(donation);
          });
        }
      }, 10);
    });
  };

  const handleSaveToken = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem('mapboxToken', mapboxToken);
    setShowTokenInput(false);
    toast({
      title: "Token Saved",
      description: "Your Mapbox token has been saved.",
    });
  };

  return (
    <>
      <div className="relative w-full h-[70vh] rounded-lg overflow-hidden shadow-lg">
        {showTokenInput ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-lg font-semibold text-zerowaste-primary mb-4">Mapbox Token Required</h3>
              <p className="text-sm text-gray-600 mb-4">
                To use the map feature, please provide your Mapbox public token. You can get one for free at{" "}
                <a 
                  href="https://mapbox.com/account/access-tokens" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  mapbox.com
                </a>
              </p>
              <form onSubmit={handleSaveToken}>
                <input 
                  type="text" 
                  value={mapboxToken} 
                  onChange={e => setMapboxToken(e.target.value)} 
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  placeholder="Enter your Mapbox public token"
                  required
                />
                <button 
                  type="submit" 
                  className="w-full py-2 bg-zerowaste-primary text-white rounded hover:bg-zerowaste-success"
                >
                  Save Token
                </button>
              </form>
            </div>
          </div>
        ) : (
          <>
            <div ref={mapContainerRef} className="w-full h-full bg-gray-100">
              {!mapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zerowaste-primary"></div>
                </div>
              )}
            </div>
            
            <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow space-y-2">
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-500 mb-1">Food Status</span>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                    <span className="text-xs">Fresh & Available</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                    <span className="text-xs">Near Expiry (24h)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></span>
                    <span className="text-xs">Accepted</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                    <span className="text-xs">Expired/Unavailable</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Food Request Dialog */}
      <Dialog open={requestDialogOpen} onOpenChange={setRequestDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Food Pickup</DialogTitle>
            <DialogDescription>
              Send a request to pick up this food donation. Include any specific details about your pickup.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm font-medium">Food Details</p>
              <p className="text-sm">{selectedDonation?.title}</p>
              <p className="text-xs text-gray-500 mt-1">
                {selectedDonation?.food_details.quantity} {selectedDonation?.food_details.quantity_unit} • 
                {selectedDonation?.food_details.is_vegetarian ? ' Vegetarian' : ' Non-Vegetarian'}
              </p>
            </div>
            
            {organizationName && (
              <div className="bg-blue-50 p-3 rounded-md">
                <p className="text-sm font-medium text-blue-800">Organization</p>
                <p className="text-sm text-blue-700">{organizationName}</p>
              </div>
            )}

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message to Donor
              </label>
              <Textarea
                id="message"
                placeholder="Introduce yourself and explain when you'd like to pick up the food..."
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              onClick={handleSubmitRequest} 
              className="bg-zerowaste-primary hover:bg-zerowaste-success"
              disabled={submitting}
            >
              {submitting ? 'Sending Request...' : 'Send Request'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
