
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Donation } from "@/types";
import { MapPin, Clock, Utensils, Calendar } from "lucide-react";
import { formatDistanceToNow, parseISO } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface DonationsListProps {
  donations: Donation[];
  isLoading?: boolean;
  receiverId?: string;
}

const DonationsList = ({ 
  donations, 
  isLoading = false, 
  receiverId 
}: DonationsListProps) => {
  const [message, setMessage] = useState("");
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const { toast } = useToast();

  const handleRequest = async () => {
    if (!selectedDonation || !receiverId) return;

    try {
      const { error } = await supabase
        .from('requests')
        .insert({
          donation_id: selectedDonation.id,
          receiver_id: receiverId,
          message: message || null,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Request Submitted",
        description: "Your request for this donation has been sent to the donor.",
      });

      setMessage("");
      setSelectedDonation(null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading available donations...</div>;
  }

  if (donations.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <p className="text-lg text-muted-foreground mb-2">No available donations found</p>
          <p className="text-sm text-muted-foreground">Check back later for new food donations</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {donations.map((donation) => (
        <Card key={donation.id} className="overflow-hidden">
          <div className="h-48 overflow-hidden">
            <img 
              src={donation.image_url || '/placeholder.svg'} 
              alt={donation.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle>{donation.title}</CardTitle>
              <Badge variant="outline" className="ml-2">
                {donation.food_details.type}
              </Badge>
            </div>
            <CardDescription className="flex items-center mt-1">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              {donation.location.city}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center text-sm">
              <Utensils className="h-3.5 w-3.5 mr-2" />
              {donation.food_details.quantity} {donation.food_details.quantity_unit}
              {donation.food_details.is_vegetarian && (
                <Badge variant="secondary" className="ml-2">Vegetarian</Badge>
              )}
            </div>
            <div className="flex items-center text-sm">
              <Clock className="h-3.5 w-3.5 mr-2" />
              Pickup deadline: {formatDistanceToNow(parseISO(donation.pickup_deadline), { addSuffix: true })}
            </div>
            <div className="flex items-center text-sm">
              <Calendar className="h-3.5 w-3.5 mr-2" />
              Expires: {formatDistanceToNow(parseISO(donation.food_details.expiry_date), { addSuffix: true })}
            </div>
          </CardContent>
          {receiverId && (
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full" 
                    onClick={() => setSelectedDonation(donation)}
                  >
                    Request This Food
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Request Food Donation</DialogTitle>
                    <DialogDescription>
                      Send a request to the donor for this food item. You can include a message with your request.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <h4 className="font-medium mb-2">{selectedDonation?.title}</h4>
                    <Textarea
                      placeholder="Add a message for the donor (optional)"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => {
                      setMessage("");
                      setSelectedDonation(null);
                    }}>
                      Cancel
                    </Button>
                    <Button onClick={handleRequest}>Submit Request</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
};

export default DonationsList;
