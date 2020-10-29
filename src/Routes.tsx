import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Center } from './commons';
import { ActivityIndicator } from '@ant-design/react-native';
import firebase from 'firebase';
import { SignIn, SignUp, Dashboard, Account } from './views';

type User = firebase.User | null;

const Stack = createStackNavigator();

export const Routes: React.FC<RoutesProps> = ({}) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Routes:useEffect');

    let i = 0;

    // Observable *
    // ref: https://firebase.google.com/docs/auth/web/manage-users?hl=es#get_the_currently_signed-in_user
    const unsubscribe: firebase.Unsubscribe = firebase
      .auth()
      .onAuthStateChanged(
        (user: firebase.User | null) => {
          console.log(
            'Routes:onAuthStateChanged:user',
            `Invoked: [${i++}] times,`,
            `uid: ${user?.uid},`,
            `email: ${user?.email},`,
            `isAnonymous: ${user?.isAnonymous}.`
          );

          setUser(user);
          setLoading(false);
        },
        (error: firebase.auth.Error) => {
          console.error('Routes:onAuthStateChanged:error', error);
        }
      );

    return () => {
      console.log('Routes:onAuthStateChanged:UNMOUNTED');

      unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <Center>
        <ActivityIndicator size="large" />
      </Center>
    );
  }

  console.log(
    'Routes:user',
    `uid: ${user?.uid}`,
    `email: ${user?.email},`,
    `isAnonymous: ${user?.isAnonymous}.`
  );

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator initialRouteName="Dashboard">
          <Stack.Screen
            name="Dashboard"
            options={{
              headerTitle: 'Dashboard',
            }}
            component={Dashboard}
          />
          <Stack.Screen
            name="Account"
            options={{
              headerTitle: 'Account',
            }}
            component={Account}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen
            name="SignIn"
            options={{
              headerTitle: 'Sign In',
            }}
            component={SignIn}
          />
          <Stack.Screen
            name="SignUp"
            options={{
              headerTitle: 'Sign Up',
            }}
            component={SignUp}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
