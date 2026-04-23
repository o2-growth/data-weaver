import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

const FALLBACK_BACKEND_URL = 'https://dirxnmhkydjudzpzjksq.supabase.co';
const FALLBACK_PUBLISHABLE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpcnhubWhreWRqdWR6cHpqa3NxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3MDAyMzEsImV4cCI6MjA5MjI3NjIzMX0.XCWf24DiOP3wnYn3Gu-mToi-ll7qEgbjkeMOxbK-7bw';

const backendUrl = import.meta.env.VITE_SUPABASE_URL || FALLBACK_BACKEND_URL;
const publishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  FALLBACK_PUBLISHABLE_KEY;

export const supabase = createClient<Database>(backendUrl, publishableKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});

export const isSupabaseConfigured = () => Boolean(backendUrl && publishableKey);
