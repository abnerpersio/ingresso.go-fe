import { queryKeys } from '@/app/constants/query-keys';
import { storageKeys } from '@/app/constants/storage-keys';
import { Storage } from '@/app/lib/utils/storage';
import { withPersistentQuery } from '@/app/lib/utils/with-persistent-query';
import { UserService } from '@/app/services/user-service';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

const EXPIRATION_IN_MS = 24 * 60 * 60 * 1000;

type Options = {
  enabled?: boolean;
};

const queryFn = withPersistentQuery(new UserService().getProfile, {
  key: storageKeys.userDetails,
  exp: EXPIRATION_IN_MS,
});

export function useUserProfile(options?: Options) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: queryKeys.user.profile,
    queryFn,
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

export function prefetchUserProfile() {
  const queryClient = useQueryClient();

  return queryClient.fetchQuery({
    queryKey: queryKeys.user.profile,
    queryFn,
  });
}
