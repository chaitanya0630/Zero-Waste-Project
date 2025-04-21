import { create } from 'zustand';
import { UserRole } from '@/types';

interface AuthState {
  isLoggedIn: boolean;
  userId: string | null;
  userRole: UserRole | null;
  userProfile: {
    first_name: string;
    last_name: string;
    avatar_url: string | null;
  } | null;
  setLoggedIn: (userId: string, userRole: UserRole, profile: any) => void;
  setLoggedOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  userId: null,
  userRole: null,
  userProfile: null,
  setLoggedIn: (userId, userRole, profile) => set({
    isLoggedIn: true,
    userId,
    userRole,
    userProfile: {
      first_name: profile.first_name,
      last_name: profile.last_name,
      avatar_url: profile.avatar_url,
    },
  }),
  setLoggedOut: () => set({
    isLoggedIn: false,
    userId: null,
    userRole: null,
    userProfile: null,
  }),
}));

interface DonationsState {
  donations: any[];
  loading: boolean;
  setDonations: (donations: any[]) => void;
  addDonation: (donation: any) => void;
  updateDonation: (id: string, updatedDonation: any) => void;
  setLoading: (loading: boolean) => void;
}

export const useDonationsStore = create<DonationsState>((set) => ({
  donations: [],
  loading: false,
  setDonations: (donations) => set({ donations }),
  addDonation: (donation) => set((state) => ({ 
    donations: [donation, ...state.donations] 
  })),
  updateDonation: (id, updatedDonation) => set((state) => ({
    donations: state.donations.map(d => 
      d.id === id ? { ...d, ...updatedDonation } : d
    )
  })),
  setLoading: (loading) => set({ loading }),
}));

interface MapState {
  center: [number, number];
  zoom: number;
  filterRadius: number;
  filterFoodType: string | null;
  filterVegetarian: boolean | null;
  setCenter: (center: [number, number]) => void;
  setZoom: (zoom: number) => void;
  setFilters: (filters: { radius?: number; foodType?: string | null; vegetarian?: boolean | null }) => void;
}

export const useMapStore = create<MapState>((set) => ({
  center: [0, 0],
  zoom: 2,
  filterRadius: 10,
  filterFoodType: null,
  filterVegetarian: null,
  setCenter: (center) => set({ center }),
  setZoom: (zoom) => set({ zoom }),
  setFilters: (filters) => set((state) => ({
    filterRadius: filters.radius ?? state.filterRadius,
    filterFoodType: filters.foodType !== undefined ? filters.foodType : state.filterFoodType,
    filterVegetarian: filters.vegetarian !== undefined ? filters.vegetarian : state.filterVegetarian,
  })),
}));
