import type defaultTranslation from '@/locales/pt-br';
import 'i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: typeof defaultTranslation;
    };
  }
}
