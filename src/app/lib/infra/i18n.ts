import ptBr from '@/locales/pt-br';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const i18nConfig = {
  defaultLocale: 'pt-br',
  defaultNamespace: 'generic',
} as const;

i18n.use(initReactI18next).init({
  resources: {
    'pt-br': ptBr,
  },
  lng: i18nConfig.defaultLocale,
  fallbackLng: i18nConfig.defaultLocale,
  defaultNS: i18nConfig.defaultNamespace,
  lowerCaseLng: true,
  debug: import.meta.env.DEV,
  ns: [],
  load: 'currentOnly',
  interpolation: {
    escapeValue: false,
  },
  react: {
    transKeepBasicHtmlNodesFor: ['b', 'br', 'strong', 'i'],
  },
});
