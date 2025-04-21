
import { Donation } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface DonationCardProps {
  donation: Donation;
  onView: (donation: Donation) => void;
  onRequest?: (donation: Donation) => void;
}

export default function DonationCard({ donation, onView, onRequest }: DonationCardProps) {
  // Get status color based on donation status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-zerowaste-primary bg-opacity-20 text-zerowaste-primary';
      case 'picked':
        return 'bg-purple-100 text-purple-800';
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate days until expiry
  const daysUntilExpiry = () => {
    const pickup = new Date(donation.pickup_deadline);
    const now = new Date();
    const diffTime = pickup.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) return 'Expired';
    if (diffDays === 1) return 'Today';
    return `${diffDays} days`;
  };
  
  // Format creation date
  const formattedDate = formatDistanceToNow(new Date(donation.created_at), { addSuffix: true });
  
  return (
    <Card className="overflow-hidden h-full flex flex-col border-2 hover:border-zerowaste-primary transition-colors">
      <div className="relative pt-[56.25%]">
        <img 
          src={donation.image_url || 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da'} 
          alt={donation.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge className={getStatusColor(donation.status)}>
            {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
          </Badge>
        </div>
        {donation.pickup_deadline && (
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
            {daysUntilExpiry()} left
          </div>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg line-clamp-2">{donation.title}</h3>
        </div>
        <p className="text-xs text-muted-foreground">{formattedDate}</p>
      </CardHeader>
      
      <CardContent className="pb-2 flex-grow">
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-zerowaste-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{donation.location.city}, {donation.location.country}</span>
          </div>
          <div className="flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-zerowaste-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
            <span>{donation.food_details.quantity} {donation.food_details.quantity_unit}</span>
          </div>
          <div className="flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-zerowaste-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
            </svg>
            <span>{donation.food_details.type}</span>
            {donation.food_details.is_vegetarian && (
              <Badge variant="outline" className="ml-2 text-xs bg-green-50 text-green-700 border-green-200">
                Vegetarian
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <div className="flex gap-2 w-full">
          <Button 
            variant="outline" 
            className="flex-1 border-zerowaste-primary text-zerowaste-primary hover:bg-zerowaste-primary hover:text-white"
            onClick={() => onView(donation)}
          >
            View Details
          </Button>
          
          {onRequest && (
            <Button 
              className="flex-1 bg-zerowaste-primary hover:bg-zerowaste-success text-white"
              onClick={() => onRequest(donation)}
            >
              Request
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
