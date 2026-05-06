// ============================================================
// Login Page — Google + Email/Senha (sem verificação de email)
// ============================================================

import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GlassCard } from '@/components/ui/glass-card';
import { NeonButton } from '@/components/ui/neon-button';
import { Shield, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { lovable } from '@/integrations/lovable';
import logoWhite from '@/assets/o2-logo-white.png';

type Mode = 'login' | 'signup' | 'forgot';

export default function LoginPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/app" replace />;
  }

  const switchMode = (m: Mode) => {
    setMode(m);
    setError('');
    setInfo('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfo('');
    setIsSubmitting(true);
    try {
      if (mode === 'forgot') {
        const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (err) throw err;
        setInfo('Enviamos um link de recuperação para seu e-mail. Verifique também o spam.');
      } else if (mode === 'signup') {
        const { data, error: err } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { nome_completo: name },
            emailRedirectTo: `${window.location.origin}/app`,
          },
        });
        if (err) throw err;
        if (data.session) {
          navigate('/app', { replace: true });
        } else {
          setInfo('Conta criada! Verifique seu e-mail para confirmar e então faça login.');
          setMode('login');
        }
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (err) throw err;
        navigate('/app', { replace: true });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao autenticar');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setIsSubmitting(true);
    try {
      const result = await lovable.auth.signInWithOAuth('google', {
        redirect_uri: `${window.location.origin}/app`,
      });
      if (result.error) {
        setError(result.error.message || 'Falha ao entrar com Google');
        setIsSubmitting(false);
        return;
      }
      if (result.redirected) return;
      navigate('/app', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro com Google');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen lp-bg text-white flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 lp-grid-bg pointer-events-none opacity-60" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 30%, rgba(0,230,118,0.10) 0%, transparent 60%)',
        }}
      />

      <header className="relative z-10 lp-header">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-3">
            <img src={logoWhite} alt="O2 Inc" className="h-7 w-auto" />
            <span className="hidden sm:block w-px h-5 bg-foreground/20" />
            <span className="hidden sm:block font-mono text-[11px] tracking-[0.1em] uppercase text-foreground/70">
              Grau de Maturidade
            </span>
          </button>
          <span className="eyebrow-pill text-[10px]">CFOs as a Service</span>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <h1 className="font-display font-bold text-foreground"
              style={{ fontSize: "clamp(40px, 7vw, 64px)", lineHeight: 1 }}
            >
              Acesse a <span className="gradient-text-neon">plataforma</span>
            </h1>
            <p className="text-foreground/70 text-base leading-relaxed normal-case">
              Entre para iniciar seu diagnóstico de maturidade financeira.
            </p>
          </div>

          <GlassCard className="p-8 space-y-6">
            {mode !== 'forgot' && (
              <div className="flex gap-2 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                    mode === 'login'
                      ? 'bg-[#00E676]/15 text-[#00E676]'
                      : 'text-[#A0A0A0] hover:text-white'
                  }`}
                >
                  Entrar
                </button>
                <button
                  type="button"
                  onClick={() => switchMode('signup')}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                    mode === 'signup'
                      ? 'bg-[#00E676]/15 text-[#00E676]'
                      : 'text-[#A0A0A0] hover:text-white'
                  }`}
                >
                  Criar conta
                </button>
              </div>
            )}

            {mode === 'forgot' && (
              <button
                type="button"
                onClick={() => switchMode('login')}
                className="text-xs text-[#A0A0A0] hover:text-white transition-colors"
              >
                ← Voltar para o login
              </button>
            )}

            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-400">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {info && (
              <div className="flex items-start gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3 text-sm text-emerald-300">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{info}</span>
              </div>
            )}

            {/* Google — não exibir no modo forgot */}
            {mode !== 'forgot' && (
              <>
                <button
                  type="button"
                  onClick={handleGoogle}
                  disabled={isSubmitting}
                  className="w-full h-12 flex items-center justify-center gap-3 rounded-xl bg-white text-[#0A0A0A] font-semibold hover:bg-white/90 transition-all disabled:opacity-60"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.5 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.22-4.74 3.22-8.32z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z"/>
                  </svg>
                  Continuar com Google
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-3 bg-[#0F0F0F] text-[#606060] uppercase tracking-wider">
                      ou com e-mail
                    </span>
                  </div>
                </div>
              </>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {mode === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs font-semibold text-[#A0A0A0] uppercase tracking-wider">
                    Nome
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-12 text-base lp-input"
                  />
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

              {mode !== 'forgot' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-xs font-semibold text-[#A0A0A0] uppercase tracking-wider">
                      Senha
                    </Label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => switchMode('forgot')}
                        className="text-xs text-[#00E676]/80 hover:text-[#00E676] transition-colors"
                      >
                        Esqueci minha senha
                      </button>
                    )}
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="h-12 text-base lp-input"
                  />
                </div>
              )}

              <NeonButton
                variant="primary"
                glow
                type="submit"
                disabled={isSubmitting}
                className="w-full text-base"
              >
                {isSubmitting
                  ? 'Aguarde...'
                  : mode === 'signup'
                  ? 'Criar conta e entrar'
                  : mode === 'forgot'
                  ? 'Enviar link de recuperação'
                  : 'Entrar'}
              </NeonButton>
            </form>
          </GlassCard>

          <p className="text-center text-xs text-[#606060]">
            <span className="font-semibold text-white">O2 Inc.</span> — CFOs as a Service
          </p>
        </div>
      </main>

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
