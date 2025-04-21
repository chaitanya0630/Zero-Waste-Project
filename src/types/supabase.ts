
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          first_name: string
          last_name: string
          avatar_url: string | null
          role: string
          organization_name: string | null
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          first_name: string
          last_name: string
          avatar_url?: string | null
          role: string
          organization_name?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          first_name?: string
          last_name?: string
          avatar_url?: string | null
          role?: string
          organization_name?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      donations: {
        Row: {
          id: string
          donor_id: string
          title: string
          food_details: Json
          image_url: string
          location: Json
          pickup_deadline: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          donor_id: string
          title: string
          food_details: Json
          image_url: string
          location: Json
          pickup_deadline: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          donor_id?: string
          title?: string
          food_details?: Json
          image_url?: string
          location?: Json
          pickup_deadline?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      requests: {
        Row: {
          id: string
          donation_id: string
          receiver_id: string
          status: string
          message: string | null
          created_at: string
        }
        Insert: {
          id?: string
          donation_id: string
          receiver_id: string
          status?: string
          message?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          donation_id?: string
          receiver_id?: string
          status?: string
          message?: string | null
          created_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          donation_id: string
          donor_id: string
          receiver_id: string
          volunteer_id: string | null
          completed_at: string
          feedback: string | null
          rating: number | null
          food_saved_kg: number
          co2_saved_kg: number
          people_served: number | null
        }
        Insert: {
          id?: string
          donation_id: string
          donor_id: string
          receiver_id: string
          volunteer_id?: string | null
          completed_at: string
          feedback?: string | null
          rating?: number | null
          food_saved_kg: number
          co2_saved_kg: number
          people_served?: number | null
        }
        Update: {
          id?: string
          donation_id?: string
          donor_id?: string
          receiver_id?: string
          volunteer_id?: string | null
          completed_at?: string
          feedback?: string | null
          rating?: number | null
          food_saved_kg?: number
          co2_saved_kg?: number
          people_served?: number | null
        }
      }
      verifications: {
        Row: {
          id: string
          user_id: string
          document_urls: string[]
          status: string
          admin_notes: string | null
          submitted_at: string
          verified_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          document_urls: string[]
          status?: string
          admin_notes?: string | null
          submitted_at?: string
          verified_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          document_urls?: string[]
          status?: string
          admin_notes?: string | null
          submitted_at?: string
          verified_at?: string | null
        }
      }
      analytics: {
        Row: {
          id: string
          food_saved_total_kg: number
          co2_saved_total_kg: number
          people_served_total: number
          active_donors: number
          active_receivers: number
          total_transactions: number
          last_updated: string
        }
        Insert: {
          id?: string
          food_saved_total_kg: number
          co2_saved_total_kg: number
          people_served_total: number
          active_donors: number
          active_receivers: number
          total_transactions: number
          last_updated?: string
        }
        Update: {
          id?: string
          food_saved_total_kg?: number
          co2_saved_total_kg?: number
          people_served_total?: number
          active_donors?: number
          active_receivers?: number
          total_transactions?: number
          last_updated?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
