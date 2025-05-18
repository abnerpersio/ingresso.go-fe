import ptBR from '@/locales/ptBR';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    ptBR: { translation: ptBR },
  },
  lng: 'ptBR',
  fallbackLng: 'ptBR',
  interpolation: {
    escapeValue: false,
  },
});
