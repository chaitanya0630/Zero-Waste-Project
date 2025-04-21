
import { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { 
  ArrowRight, 
  Utensils, 
  MapPin, 
  MessageSquare, 
  Check, 
  Star, 
  PanelLeft,
  LightbulbIcon,
  Users,
  Heart
} from 'lucide-react';

const HowItWorks = () => {
  useEffect(() => {
    // Set page title
    document.title = "How It Works - ZeroWaste";
  }, []);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How ZeroWaste Works</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform makes it easy to donate and receive surplus food, 
            helping reduce waste and fight hunger in our communities.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-zerowaste-primary mb-8 text-center">
            Choose Your Role
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Donor Path */}
            <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-zerowaste-primary">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-zerowaste-primary bg-opacity-10">
                <Utensils className="h-6 w-6 text-zerowaste-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Food Donor</h3>
              <p className="text-gray-600 mb-4">
                Restaurants, grocery stores, bakeries, cafes, and individuals with surplus food to share.
              </p>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-zerowaste-primary">•</span>
                  <span>List surplus food items</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-zerowaste-primary">•</span>
                  <span>Set pickup times and locations</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-zerowaste-primary">•</span>
                  <span>Review and approve requests</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-zerowaste-primary">•</span>
                  <span>Track your impact over time</span>
                </li>
              </ul>
            </div>
            
            {/* Receiver Path */}
            <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-zerowaste-success">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-zerowaste-success bg-opacity-10">
                <Users className="h-6 w-6 text-zerowaste-success" />
              </div>
              <h3 className="text-xl font-bold mb-2">Food Receiver</h3>
              <p className="text-gray-600 mb-4">
                Non-profits, community organizations, shelters, and food banks that serve those in need.
              </p>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-zerowaste-success">•</span>
                  <span>Browse available food donations</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-zerowaste-success">•</span>
                  <span>Request items that match your needs</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-zerowaste-success">•</span>
                  <span>Coordinate pickup with donors</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-zerowaste-success">•</span>
                  <span>Distribute food to your community</span>
                </li>
              </ul>
            </div>
            
            {/* Volunteer Path */}
            <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-blue-500">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 bg-opacity-10">
                <Heart className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Volunteer</h3>
              <p className="text-gray-600 mb-4">
                Individuals who want to help by transporting food from donors to receivers.
              </p>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-blue-500">•</span>
                  <span>View transport opportunities</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-blue-500">•</span>
                  <span>Sign up for delivery routes</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-blue-500">•</span>
                  <span>Assist with food pickups and deliveries</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-blue-500">•</span>
                  <span>Track your volunteer impact</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-zerowaste-primary mb-8 text-center">
            The ZeroWaste Process
          </h2>
          
          <div className="relative">
            {/* Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="relative">
                <div className="z-10 bg-white p-6 rounded-lg shadow-md h-full">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-zerowaste-primary text-white font-bold">
                    1
                  </div>
                  <h3 className="text-lg font-bold mb-2">List Donation</h3>
                  <p className="text-gray-600">
                    Donors list available food items with details about quantity, expiration, and pickup information.
                  </p>
                </div>
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-20">
                  <ArrowRight className="h-8 w-8 text-zerowaste-primary" />
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative">
                <div className="z-10 bg-white p-6 rounded-lg shadow-md h-full">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-zerowaste-primary text-white font-bold">
                    2
                  </div>
                  <h3 className="text-lg font-bold mb-2">Find Food</h3>
                  <p className="text-gray-600">
                    Receivers browse available donations on the map or list view and request items they can use.
                  </p>
                </div>
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-20">
                  <ArrowRight className="h-8 w-8 text-zerowaste-primary" />
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="relative">
                <div className="z-10 bg-white p-6 rounded-lg shadow-md h-full">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-zerowaste-primary text-white font-bold">
                    3
                  </div>
                  <h3 className="text-lg font-bold mb-2">Coordinate Pickup</h3>
                  <p className="text-gray-600">
                    Donors approve requests and arrangements are made for pickup or delivery, possibly with volunteer help.
                  </p>
                </div>
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-20">
                  <ArrowRight className="h-8 w-8 text-zerowaste-primary" />
                </div>
              </div>
              
              {/* Step 4 */}
              <div>
                <div className="z-10 bg-white p-6 rounded-lg shadow-md h-full">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-zerowaste-primary text-white font-bold">
                    4
                  </div>
                  <h3 className="text-lg font-bold mb-2">Complete & Track</h3>
                  <p className="text-gray-600">
                    Food is transferred, the transaction is recorded, and everyone's impact is tracked in the system.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Features Designed to Help</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <MapPin className="h-10 w-10 text-zerowaste-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">Interactive Map</h3>
              <p className="text-gray-600">
                Visual map showing all available food donations in your area with filtering options.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <MessageSquare className="h-10 w-10 text-zerowaste-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">In-App Messaging</h3>
              <p className="text-gray-600">
                Coordinate details directly through our secure messaging system.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <PanelLeft className="h-10 w-10 text-zerowaste-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">Customized Dashboards</h3>
              <p className="text-gray-600">
                Personalized interfaces for donors, receivers, and volunteers.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <Check className="h-10 w-10 text-zerowaste-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">Verification System</h3>
              <p className="text-gray-600">
                Trust and safety features ensure all users are verified.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <Star className="h-10 w-10 text-zerowaste-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">Ratings & Reviews</h3>
              <p className="text-gray-600">
                Build reputation through feedback after completed transactions.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <LightbulbIcon className="h-10 w-10 text-zerowaste-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">Impact Analytics</h3>
              <p className="text-gray-600">
                Track food saved, carbon emissions prevented, and people served.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="/auth" className="bg-zerowaste-primary hover:bg-zerowaste-success text-white py-3 px-8 rounded-md">
              Create Your Account
            </a>
            <a href="/about" className="border border-zerowaste-primary text-zerowaste-primary hover:bg-gray-50 py-3 px-8 rounded-md">
              Learn More About Us
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HowItWorks;
