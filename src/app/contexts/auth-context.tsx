import { API } from '@/app/constants/api';
import { Env } from '@/app/constants/env';
import { getOauthCallbackUri } from '@/app/constants/oauth';
import { ROUTES } from '@/app/constants/routes';
import { storageKeys } from '@/app/constants/storage-keys';
import { usePrefetchUserProfile, useUserProfile } from '@/app/hooks/use-user-profile';
import { AuthService } from '@/app/services/auth-service';
import { httpClient } from '@/app/services/http';
import type { UserProfile } from '@/app/services/user-service';
import { LaunchScreen } from '@/ui/components/launch-screen';
import { t } from 'i18next';
import { createContext, useCallback, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Storage } from '../lib/utils/storage';

type AuthContextValue = {
  signedIn: boolean;
  profile: UserProfile;
  signIn(email: string, password: string): Promise<void>;
  signInWithGoogle(): void;
  authCallback(code: string): Promise<void>;
  signOut(): void;
};

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [hasAccessToken, setHasAccessToken] = useState(() => !!localStorage.getItem(storageKeys.accessToken));

  const navigate = useNavigate();
  const prefetchUserProfile = usePrefetchUserProfile();

  const {
    data: profile,
    isFetching: isFetchingProfile,
    remove: removeUserDetails,
  } = useUserProfile({
    enabled: hasAccessToken,
  });

  const signIn = useCallback(async (email: string, password: string) => {
    const { accessToken, refreshToken } = await new AuthService().signIn({ email, password });

    localStorage.setItem(storageKeys.accessToken, accessToken);
    localStorage.setItem(storageKeys.refreshToken, refreshToken);

    setHasAccessToken(true);
  }, []);

  const signInWithGoogle = useCallback(() => {
    const url = `${Env.oauthAuthorizationUrl}/oauth2/authorize`;

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: Env.oauthClientId,
      redirect_uri: getOauthCallbackUri(),
      identity_provider: 'Google',
    });

    window.location.href = `${url}?${params}`;
  }, []);

  const authCallback = useCallback(
    async (code: string) => {
      try {
        const { accessToken, refreshToken } = await new AuthService().exchangeCode(code);
        if (!accessToken || !refreshToken) throw new Error('Invalid tokens received');

        localStorage.setItem(storageKeys.accessToken, accessToken);
        localStorage.setItem(storageKeys.refreshToken, refreshToken);

        const profile = await prefetchUserProfile();
        if (!profile) throw new Error('Invalid profile');

        setHasAccessToken(true);
      } catch {
        toast.error(t('errors.invalid_google_auth'));
        navigate(ROUTES.auth.signIn);
      }
    },
    [navigate, prefetchUserProfile],
  );

  const signOut = useCallback(() => {
    localStorage.clear();
    setHasAccessToken(false);
    removeUserDetails();
  }, [removeUserDetails]);

  useLayoutEffect(() => {
    const interceptorId = httpClient.interceptors.request.use((config) => {
      const accessToken = localStorage.getItem(storageKeys.accessToken);

      if (accessToken) {
        config.headers.set('Authorization', `Bearer ${accessToken}`);
      }

      return config;
    });

    return () => {
      httpClient.interceptors.request.eject(interceptorId);
    };
  }, []);

  useLayoutEffect(() => {
    const interceptorId = httpClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        const refreshToken = localStorage.getItem(storageKeys.refreshToken);
        const storageProfile = Storage.get<{ data: UserProfile }>(storageKeys.userDetails)?.data;

        if (originalRequest.url === API.auth.refreshToken) {
          toast.error('Sessão expirada. Faça login novamente');
          signOut();
          return Promise.reject(error);
        }

        const hasRefreshToken = !!refreshToken && !!storageProfile?.username;

        if (error.response?.status !== 401 || !hasRefreshToken) {
          return Promise.reject(error);
        }

        const { accessToken } = await new AuthService()
          .refreshToken({ refreshToken, username: storageProfile.username })
          .catch(() => {
            toast.error('Sessão expirada. Faça login novamente');
            signOut();
            return Promise.reject(error);
          });

        localStorage.setItem(storageKeys.accessToken, accessToken);

        return httpClient(originalRequest);
      },
    );

    return () => {
      httpClient.interceptors.response.eject(interceptorId);
    };
  }, [signOut]);

  const value: AuthContextValue = {
    signedIn: !!profile,
    profile: profile!,
    signInWithGoogle,
    signIn,
    signOut,
    authCallback,
  };

  return (
    <AuthContext.Provider value={value}>
      <LaunchScreen isLoading={isFetchingProfile} />

      {!isFetchingProfile && children}
    </AuthContext.Provider>
  );
}
