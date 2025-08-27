import type { Movie } from '@/app/entities/movie';
import { cn } from '@/app/lib/utils/styles';
import { Badge } from '../shared/badge';
import { Card, CardContent } from '../shared/card';

type MovieCardProps = {
  movie: Movie;
  onClick: () => void;
};

export function MovieCard({ movie, onClick }: MovieCardProps) {
  return (
    <Card
      className={cn(
        'group bg-card/80 cursor-pointer',
        'rounded-t-sm rounded-b-lg border-0 overflow-hidden backdrop-blur-sm',
        'py-0 pb-4 gap-4',
      )}
      onClick={onClick}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          src={movie.poster_path}
          alt={movie.title}
          loading="lazy"
        />

        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0',
            'group-hover:opacity-80 transition-opacity duration-300',
          )}
        />

        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Badge variant="secondary" className="bg-black/50 text-white border-0">
            {new Date(movie.release_date).getFullYear()}
          </Badge>
        </div>
      </div>

      <CardContent className="px-4 flex flex-col gap-2">
        <div>
          <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {movie.title}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-2">{movie.overview}</p>
        </div>

        <div className="flex flex-wrap gap-1">
          {movie.genres.slice(0, 2).map((genre) => (
            <Badge key={genre} variant="outline" className="text-xs">
              {genre}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
