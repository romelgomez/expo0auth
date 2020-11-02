import React from 'react';
import * as Sentry from 'sentry-expo';
import { CaptureConsole as CaptureConsoleIntegration } from '@sentry/integrations';
import { Routes } from './src/';
import firebase from 'firebase';
import environments from './src/environments';

firebase.initializeApp(environments.firebase.config);

Sentry.init({
  dsn: environments.sentry.dsn,
  enableInExpoDevelopment: true,
  debug: true, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
  integrations: [new CaptureConsoleIntegration()],
});

export default function App() {
  return <Routes />;
}
