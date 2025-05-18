import { ROUTES } from './routes';

export const getOauthCallbackUri = () => `${window.origin}${ROUTES.auth.authCallback}`;
