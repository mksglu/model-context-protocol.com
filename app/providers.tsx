'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { createClient } from '@/backend/supabase/client';

import { SupabaseClient } from '@supabase/supabase-js';

export const SupabaseContext = createContext<SupabaseClient | null>(null);

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider!');
  }
  return context;
};

interface SupabaseProviderProps {
  children: ReactNode;
}

export default function SupabaseProvider({ children }: SupabaseProviderProps) {
  const [supabaseClient, setSupabaseClient] = useState<SupabaseClient | null>(null);

  useEffect(() => {
    try {
      const client = createClient();
      setSupabaseClient(client);
    } catch (error) {
      console.error('Error creating Supabase client:', error);
    }
  }, []);

  return <SupabaseContext.Provider value={supabaseClient}>{children}</SupabaseContext.Provider>;
}
