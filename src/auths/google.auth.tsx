import React, { useEffect } from 'react';
import firebase from 'firebase';
import { Platform } from 'react-native';
import { useIdTokenAuthRequest } from 'expo-auth-session/providers/google';
import { maybeCompleteAuthSession } from 'expo-web-browser';
import { warmUpAsync, coolDownAsync } from 'expo-web-browser';
import { Button } from '@ant-design/react-native';
import { ResponseType, AuthSessionResult } from 'expo-auth-session';
import { AccountLinking, PromptAsync } from './auth.d';
import environments from '../environments';

maybeCompleteAuthSession();

const login = (promptAsync: PromptAsync) => {
  return promptAsync()
    .then((response: AuthSessionResult | null) => {
      if (response?.type === 'success') {
        const { id_token } = response.params;

        const credential = firebase.auth.GoogleAuthProvider.credential(
          id_token
        );

        return firebase
          .auth()
          .signInWithCredential(credential)
          .then(({ user }: firebase.auth.UserCredential) => {
            console.log(
              'GoogleAuth:signInWithCredential',
              `uid: ${user?.uid},`,
              `email: ${user?.email},`,
              `isAnonymous: ${user?.isAnonymous}.`
            );
          });
      } else {
        return Promise.reject(response);
      }
    })
    .catch((reason: AccountLinking) => {
      console.error(reason);
    });
};

export function GoogleAuth() {
  // The google login not completed the process in the .apk file but in the Android emulator work fine. #10860 - https://github.com/expo/expo/issues/10860
  // https://github.com/expo/expo/issues/3540#issuecomment-466709365
  // https://docs.expo.io/versions/latest/sdk/google/
  // https://docs.expo.io/versions/latest/sdk/google/#server-side-apis
  // workaround with a microservice - https://github.com/expo/expo/issues/3540#issuecomment-491248739
  const [request, _, promptAsync] = useIdTokenAuthRequest({
    expoClientId: environments.google?.expoClientId,
    webClientId: environments.google?.webClientId,
    androidClientId: environments.google?.androidClientId,
    responseType: ResponseType.Token,
  });

  useEffect(() => {
    if (Platform.OS === 'android') {
      warmUpAsync();
    }

    return () => {
      if (Platform.OS === 'android') {
        coolDownAsync();
      }
    };
  }, []);

  return (
    <Button
      disabled={!request}
      onPress={() => {
        login(promptAsync);
      }}
    >
      Login with Google
    </Button>
  );
}
