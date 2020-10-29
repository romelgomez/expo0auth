import React, { useEffect } from 'react';
import firebase from 'firebase';
import { Platform } from 'react-native';
import { useIdTokenAuthRequest } from 'expo-auth-session/providers/google';
import { maybeCompleteAuthSession } from 'expo-web-browser';
import { warmUpAsync, coolDownAsync } from 'expo-web-browser';
import { Button } from '@ant-design/react-native';

maybeCompleteAuthSession();

export function GoogleAuth() {
  // TODO: Move the keys to environment logic
  // https://github.com/expo/expo/issues/3540#issuecomment-466709365
  // https://docs.expo.io/versions/latest/sdk/google/
  const [request, response, promptAsync] = useIdTokenAuthRequest({
    expoClientId:
      '1068323245880-f7r9hocb5v92s0dubf0ucpnkcm2ise79.apps.googleusercontent.com',
    webClientId:
      '1068323245880-f7r9hocb5v92s0dubf0ucpnkcm2ise79.apps.googleusercontent.com',
    androidClientId:
      '1068323245880-psk6d6giils8osmpo2811v798b2pklmc.apps.googleusercontent.com',
  });

  const login = () => {
    promptAsync().catch((reason) => {
      console.error(reason);
    });
  };

  useEffect(() => {
    // console.log('LoginFirebaseFlow:response: ', JSON.stringify(response));

    if (Platform.OS === 'android') {
      warmUpAsync();
    }

    if (response?.type === 'success') {
      const { id_token } = response.params;

      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);

      firebase
        .auth()
        .signInWithCredential(credential)
        .then(({ user }: firebase.auth.UserCredential) => {
          console.log(
            'GoogleAuth:signInWithCredential',
            `uid: ${user?.uid},`,
            `email: ${user?.email},`,
            `isAnonymous: ${user?.isAnonymous}.`
          );
        })
        .catch((reason) => {
          console.error(reason);
        });
    }

    return () => {
      if (Platform.OS === 'android') {
        coolDownAsync();
      }
    };
  }, [response]);

  return (
    <Button disabled={!request} onPress={login}>
      Login with Google
    </Button>
  );
}
