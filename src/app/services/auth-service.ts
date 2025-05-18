import { API } from '@/app/constants/api';
import { getOauthCallbackUri } from '@/app/constants/oauth';
import { httpClient } from './http';

type SignInPayload = {
  email: string;
  password: string;
};

type SignInResult = {
  accessToken: string;
  refreshToken: string;
};

type RefreshTokenResult = {
  accessToken: string;
};

export class AuthService {
  async signIn(payload: SignInPayload) {
    const result = await httpClient.post<SignInResult>(API.auth.signIn, payload);
    return result?.data;
  }

  async refreshToken({ email, refreshToken }: { refreshToken: string; email: string }) {
    const result = await httpClient.post<RefreshTokenResult>(API.auth.refreshToken, {
      refreshToken,
      email,
    });
    return result.data;
  }

  async exchangeCode(code: string) {
    const result = await httpClient.post<SignInResult>(API.auth.exchangeCode, null, {
      params: {
        code,
        redirect_uri: getOauthCallbackUri(),
      },
    });
    return result?.data;
  }
}
