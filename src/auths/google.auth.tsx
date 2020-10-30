import React, { useEffect } from 'react';
import firebase from 'firebase';
import { Platform } from 'react-native';
import { useIdTokenAuthRequest } from 'expo-auth-session/providers/google';
import { maybeCompleteAuthSession } from 'expo-web-browser';
import { warmUpAsync, coolDownAsync } from 'expo-web-browser';
import { Button } from '@ant-design/react-native';
import { ResponseType, AuthSessionResult } from 'expo-auth-session';
import { AccountLinking, PromptAsync } from './auth.d';

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
  // TODO: Move the keys to environment logic
  // https://github.com/expo/expo/issues/3540#issuecomment-466709365
  // https://docs.expo.io/versions/latest/sdk/google/
  const [request, _, promptAsync] = useIdTokenAuthRequest({
    expoClientId:
      '1068323245880-f7r9hocb5v92s0dubf0ucpnkcm2ise79.apps.googleusercontent.com',
    webClientId:
      '1068323245880-f7r9hocb5v92s0dubf0ucpnkcm2ise79.apps.googleusercontent.com',
    androidClientId:
      '1068323245880-psk6d6giils8osmpo2811v798b2pklmc.apps.googleusercontent.com',
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
