import { useAuth } from '@/app/hooks/use-auth';
import { Button } from '@/ui/components/shared/button';
import { Card, CardContent } from '@/ui/components/shared/card';
import clsx from 'clsx';
import { t } from 'i18next';
import { LogOutIcon } from 'lucide-react';
import { useMovies } from './hooks/use-movies';

export default function HomePage() {
  const { profile, signOut } = useAuth();

  const { data: movies = [] } = useMovies();

  return (
    <div className="min-h-screen p-4 flex flex-col gap-6">
      <div className="w-full flex gap-4 justify-between items-center">
        <p>{t('generic.user_greeting', { name: profile.name })}</p>

        <Button type="button" onClick={signOut} variant="outline">
          <LogOutIcon className="size-4" />
          {t('generic.logout')}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pt-4 pb-8 gap-4 sm:px-6 max-w-5xl mx-auto">
        {movies.map((movie) => (
          <Card
            key={movie.id}
            className=" h-[400px] w-[260px] max-w-full p-0 flex flex-col justify-stretch overflow-hidden"
          >
            <CardContent className="w-full h-full p-0 relative flex flex-col gap-2 justify-end">
              <img
                width={300}
                className={clsx('flex-1 absolute w-full h-full object-cover object-center')}
                src={movie.poster_path}
                alt={movie.title}
              />

              <div className="px-2 py-4 flex bg-neutral-600/70 gap-2 z-10 text-white">
                <p title={movie.title} className="text-xl font-semibold truncate text-ellipsis">
                  {movie.title}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
