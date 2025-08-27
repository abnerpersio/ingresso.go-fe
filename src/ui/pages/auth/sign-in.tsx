import { useAuth } from '@/app/hooks/use-auth';
import { GoogleIcon } from '@/ui/components/icons/google';
import { Button } from '@/ui/components/shared/button';
import { useTranslation } from 'react-i18next';

export default function SignInPage() {
  const { signInWithGoogle } = useAuth();

  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <span className="sr-only">{t('generic.project.name')}</span>

          <h1 className="text-xl font-bold">{t('generic.project.name')}</h1>
        </div>

        <Button type="button" variant="outline" onClick={signInWithGoogle} className="w-full">
          <GoogleIcon className="size-4" />
          {t('pages.sign_in.actions.google')}
        </Button>
      </div>
    </div>
  );
}
