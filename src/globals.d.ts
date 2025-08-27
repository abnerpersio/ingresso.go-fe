import type { i18nConfig } from '@/app/lib/infra/i18n';

import type ptBR from './locales/pt-br';

type Messages = typeof ptBR;

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof i18nConfig.defaultNamespace;
    resources: Messages;
  }
}
