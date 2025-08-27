import { ROUTES } from '@/app/constants/routes';
import { useAuth } from '@/app/hooks/use-auth';
import { MovieCard } from '@/ui/components/movie-card';
import { Button } from '@/ui/components/shared/button';
import { Skeleton } from '@/ui/components/shared/skeleton';
import { CalendarIcon, LogOutIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useMovies } from './hooks/use-movies';

export default function HomePage() {
  const { profile, signOut } = useAuth();

  const { t } = useTranslation();

  const navigate = useNavigate();
  const { data: movies = [], isLoading } = useMovies();

  const handleMovieClick = (movieId: string) => {
    navigate(ROUTES.dashboard.movieDetails.replace(':movieId', movieId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-6">
        <header className="flex gap-4 justify-between items-center mb-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tight">
              {t('generic.user_greeting', { name: profile.name })}
            </h1>
            <p className="text-muted-foreground">{t('pages.home.subtitle')}</p>
          </div>

          <Button type="button" onClick={signOut} variant="outline" size="sm">
            <LogOutIcon className="size-4" />
            {t('generic.logout')}
          </Button>
        </header>

        <main>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">{t('pages.home.movies_section.title')}</h2>
            <p className="text-muted-foreground">{t('pages.home.movies_section.subtitle')}</p>
          </div>

          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {Array.from({ length: 10 }, (_, index) => (
                <div key={`movie-skeleton-${index + 1}`} className="space-y-3">
                  <Skeleton className="h-[360px] w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          )}

          {!isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onClick={() => handleMovieClick(movie.id)} />
              ))}
            </div>
          )}

          {!isLoading && movies.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <CalendarIcon className="size-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">{t('pages.home.empty_state.title')}</h3>
                <p>{t('pages.home.empty_state.message')}</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
