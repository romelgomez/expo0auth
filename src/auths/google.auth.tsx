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
import { logInAsync, LogInResult } from 'expo-google-app-auth';


/**
 * nativeAuthLogIn function will be called in native android or apk 
 * 
 * With this flow we need save the token, meaning that for the app, not web, we need set a flow 
 * to know the auth status of the user in the app, https://docs.expo.io/guides/authentication/#storing-data  
 * 
 * https://docs.expo.io/versions/latest/sdk/google/#usage
 * https://github.com/expo/expo/blob/master/packages/expo-google-app-auth/src/Google.ts
 * "Deprecated: Native Google Sign-In has been moved to Expo.GoogleSignIn ('expo-google-sign-in') Falling back to `web` behavior. `behavior` deprecated in SDK 34"
 * https://github.com/expo/expo/tree/master/packages/expo-google-sign-in
 * https://github.com/expo/expo/blob/master/packages/expo-google-sign-in/src/GoogleSignIn.ts
 * https://docs.expo.io/versions/latest/sdk/google-sign-in/#usage
 * https://docs.expo.io/versions/latest/sdk/google/#deploying-to-a-standalone-app-on-android
 * 
 */
function nativeAuthLogIn() {

  logInAsync({
    scopes: ['profile', 'email'],
    clientId: environments.google?.androidClientId
  })
  .then((logInResult: LogInResult) => {
    console.log('android:nativeAuth:logInResult',JSON.stringify(logInResult).toString());
  })
  .catch((reason) => {
    console.log('android:nativeAuth:reason', JSON.stringify(reason).toString());
  });

} 


maybeCompleteAuthSession();


const login = (promptAsync: PromptAsync) => {
  promptAsync()
    .then((response: AuthSessionResult | null) => {

      console.info('android:AuthSessionResult', JSON.stringify(response).toString());

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
      }
      
      return Promise.reject(response);
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

        if (Platform.OS === 'android') {
          nativeAuthLogIn();
        } else {
          login(promptAsync);
        }
    
        
      }}
    >
      Login with Google
    </Button>
  );
}
