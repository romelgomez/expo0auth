import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import firebase from 'firebase';
import { warmUpAsync, coolDownAsync } from 'expo-web-browser';
import { Button } from '@ant-design/react-native';
import { maybeCompleteAuthSession } from 'expo-web-browser';
import { useAuthRequest } from 'expo-auth-session/providers/facebook';
import { ResponseType } from 'expo-auth-session';

maybeCompleteAuthSession();

// TODO: Get facebook id from enviroments 
const FB_APP_ID = "";

export function FacebookAuth() {
  const [request, response, promptAsync] = useAuthRequest({
    responseType: ResponseType.Token,
    clientId: FB_APP_ID,
  });

  const login = () => {
    promptAsync().catch((reason) => {
      console.error(reason);
    });
  };

  useEffect(() => {
    // console.log('LoginFirebaseFlow:response: ', response);

    if (Platform.OS === 'android') {
      warmUpAsync();
    }

    if (response?.type === 'success') {
      const { access_token } = response.params;
      
      const credential = firebase.auth.FacebookAuthProvider.credential(access_token);

      // Sign in with the credential from the Facebook user.
      firebase
        .auth()
        .signInWithCredential(credential)
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
    <Button disabled={!request} onPress={login} >Login with Facebook</Button> 
  );
}
