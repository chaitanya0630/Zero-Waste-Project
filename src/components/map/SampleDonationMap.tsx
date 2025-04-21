
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useToast } from '@/components/ui/use-toast';

// Sample donation data for India (focused on Delhi)
const donations = [
  {
    id: 1,
    position: [77.2090, 28.6139], // Delhi
    title: "Fresh Vegetables",
    description: "5kg of fresh vegetables from local market",
    status: "available"
  },
  {
    id: 2,
    position: [77.2270, 28.6350], // North Delhi
    title: "Rice and Lentils",
    description: "10kg rice and 2kg lentils",
    status: "pending"
  },
  {
    id: 3,
    position: [77.1855, 28.5245], // South Delhi
    title: "Bread and Pastries",
    description: "Assorted bread and pastries from bakery",
    status: "available"
  },
  {
    id: 4,
    position: [77.2410, 28.5670], // East Delhi
    title: "Cooked Meals",
    description: "20 packed meals ready for pickup",
    status: "completed"
  }
];

const SampleDonationMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const { toast } = useToast();

  // Function to get marker color based on donation status
  const getMarkerColor = (status: string): string => {
    switch (status) {
      case 'available':
        return '#10b981'; // Green
      case 'pending':
        return '#f59e0b'; // Amber
      case 'completed':
        return '#6366f1'; // Indigo
      default:
        return '#ef4444'; // Red
    }
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    // Using a public token for demo purposes
    // In production, this would be stored securely
    mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZS1haS1kZW1vIiwiYSI6ImNsbmZtZ3h1dTA0YmQydG54eGMwY2FpbHcifQ.a30MkQjtBRlgE_PgdPgkhw';

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [77.2090, 28.6139], // Delhi, India
      zoom: 11,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.current.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }));

    map.current.on('load', () => {
      if (!map.current) return;

      // Add markers for each donation
      donations.forEach(donation => {
        // Create a custom DOM element for the marker
        const el = document.createElement('div');
        el.className = 'donation-marker';
        el.style.width = '20px';
        el.style.height = '20px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = getMarkerColor(donation.status);
        el.style.border = '2px solid white';
        el.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
        el.style.cursor = 'pointer';
        el.style.transition = 'all 0.2s ease';

        // Pulse animation
        const pulse = document.createElement('div');
        pulse.className = 'donation-marker-pulse';
        pulse.style.position = 'absolute';
        pulse.style.width = '100%';
        pulse.style.height = '100%';
        pulse.style.borderRadius = '50%';
        pulse.style.backgroundColor = `${getMarkerColor(donation.status)}`;
        pulse.style.opacity = '0.6';
        pulse.style.animation = 'pulse 2s infinite';

        el.appendChild(pulse);

        // Add animation style
        const style = document.createElement('style');
        style.textContent = `
          @keyframes pulse {
            0% {
              transform: scale(1);
              opacity: 0.6;
            }
            70% {
              transform: scale(2);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 0;
            }
          }
        `;
        document.head.appendChild(style);

        // Create and add the marker
        const marker = new mapboxgl.Marker(el)
          .setLngLat(donation.position as [number, number])
          .setPopup(
            new mapboxgl.Popup({ offset: 25, closeButton: false })
              .setHTML(
                `<div style="padding: 10px; max-width: 200px;">
                  <h3 style="margin: 0 0 5px; font-weight: bold;">${donation.title}</h3>
                  <p style="margin: 0 0 8px;">${donation.description}</p>
                  <span style="display: inline-block; padding: 2px 8px; border-radius: 9999px; font-size: 0.75rem; text-transform: capitalize; background-color: ${getMarkerColor(donation.status)}25; color: ${getMarkerColor(donation.status)};">
                    ${donation.status}
                  </span>
                </div>`
              )
          )
          .addTo(map.current);

        markersRef.current.push(marker);

        // Show a toast when clicking on a donation
        el.addEventListener('click', () => {
          toast({
            title: donation.title,
            description: donation.status === 'available' 
              ? "This donation is available for pickup!" 
              : donation.status === 'pending' 
              ? "Someone has requested this donation" 
              : "This donation has been completed",
          });
        });
      });
    });

    return () => {
      map.current?.remove();
    };
  }, [toast]);

  return <div ref={mapContainer} className="w-full h-full rounded-lg" />;
};

export default SampleDonationMap;
