
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { initSectionAnimations } from "./utils/animationObserver";
import { AuthProvider } from "./hooks/useAuth";
import "./App.css";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Map from "./pages/Map";
import Donate from "./pages/Donate";
import AboutUs from "./pages/AboutUs";
import HowItWorks from "./pages/HowItWorks";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

// Dashboard routes
import DonorDashboard from "./pages/dashboard/DonorDashboard";
import ReceiverDashboard from "./pages/dashboard/ReceiverDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import GeoMapDashboard from "./pages/dashboard/GeoMapDashboard";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize animations when the app mounts
    const observer = initSectionAnimations();
    
    // Clean up observer when app unmounts
    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/map" element={<Map />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/profile" element={<Profile />} />
              
              {/* Dashboard routes */}
              <Route path="/dashboard/donor" element={<DonorDashboard />} />
              <Route path="/dashboard/receiver" element={<ReceiverDashboard />} />
              <Route path="/dashboard/admin" element={<AdminDashboard />} />
              <Route path="/dashboard/geomap" element={<GeoMapDashboard />} />
              
              {/* For backward compatibility */}
              <Route path="/receiver" element={<ReceiverDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
