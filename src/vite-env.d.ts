/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_SENTRY_DSN: string;
  readonly VITE_SENTRY_ENV: string;
  readonly VITE_CLARITY_PROJECT_ID: string;
  readonly VITE_OAUTH_AUTHORIZATION_URL: string;
  readonly VITE_OAUTH_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
