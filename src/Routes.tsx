import React, { useState, useEffect, } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Center } from './commons';
import { ActivityIndicator } from '@ant-design/react-native';
import firebase from 'firebase';
import { SignInView, SignUpView, DashboardView, AccountView } from './views';

type User = firebase.User | null;

interface RoutesProps {}

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
        <Stack.Navigator initialRouteName="DashboardView">
          <Stack.Screen
            name="DashboardView"
            options={{
              headerTitle: 'Dashboard',
            }}
            component={DashboardView}
          />
          <Stack.Screen
            name="AccountView"
            options={{
              headerTitle: 'Account',
            }}
            component={AccountView}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="SignInView">
          <Stack.Screen
            name="SignInView"
            options={{
              headerTitle: 'Sign In',
            }}
            component={SignInView}
          />
          <Stack.Screen
            name="SignUpView"
            options={{
              headerTitle: 'Sign Up',
            }}
            component={SignUpView}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
