import { AuthProvider } from '@/app/contexts/auth-context';
import { ErrorBoundary } from '@/app/providers/error-boundary';
import { QueryProvider } from '@/app/providers/query';
import { Router } from '@/app/router';
import { PageError } from '@/ui/components/page-error';
import { Toaster } from '@/ui/components/shared/toaster';
import '@/ui/styles/global.css';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <ErrorBoundary fallback={<PageError message="Ocorreu um erro inesperado! Tente recarregar a página" />}>
      <BrowserRouter>
        <QueryProvider>
          <AuthProvider>
            <Router />

            <Toaster position="bottom-right" />
          </AuthProvider>
        </QueryProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
