import Layout from '@/components/layout/Layout';
import { MapPin, Filter, Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SampleDonationMap from '@/components/map/SampleDonationMap';

export default function GeoMapDashboard() {
  const [filterDistance, setFilterDistance] = useState<string>("10");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    document.title = "Food Availability Map - ZeroWaste";
  }, []);

  const sampleDonations = [
    {
      id: 1,
      title: "Fresh Vegetables",
      status: "available",
      location: "NGO Food Bank, Near Bus Stand",
      distance: "1.2 km",
      quantity: "5 kg",
      type: "Vegetarian"
    },
    {
      id: 2,
      title: "Rice and Lentils",
      status: "expiring",
      location: "Community Kitchen, Hospital Road",
      distance: "0.8 km",
      quantity: "10 kg",
      type: "Non-perishable"
    },
    {
      id: 3,
      title: "Bread and Pastries",
      status: "available",
      location: "Fresh Bakery, Market Street",
      distance: "2.1 km",
      quantity: "3 kg",
      type: "Vegetarian"
    },
    {
      id: 4,
      title: "Cooked Meals",
      status: "expiring",
      location: "Hotel Sunshine, Main Road",
      distance: "1.5 km",
      quantity: "20 meals",
      type: "Non-vegetarian"
    },
    {
      id: 5,
      title: "Fruits Assortment",
      status: "available",
      location: "Green Market, Temple Street",
      distance: "0.5 km",
      quantity: "8 kg",
      type: "Vegetarian"
    }
  ];

  return (
    <Layout requireAuth>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Food Availability Map</h1>
          <p className="text-gray-600 mt-2">Available food donations in Chittoor (517101)</p>
        </div>

        <Card className="p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-gray-500" />
                <Input 
                  placeholder="Search by location" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Select value={filterDistance} onValueChange={setFilterDistance}>
                <SelectTrigger>
                  <SelectValue placeholder="Distance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">Within 5 km</SelectItem>
                  <SelectItem value="10">Within 10 km</SelectItem>
                  <SelectItem value="15">Within 15 km</SelectItem>
                  <SelectItem value="20">Within 20 km</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Food Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="veg">Vegetarian</SelectItem>
                  <SelectItem value="nonveg">Non-Vegetarian</SelectItem>
                  <SelectItem value="perishable">Perishable</SelectItem>
                  <SelectItem value="nonperishable">Non-Perishable</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="fresh">Fresh & Available</SelectItem>
                  <SelectItem value="expiring">Near Expiry</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button className="bg-zerowaste-primary">
              <Filter className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {sampleDonations.map((donation) => (
            <Card key={donation.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{donation.title}</h3>
                  <p className="text-sm text-gray-600">{donation.location}</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm">Quantity: {donation.quantity}</p>
                    <p className="text-sm">Type: {donation.type}</p>
                    <p className="text-sm">Distance: {donation.distance}</p>
                  </div>
                </div>
                <Badge variant={donation.status === 'available' ? 'success' : 'warning'}>
                  {donation.status === 'available' ? 'Available' : 'Near Expiry'}
                </Badge>
              </div>
              <Button className="w-full mt-4">Request Pickup</Button>
            </Card>
          ))}
        </div>

        <Card className="relative overflow-hidden bg-white p-4">
          <div className="rounded-lg overflow-hidden h-[600px]">
            <SampleDonationMap />
          </div>
        </Card>
      </div>
    </Layout>
  );
}
