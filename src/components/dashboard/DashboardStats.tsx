
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, Clock, CheckCheck, Users, Leaf, Scale } from "lucide-react";

interface DashboardStatsProps {
  requestsCount: number;
  pendingRequestsCount: number;
  acceptedRequestsCount: number;
  peopleServed?: number;
  foodSavedKg?: number;
  co2SavedKg?: number;
}

const DashboardStats = ({ 
  requestsCount, 
  pendingRequestsCount, 
  acceptedRequestsCount,
  peopleServed = 0,
  foodSavedKg = 0,
  co2SavedKg = 0
}: DashboardStatsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
          <ClipboardList className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{requestsCount}</div>
          <p className="text-xs text-muted-foreground">Food requests submitted</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingRequestsCount}</div>
          <p className="text-xs text-muted-foreground">Awaiting approval</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Accepted</CardTitle>
          <CheckCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{acceptedRequestsCount}</div>
          <p className="text-xs text-muted-foreground">Ready for pickup</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">People Served</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{peopleServed}</div>
          <p className="text-xs text-muted-foreground">Individuals helped</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Food Saved</CardTitle>
          <Scale className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{foodSavedKg} kg</div>
          <p className="text-xs text-muted-foreground">Total rescued</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">CO₂ Prevented</CardTitle>
          <Leaf className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{co2SavedKg} kg</div>
          <p className="text-xs text-muted-foreground">Emissions saved</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
