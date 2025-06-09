import { API } from '@/app/constants/api';
import { getOauthCallbackUri } from '@/app/constants/oauth';
import axios from 'axios';
import { Env } from '../constants/env';
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

  async refreshToken({ username, refreshToken }: { refreshToken: string; username: string }) {
    const url = Env.apiBaseUrl + API.auth.refreshToken;
    const result = await axios.post<RefreshTokenResult>(url, { refresh_token: refreshToken, username });
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
