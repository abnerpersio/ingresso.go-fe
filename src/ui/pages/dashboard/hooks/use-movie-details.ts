import { API } from '@/app/constants/api';
import { queryKeys } from '@/app/constants/query-keys';
import type { Movie } from '@/app/entities/movie';
import { httpClient } from '@/app/services/http';
import { useQuery } from '@tanstack/react-query';

type GetMovieResult = {
  data: Movie;
};

const fetchMovieDetails = (movieId: string) => async () =>
  httpClient
    .get<GetMovieResult>(API.movies.details.replace(':movieId', movieId))
    .then((result) => result.data);

const select = (data: GetMovieResult) => data?.data || null;

export function useMovieDetails(movieId: string) {
  return useQuery({
    queryKey: [...queryKeys.movies.list, movieId],
    queryFn: fetchMovieDetails(movieId),
    select,
    enabled: !!movieId,
  });
}
