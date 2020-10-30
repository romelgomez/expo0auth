import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import firebase from 'firebase';
import { warmUpAsync, coolDownAsync } from 'expo-web-browser';
import { Button } from '@ant-design/react-native';
import { maybeCompleteAuthSession } from 'expo-web-browser';
import { useAuthRequest } from 'expo-auth-session/providers/facebook';
import { ResponseType, AuthSessionResult } from 'expo-auth-session';

interface AccountLinking extends firebase.auth.Error {
  email?: string;
  providerId?: string;
  signInMethod?: string;
  oauthAccessToken?: string;
}

maybeCompleteAuthSession();

// TODO: Get facebook id from enviroments
const FB_APP_ID = '651129349099345';

export function FacebookAuth({}) {
  const [request, _, promptAsync] = useAuthRequest({
    responseType: ResponseType.Token,
    clientId: FB_APP_ID,
  });

  const login = () => {
    return promptAsync()
      .then((response: AuthSessionResult | null) => {
        console.log('AuthSessionResult', JSON.stringify(response));

        if (response?.type === 'success') {
          const { access_token } = response.params;

          const credential = firebase.auth.FacebookAuthProvider.credential(
            access_token
          );

          // Sign in with the credential from the Facebook user.
          return firebase
            .auth()
            .signInWithCredential(credential)

        } else {
          return Promise.reject(response)
        }

      })
      .catch((reason: AccountLinking) => {

        if (
          reason.code === 'auth/account-exists-with-different-credential'
        ) {

          // TODO:
          // https://reactnavigation.org/docs/nesting-navigators/#navigating-to-a-screen-in-a-nested-navigator
          // navigate('AccountLinkingView'); 
          // move to account-linking.view
          //
          //   {
          //     "code":"auth/account-exists-with-different-credential",
          //     "message":"An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.",
          //     "email":"bmxandcode@gmail.com",
          //     "providerId":"facebook.com",
          //     "signInMethod":"facebook.com",
          //     "oauthAccessToken":""
          //  }
        }

        console.error(reason);
      });
  };

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
    <Button disabled={!request} onPress={login}>
      Login with Facebook
    </Button>
  );
}
