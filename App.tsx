import React from 'react';
import * as Sentry from 'sentry-expo';
import { CaptureConsole as CaptureConsoleIntegration } from "@sentry/integrations";
import { Routes } from './src/';
import firebase from 'firebase';

// TODO: - ENVIROMENT
const firebaseConfig = {
  apiKey: "AIzaSyAj5gA8GxW7rQFayNN6b9ctgh3WBHlpxjo",
  authDomain: "expo0auth.firebaseapp.com",
  databaseURL: "https://expo0auth.firebaseio.com",
  projectId: "expo0auth",
  storageBucket: "expo0auth.appspot.com",
  messagingSenderId: "1068323245880",
  appId: "1:1068323245880:web:48cd31569e1916d76f7bcd",
  measurementId: "G-FH2SJSC81Y",  
}

firebase.initializeApp(firebaseConfig);

// TODO: - ENVIROMENT
Sentry.init({
  dsn: "https://cc87da79098442d1b37c72dc5e885e16@o366067.ingest.sentry.io/5495452",
  enableInExpoDevelopment: true,
  debug: true, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
  integrations: [new CaptureConsoleIntegration()],
});

export default function App() {
  return <Routes />;
}
