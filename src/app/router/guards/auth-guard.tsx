import { ROUTES } from '@/app/constants/routes';
import { useAuth } from '@/app/hooks/use-auth';
import { Navigate, Outlet } from 'react-router-dom';

export function AuthGuard({ isPrivate }: { isPrivate: boolean }) {
  const { signedIn } = useAuth();

  if (signedIn && !isPrivate) {
    return <Navigate to={ROUTES.dashboard.home} replace />;
  }

  if (!signedIn && isPrivate) {
    return <Navigate to={ROUTES.auth.signIn} replace />;
  }

  return <Outlet />;
}
