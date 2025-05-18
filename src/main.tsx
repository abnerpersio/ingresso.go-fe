import React from 'react';
import ReactDOM from 'react-dom/client';

import { AppClarity } from '@/app/lib/infra/clarity';
import '@/app/lib/infra/dynamic-import-error';
import '@/app/lib/infra/i18n';
import { AppSentry } from '@/app/lib/infra/sentry';

import App from '@/app';

AppClarity.initiate();
AppSentry.initiate();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
