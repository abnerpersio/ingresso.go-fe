import { ROUTES } from '@/app/constants/routes';
import { dateToPtBr, toOnlyDate } from '@/app/lib/utils/date';
import { cn } from '@/app/lib/utils/styles';
import { Badge } from '@/ui/components/shared/badge';
import { Button } from '@/ui/components/shared/button';
import { Card, CardContent } from '@/ui/components/shared/card';
import { Skeleton } from '@/ui/components/shared/skeleton';
import { ArrowLeftIcon, CalendarIcon, ClockIcon, PlayIcon, TicketIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { MovieDetailsLoading } from './components/movie-details-loading';
import { useMovieDetails } from './hooks/use-movie-details';
import { useSessions } from './hooks/use-sessions';

const DAY = 1000 * 60 * 60 * 24;

export default function MovieDetailsPage() {
  const { movieId = '' } = useParams<{ movieId: string }>();
  const { t } = useTranslation();

  const [selectedDate, setSelectedDate] = useState(new Date());

  const navigate = useNavigate();
  const { data: movie, isLoading: isMovieLoading } = useMovieDetails(movieId);
  const { data: sessions = [], isFetching: isSessionsLoading } = useSessions({
    movieId,
    date: toOnlyDate(selectedDate),
  });

  const dateOptions = useMemo(() => {
    return [
      new Date(Date.now() - 2 * DAY),
      new Date(Date.now() - 1 * DAY),
      new Date(),
      new Date(Date.now() + 1 * DAY),
      new Date(Date.now() + 2 * DAY),
    ];
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleOpenSession = (sessionId: string) => {
    navigate(ROUTES.dashboard.buySession.replace(':sessionId', sessionId));
  };

  if (isMovieLoading) {
    return <MovieDetailsLoading />;
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">{t('pages.movie_details.not_found.title')}</h2>
          <p className="text-muted-foreground mb-4">{t('pages.movie_details.not_found.message')}</p>

          <Button onClick={handleBack}>
            <ArrowLeftIcon className="size-4 mr-2" />
            {t('pages.movie_details.back_to_home')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" onClick={handleBack} className="mb-6">
          <ArrowLeftIcon className="size-4 mr-2" />
          {t('pages.movie_details.back')}
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="relative group">
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  className="md:max-h-[400px] w-full aspect-[2/3] object-cover rounded-lg shadow-xl"
                />

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                  <Button size="lg" className="bg-white/20 backdrop-blur-sm border-white/30">
                    <PlayIcon className="size-5 mr-2" />
                    {t('pages.movie_details.watch_trailer')}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-bold leading-tight">{movie.title}</h1>

                {movie.original_title !== movie.title && (
                  <p className="text-xl text-muted-foreground">{movie.original_title}</p>
                )}
              </div>

              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="size-4" />
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>

                <div className="flex items-center gap-2">
                  <ClockIcon className="size-4" />
                  <span>{t('pages.movie_details.duration')}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <Badge key={genre} variant="outline">
                    {genre}
                  </Badge>
                ))}
              </div>

              <p className="text-lg leading-relaxed text-foreground/90">{movie.overview}</p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 items-center">
                {dateOptions.map((date) => {
                  const isSelected = dateToPtBr(date) === dateToPtBr(selectedDate);

                  return (
                    <Card
                      key={dateToPtBr(date)}
                      className={cn(
                        'cursor-pointer hover:shadow-md transition-all duration-200 border hover:border-primary/50',
                        'p-0 rounded-sm w-fit px-4 py-3',
                        !isSelected && 'bg-card/80 backdrop-blur-sm',
                        isSelected && 'bg-primary text-primary-foreground border-primary',
                      )}
                      onClick={() => setSelectedDate(date)}
                    >
                      <CardContent className="p-0">
                        <div className="text-xl font-bold">{dateToPtBr(date)}</div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="flex gap-4 items-center">
                <TicketIcon className="size-5" />
                <h2 className="font-bold flex items-center gap-2">
                  {t('pages.movie_details.sessions.title')}
                </h2>
              </div>

              {isSessionsLoading && (
                <div className="grid w-fit grid-cols-1 sm:grid-cols-4 gap-3">
                  {Array.from({ length: 4 }, (_, index) => (
                    <Skeleton key={`session-${index + 1}`} className="h-12 w-24" />
                  ))}
                </div>
              )}

              {!isSessionsLoading && sessions.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  {t('pages.movie_details.sessions.no_sessions')}
                </div>
              )}

              {!isSessionsLoading && (
                <div className="w-fit grid grid-cols-1 sm:grid-cols-4 gap-3">
                  {sessions.map((session) => (
                    <Card
                      key={session.id}
                      className={cn(
                        'cursor-pointer hover:shadow-md transition-all duration-200 border hover:border-primary/50',
                        'p-0 rounded-sm w-fit px-4 py-3',
                      )}
                      onClick={() => handleOpenSession(session.id)}
                    >
                      <CardContent className="p-0">
                        <div className="text-xl font-bold">{session.start_time}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
