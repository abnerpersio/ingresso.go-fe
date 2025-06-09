import { API } from '@/app/constants/api';
import { queryKeys } from '@/app/constants/query-keys';
import type { Movie } from '@/app/entities/movie';
import { httpClient } from '@/app/services/http';
import { useQuery } from '@tanstack/react-query';

type ListMoviesResult = {
  data: Movie[];
};

const fetchMovies = async () =>
  httpClient.get<ListMoviesResult>(API.movies.list).then((result) => result.data);

const select = (data: ListMoviesResult) => data?.data || [];

export function useMovies() {
  return useQuery({
    queryKey: queryKeys.movies.list,
    queryFn: fetchMovies,
    select,
  });
}
