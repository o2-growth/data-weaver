// Reaproveita o client oficial gerado pela integração Lovable Cloud,
// que já lê as variáveis corretas (VITE_SUPABASE_URL + VITE_SUPABASE_PUBLISHABLE_KEY).
// Mantemos o mesmo formato exportado para não quebrar imports legados.
export { supabase } from '@/integrations/supabase/client';

export const isSupabaseConfigured = () => true;
