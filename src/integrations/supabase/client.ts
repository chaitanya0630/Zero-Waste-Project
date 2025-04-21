
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://gufxstuckhkhebngrbkx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1ZnhzdHVja2hraGVibmdyYmt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MDc5MDMsImV4cCI6MjA2MDI4MzkwM30.4A3xGlraG6rnzlFN36U7DTLC8PttEkYi4aE20beGzsU";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  }
});
