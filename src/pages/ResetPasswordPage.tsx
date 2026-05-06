// ============================================================
// Reset Password Page — define nova senha após link de recuperação
// ============================================================

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GlassCard } from '@/components/ui/glass-card';
import { NeonButton } from '@/components/ui/neon-button';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import logoWhite from '@/assets/o2-logo-white.png';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasRecoverySession, setHasRecoverySession] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' || (event === 'SIGNED_IN' && session)) {
        setHasRecoverySession(true);
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setHasRecoverySession(true);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
      setError('A senha precisa ter ao menos 6 caracteres.');
      return;
    }
    if (password !== confirm) {
      setError('As senhas não coincidem.');
      return;
    }
    setIsSubmitting(true);
    try {
      const { error: err } = await supabase.auth.updateUser({ password });
      if (err) throw err;
      setSuccess(true);
      setTimeout(() => navigate('/app', { replace: true }), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao redefinir a senha');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen lp-bg text-white flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 lp-grid-bg pointer-events-none opacity-60" />

      <header className="relative z-10 lp-header">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-3">
            <img src={logoWhite} alt="O2 Inc" className="h-7 w-auto" />
            <span className="hidden sm:block w-px h-5 bg-foreground/20" />
            <span className="hidden sm:block font-mono text-[11px] tracking-[0.1em] uppercase text-foreground/70">
              Grau de Maturidade
            </span>
          </button>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <h1 className="font-display font-bold text-foreground"
              style={{ fontSize: 'clamp(36px, 6vw, 56px)', lineHeight: 1 }}
            >
              Nova <span className="gradient-text-neon">senha</span>
            </h1>
            <p className="text-foreground/70 text-base normal-case">
              Defina uma nova senha para acessar sua conta.
            </p>
          </div>

          <GlassCard className="p-8 space-y-6">
            {!hasRecoverySession && !success && (
              <div className="flex items-center gap-2 rounded-xl bg-yellow-500/10 border border-yellow-500/30 p-3 text-sm text-yellow-300">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Abra esta página pelo link enviado no seu e-mail de recuperação.</span>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-400">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3 text-sm text-emerald-300">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Senha atualizada! Redirecionando...</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-semibold text-[#A0A0A0] uppercase tracking-wider">
                  Nova senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="h-12 text-base lp-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm" className="text-xs font-semibold text-[#A0A0A0] uppercase tracking-wider">
                  Confirmar senha
                </Label>
                <Input
                  id="confirm"
                  type="password"
                  placeholder="Repita a senha"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  minLength={6}
                  className="h-12 text-base lp-input"
                />
              </div>

              <NeonButton
                variant="primary"
                glow
                type="submit"
                disabled={isSubmitting || !hasRecoverySession || success}
                className="w-full text-base"
              >
                {isSubmitting ? 'Salvando...' : 'Redefinir senha'}
              </NeonButton>
            </form>

            <button
              type="button"
              onClick={() => navigate('/login')}
              className="w-full text-center text-xs text-[#A0A0A0] hover:text-white transition-colors"
            >
              Voltar para o login
            </button>
          </GlassCard>
        </div>
      </main>
    </div>
  );
}
