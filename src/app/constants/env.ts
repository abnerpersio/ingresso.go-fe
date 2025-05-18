export const Env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  oauthAuthorizationUrl: import.meta.env.VITE_OAUTH_AUTHORIZATION_URL,
  oauthClientId: import.meta.env.VITE_OAUTH_CLIENT_ID,
  sentryDsn: import.meta.env.VITE_SENTRY_DSN,
  sentryEnv: import.meta.env.VITE_SENTRY_ENV,
  clarityProjectId: import.meta.env.VITE_CLARITY_PROJECT_ID,
  isProduction: import.meta.env.PROD,
};
