import { useAuth } from '@/app/hooks/use-auth';
import { Button } from '@/ui/components/shared/button';
import { t } from 'i18next';
import { LogOutIcon } from 'lucide-react';

export default function HomePage() {
  const { profile, signOut } = useAuth();

  return (
    <div className="min-h-screen p-4 flex flex-col">
      <div className="w-full flex gap-4 justify-between items-center">
        <p>{t('generic.user_greeting', { name: profile.name })}</p>

        <Button type="button" onClick={signOut} variant="outline">
          <LogOutIcon className="size-4" />
          {t('generic.logout')}
        </Button>
      </div>
    </div>
  );
}
