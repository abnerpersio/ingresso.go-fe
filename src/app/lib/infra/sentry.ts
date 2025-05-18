import { Env } from '@/app/constants/env';
import * as Sentry from '@sentry/react';

export class AppSentry {
  static initiate() {
    Sentry.init({
      dsn: Env.sentryDsn,
      environment: Env.sentryEnv,
      enabled: Env.isProduction,
      integrations: [Sentry.browserTracingIntegration()],
      tracesSampleRate: 1.0,
    });
  }

  static capture(error: Error | unknown) {
    Sentry.captureException(error);
  }
}
