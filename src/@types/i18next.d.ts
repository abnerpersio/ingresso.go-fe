import type { i18nConfig } from '@/app/lib/infra/i18n';
import type defaultTranslation from '@/locales/pt-br';
import 'i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof i18nConfig.defaultNamespace;
    resources: {
      translation: typeof defaultTranslation;
    };
  }
}
