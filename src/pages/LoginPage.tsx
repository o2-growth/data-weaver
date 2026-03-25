// ============================================================
// Login Page — Dual Mode
// Se Supabase não configurado: botão para entrar no modo local
// Se configurado: formulário de email + senha
// ============================================================

import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const { login, isSupabaseMode, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Se já autenticado, redirecionar (via componente para evitar side-effect no render)
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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-7 h-7 text-primary" />
            <span className="text-lg font-bold tracking-tight">O2 Inc</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            CFOs as a Service
          </Badge>
        </div>
      </header>

      {/* Main — centralized vertically */}
      <main className="flex-1 flex items-center justify-center px-6 py-16 hero-gradient">
        <div className="w-full max-w-md space-y-6 animate-fade-in">
          {/* Branding */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-2">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Diagnóstico <span className="text-primary">360°</span>
            </h1>
            <p className="text-muted-foreground">
              Acesse a plataforma de diagnóstico financeiro
            </p>
          </div>

          <Card className="border-border/40 shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <LogIn className="w-5 h-5 text-primary" />
                </div>
                {isSupabaseMode ? 'Entrar' : 'Modo Local'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!isSupabaseMode ? (
                /* Modo Local */
                <div className="space-y-4">
                  <div className="rounded-lg bg-muted/50 border border-border/40 p-4 text-sm text-muted-foreground">
                    <p className="font-medium text-foreground mb-1">
                      Modo local — autenticação desativada
                    </p>
                    <p>
                      O Supabase não está configurado. A aplicação funciona com
                      dados locais, sem persistência no banco de dados.
                    </p>
                  </div>
                  <Button
                    onClick={handleLocalEntry}
                    disabled={isSubmitting}
                    className="w-full h-12 text-base font-semibold btn-glow"
                    size="lg"
                  >
                    {isSubmitting ? 'Entrando...' : 'Entrar no Modo Local'}
                  </Button>
                </div>
              ) : (
                /* Modo Supabase */
                <form onSubmit={handleLogin} className="space-y-4">
                  {error && (
                    <div className="flex items-center gap-2 rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold">
                      E-mail
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 text-base border-border/60 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-semibold">
                      Senha
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 text-base border-border/60 focus:border-primary"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 text-base font-semibold btn-glow"
                    size="lg"
                  >
                    {isSubmitting ? 'Entrando...' : 'Entrar'}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* O2 branding footer */}
          <p className="text-center text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">O2 Inc.</span> — CFOs as a Service
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span className="font-semibold text-foreground">O2 Inc.</span>
            <span>— CFOs as a Service</span>
          </div>
          <span>Porto Alegre, RS</span>
        </div>
      </footer>
    </div>
  );
}
