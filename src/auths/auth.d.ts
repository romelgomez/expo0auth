import firebase from 'firebase';
import { AuthSessionResult, AuthRequestPromptOptions } from 'expo-auth-session';

export interface AccountLinking extends firebase.auth.Error {
  email?: string;
  providerId?: string;
  signInMethod?: string;
  oauthAccessToken?: string;
}

type PromptAsync = (
  options?: AuthRequestPromptOptions
) => Promise<AuthSessionResult>;
