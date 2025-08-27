import { API } from '@/app/constants/api';
import { queryKeys } from '@/app/constants/query-keys';
import { httpClient } from '@/app/services/http';
import { useQuery } from '@tanstack/react-query';

type GetSessionsResult = {
  data: {
    id: string;
    start_time: string;
    room: string;
    date: string;
    created_at: string;
    movie_id: string;
  }[];
};

type ListSessionProps = {
  movieId: string;
  date: string;
};

const fetchSessions =
  ({ movieId, date }: ListSessionProps) =>
  async () =>
    httpClient
      .get<GetSessionsResult>(API.movies.sessions.list.replace(':movieId', movieId), { params: { date } })
      .then((result) => result.data);

const select = (data: GetSessionsResult) => data?.data || [];

export function useSessions({ movieId, date }: ListSessionProps) {
  return useQuery({
    queryKey: [...queryKeys.movies.sessions(movieId), { date }],
    queryFn: fetchSessions({ movieId, date }),
    select,
    enabled: !!movieId,
  });
}
