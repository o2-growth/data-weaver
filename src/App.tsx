import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index.tsx";
import Questionnaire from "./pages/Questionnaire.tsx";
import Results from "./pages/Results.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import PresentationMode from "./pages/PresentationMode.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

/**
 * Componente de rota protegida.
 * - Em modo local (sem Supabase): permite acesso se autenticado como local user
 * - Em modo Supabase: requer autenticação real
 * - Enquanto carregando, mostra tela de loading simples
 */
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

const AppRoutes = () => (
  <Routes>
    {/* Rota pública */}
    <Route path="/login" element={<LoginPage />} />

    {/* Rotas protegidas */}
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <Index />
        </ProtectedRoute>
      }
    />
    <Route
      path="/questionario"
      element={
        <ProtectedRoute>
          <Questionnaire />
        </ProtectedRoute>
      }
    />
    <Route
      path="/resultados"
      element={
        <ProtectedRoute>
          <Results />
        </ProtectedRoute>
      }
    />
    <Route
      path="/apresentacao"
      element={
        <ProtectedRoute>
          <PresentationMode />
        </ProtectedRoute>
      }
    />

    {/* 404 */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
