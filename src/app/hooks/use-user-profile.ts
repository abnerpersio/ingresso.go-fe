import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { queryKeys } from '../constants/query-keys';
import { storageKeys } from '../constants/storage-keys';
import { Storage } from '../lib/utils/storage';
import { withPersistentQuery } from '../lib/utils/with-persistent-query';
import { UserService } from '../services/user-service';

const EXPIRATION_IN_MS = 24 * 60 * 60 * 1000;

type Options = {
  enabled?: boolean;
};

export function useUserProfile(options?: Options) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: queryKeys.user.profile,
    queryFn: withPersistentQuery(new UserService().getProfile, {
      key: storageKeys.userDetails,
      exp: EXPIRATION_IN_MS,
    }),
    enabled: options?.enabled,
    staleTime: Number.POSITIVE_INFINITY,
  });

  const remove = useCallback(() => {
    queryClient.removeQueries({
      queryKey: queryKeys.user.profile,
    });
  }, [queryClient]);

  const resetCache = useCallback(() => {
    Storage.delete(storageKeys.userDetails);
    queryClient.invalidateQueries({
      queryKey: queryKeys.user.profile,
    });
  }, [queryClient]);

  return { ...query, remove, resetCache };
}
