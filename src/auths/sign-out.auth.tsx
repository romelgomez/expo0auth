import firebase from 'firebase';

export function signOut() {
  var user = firebase.auth().currentUser;

  firebase
    .auth()
    .signOut()
    .then(() => console.log(
      'signOut',
      `uid: ${user?.uid},`,
      `email: ${user?.email},`,
      `isAnonymous: ${user?.isAnonymous}.`,
    ));
}
