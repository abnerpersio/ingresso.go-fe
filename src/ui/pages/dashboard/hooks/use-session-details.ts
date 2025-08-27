import { API } from '@/app/constants/api';
import { queryKeys } from '@/app/constants/query-keys';
import { httpClient } from '@/app/services/http';
import { useQuery } from '@tanstack/react-query';

type GetSessionsResult = {
  data: {
    session: {
      id: string;
      start_time: string;
      room: string;
      date: string;
      created_at: string;
      movie_id: string;
    };
    unavailable_seats: string[];
  };
};

const fetchSession = (sessionId: string) => async () =>
  httpClient
    .get<GetSessionsResult>(API.movies.sessions.details.replace(':sessionId', sessionId))
    .then((result) => result.data);

export function useSessions(sessionId: string) {
  return useQuery({
    queryKey: queryKeys.movies.sessions(sessionId),
    queryFn: fetchSession(sessionId),
    enabled: !!sessionId,
  });
}
