import { ROUTES } from '@/app/constants/routes';
import { useAuth } from '@/app/hooks/use-auth';
import { Loader2Icon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function AuthCallback() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const { authCallback } = useAuth();

  const isRunning = useRef(false);

  useEffect(() => {
    if (!code) {
      navigate(ROUTES.auth.signIn, { replace: true });
      return;
    }

    if (isRunning.current) {
      return;
    }

    async function run() {
      isRunning.current = true;
      await authCallback(code!);
      isRunning.current = false;
    }

    run();
  }, [code, navigate, authCallback]);

  return (
    <div className="min-h-screen w-full grid place-items-center">
      <Loader2Icon className="animate-spin" />
    </div>
  );
}
