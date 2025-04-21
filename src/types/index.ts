
export type UserRole = 'donor' | 'receiver' | 'volunteer' | 'admin';

export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  role: UserRole;
  organization_name?: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export type DonationStatus = 'pending' | 'accepted' | 'picked' | 'verified' | 'expired';

export interface FoodDetails {
  type: string;
  is_vegetarian: boolean;
  quantity: number;
  quantity_unit: string;
  expiry_date: string;
  description: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  postal_code: string;
  country: string;
}

export interface Donation {
  id: string;
  donor_id: string;
  title: string;
  food_details: FoodDetails;
  image_url: string;
  location: Location;
  pickup_deadline: string;
  status: DonationStatus;
  created_at: string;
  updated_at: string;
  profiles?: Profile; // Optional join with profiles
}

export interface Request {
  id: string;
  donation_id: string;
  receiver_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  message?: string;
  created_at: string;
  donations?: Donation; // Optional join with donations
  profiles?: Profile; // Optional join with profiles
}

export interface Transaction {
  id: string;
  donation_id: string;
  donor_id: string;
  receiver_id: string;
  volunteer_id?: string;
  completed_at: string;
  feedback?: string;
  rating?: number;
  food_saved_kg: number;
  co2_saved_kg: number;
  people_served?: number;
}

export interface Verification {
  id: string;
  user_id: string;
  document_urls: string[];
  status: 'pending' | 'verified' | 'rejected';
  admin_notes?: string;
  submitted_at: string;
  verified_at?: string;
}
