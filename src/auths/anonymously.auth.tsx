import React from 'react';
import firebase from 'firebase';
import { Button } from '@ant-design/react-native';

function signInAnonymously() {
  firebase
    .auth()
    .signInAnonymously()
    .then((userCredential: firebase.auth.UserCredential) => {
      // console.log(userCredential);
      // console.log('User signed in anonymously');
    })
    .catch((error) => {
      // if (error.code === 'auth/operation-not-allowed') {
      //   console.log('Enable anonymous in your firebase console.');
      // }
      console.error(error);
    });
}

export function AnonymouslyAuth() {
  return <Button onPress={signInAnonymously}>Login as Anonymous</Button>;
}
