
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Request } from "@/types";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";

interface RequestsListProps {
  requests: Request[];
  onStatusChange?: (requestId: string, newStatus: 'pending' | 'accepted' | 'rejected') => void;
}

export default function RequestsList({ requests, onStatusChange }: RequestsListProps) {
  const { toast } = useToast();
  const { userId } = useAuth();
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const updateRequestStatus = async (requestId: string, newStatus: 'pending' | 'accepted' | 'rejected') => {
    // Set loading state for this request
    setLoadingStates(prev => ({ ...prev, [requestId]: true }));

    try {
      const { error } = await supabase
        .from('requests')
        .update({ status: newStatus })
        .eq('id', requestId);

      if (error) {
        throw error;
      }

      // Also update donation status if request is accepted
      if (newStatus === 'accepted') {
        const request = requests.find(r => r.id === requestId);
        if (request && request.donations) {
          const { error: donationError } = await supabase
            .from('donations')
            .update({ status: 'accepted' })
            .eq('id', request.donations.id);

          if (donationError) {
            throw donationError;
          }
        }
      }

      toast({
        title: "Request updated",
        description: `The request has been ${newStatus}.`,
      });

      // Call parent component callback if provided
      if (onStatusChange) {
        onStatusChange(requestId, newStatus);
      }
    } catch (error: any) {
      toast({
        title: "Error updating request",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      // Clear loading state
      setLoadingStates(prev => ({ ...prev, [requestId]: false }));
    }
  };

  if (requests.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Requests</CardTitle>
          <CardDescription>No requests found.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Requests</CardTitle>
        <CardDescription>Manage your food requests</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {requests.map((request) => (
          <Card key={request.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">
                      {request.donations?.title || "Unnamed Donation"}
                    </h3>
                    <Badge 
                      variant={
                        request.status === "accepted" ? "outline" :
                        request.status === "rejected" ? "destructive" : "default"
                      }
                    >
                      {request.status}
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    From: {request.profiles?.first_name} {request.profiles?.last_name}
                  </div>
                  
                  {request.message && (
                    <p className="text-sm mt-2 border-l-2 border-gray-200 pl-3 italic">
                      "{request.message}"
                    </p>
                  )}
                  
                  <div className="text-xs text-muted-foreground mt-2">
                    Requested: {format(new Date(request.created_at), 'PPP')}
                  </div>
                </div>
                
                {userId && request.status === 'pending' && (
                  <div className="flex gap-2 self-end">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={loadingStates[request.id]}
                      onClick={() => updateRequestStatus(request.id, 'accepted')}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={loadingStates[request.id]}
                      onClick={() => updateRequestStatus(request.id, 'rejected')}
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
