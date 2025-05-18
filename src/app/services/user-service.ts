import { API } from '../constants/api';
import { httpClient } from './http';

export type UserProfile = {
  id: string;
  givenName: string;
  email: string;
  emailVerified: boolean;
  provider?: 'Google';
};

type GetProfileResult = {
  profile: UserProfile;
};

export class UserService {
  async getProfile() {
    const result = await httpClient.get<GetProfileResult>(API.user.profile);
    return result.data?.profile;
  }
}
