// ============================================================
// Login Page — Dark Premium DS (alinhado à Landing Page)
// ============================================================

import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GlassCard } from '@/components/ui/glass-card';
import { NeonButton } from '@/components/ui/neon-button';
import { Shield, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const { login, isSupabaseMode, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLocalEntry = async () => {
    setIsSubmitting(true);
    try {
      await login('', '');
      navigate('/', { replace: true });
    } catch {
      setError('Erro ao entrar no modo local');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen lp-bg text-white flex flex-col relative overflow-hidden">
      {/* Subtle grid backdrop */}
      <div className="absolute inset-0 lp-grid-bg pointer-events-none opacity-60" />
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 30%, rgba(0,230,118,0.10) 0%, transparent 60%)',
        }}
      />

      {/* Header */}
      <header className="relative z-10 lp-header">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7EBF8E] to-[#4CAF50] flex items-center justify-center">
              <span className="text-[#0A0A0A] font-black text-xs">O2</span>
            </div>
            <span className="text-sm font-bold tracking-tight">
              Grau de <span className="gradient-text-neon">Maturidade</span>
            </span>
          </div>
          <span className="eyebrow-pill text-[10px]">CFOs as a Service</span>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          {/* Branding */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#4CAF50]/10 border border-[#7EBF8E]/30 mb-2">
              <Shield className="w-8 h-8 text-[#00E676]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.05] font-display">
              Acesse a{' '}
              <span className="gradient-text-neon">plataforma</span>
            </h1>
            <p className="text-[#A0A0A0] text-base leading-relaxed">
              Entre para iniciar uma nova avaliação de maturidade ou revisar resultados.
            </p>
          </div>

          <GlassCard className="p-8 space-y-6">
            <div className="space-y-1">
              <span className="eyebrow-pill">
                {isSupabaseMode ? 'Entrar' : 'Modo Local'}
              </span>
            </div>

            {!isSupabaseMode ? (
              <div className="space-y-5">
                <div className="rounded-xl bg-white/[0.02] border border-white/8 p-4 text-sm text-[#A0A0A0]">
                  <p className="font-semibold text-white mb-1">
                    Autenticação desativada
                  </p>
                  <p className="leading-relaxed">
                    A plataforma está rodando localmente sem persistência de banco de dados.
                  </p>
                </div>
                <NeonButton
                  variant="primary"
                  glow
                  onClick={handleLocalEntry}
                  disabled={isSubmitting}
                  className="w-full text-base"
                >
                  {isSubmitting ? 'Entrando...' : 'Entrar no Modo Local'}
                </NeonButton>
              </div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-5">
                {error && (
                  <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-400">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-semibold text-[#A0A0A0] uppercase tracking-wider">
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 text-base lp-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-xs font-semibold text-[#A0A0A0] uppercase tracking-wider">
                    Senha
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 text-base lp-input"
                  />
                </div>

                <NeonButton
                  variant="primary"
                  glow
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-base"
                >
                  {isSubmitting ? 'Entrando...' : 'Entrar'}
                </NeonButton>
              </form>
            )}
          </GlassCard>

          <p className="text-center text-xs text-[#606060]">
            <span className="font-semibold text-white">O2 Inc.</span> — CFOs as a Service
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/8">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#606060]">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#7EBF8E]" />
            <span className="font-semibold text-white">O2 Inc.</span>
            <span>— CFOs as a Service</span>
          </div>
          <span>Porto Alegre, RS</span>
        </div>
      </footer>
    </div>
  );
}
