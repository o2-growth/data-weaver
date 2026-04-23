// ============================================================
// AuthContext — Dual Mode (Local / Supabase)
// Se Supabase não configurado: auto-login como usuário local
// Se configurado: autenticação real via Supabase Auth
// ============================================================

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export interface User {
  id: string;
  email: string;
  name: string;
}

export type UserRole = 'admin' | 'analyst' | 'intern';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  role: UserRole;
  isAdmin: boolean;
  isSupabaseMode: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const ADMIN_EMAILS = ['andrey.lopes@o2inc.com.br'];

const LOCAL_USER: User = {
  id: 'local-user',
  email: 'local@o2inc.com',
  name: 'Usuário Local',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>('admin');
  const [isLoading, setIsLoading] = useState(true);

  const isSupabaseMode = isSupabaseConfigured();

  // Mapeia SupabaseUser para nosso User
  const mapUser = useCallback(
    (supabaseUser: SupabaseUser): User => ({
      id: supabaseUser.id,
      email: supabaseUser.email ?? '',
      name: supabaseUser.user_metadata?.nome_completo ?? supabaseUser.email ?? '',
    }),
    []
  );

  // Buscar role do usuário no banco
  const fetchRole = useCallback(
    async (userId: string) => {
      if (!supabase) return 'admin' as UserRole;

      const { data } = await supabase
        .from('usuarios')
        .select('role')
        .eq('id', userId)
        .single();

      return (data?.role as UserRole) ?? 'intern';
    },
    []
  );

  // Inicialização
  useEffect(() => {
    if (!isSupabaseMode) {
      // Modo local: auto-login
      setUser(LOCAL_USER);
      setRole('admin');
      setIsLoading(false);
      return;
    }

    // Modo Supabase: verificar sessão existente
    let isMounted = true;

    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase!.auth.getSession();

        if (session?.user && isMounted) {
          setUser(mapUser(session.user));
          const userRole = await fetchRole(session.user.id);
          if (isMounted) setRole(userRole);
        }
      } catch (err) {
        console.error('[AuthContext] Erro ao inicializar auth:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    initAuth();

    // Listener de mudanças de auth
    const { data: { subscription } } = supabase!.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user && isMounted) {
          setUser(mapUser(session.user));
          const userRole = await fetchRole(session.user.id);
          if (isMounted) setRole(userRole);
        } else if (isMounted) {
          setUser(null);
          setRole('intern');
        }
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [isSupabaseMode, mapUser, fetchRole]);

  const login = useCallback(
    async (email: string, password: string) => {
      if (!isSupabaseMode || !supabase) {
        // Modo local: auto-login
        setUser(LOCAL_USER);
        setRole('admin');
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }
    },
    [isSupabaseMode]
  );

  const logout = useCallback(async () => {
    if (!isSupabaseMode || !supabase) {
      setUser(null);
      return;
    }

    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
    setUser(null);
    setRole('intern');
  }, [isSupabaseMode]);

  const isAdmin = !!user && ADMIN_EMAILS.includes(user.email.toLowerCase());

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        role,
        isAdmin,
        isSupabaseMode,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
