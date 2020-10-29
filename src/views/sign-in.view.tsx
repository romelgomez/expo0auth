import React from 'react';
import { Center } from '../commons';
import { AuthNavProps } from '../AuthParamList';
import { Button, WhiteSpace } from '@ant-design/react-native';
import { GoogleAuth, AnonymouslyAuth } from '../auths';

export function SignIn({ navigation }: AuthNavProps<'SignIn'>) {
  return (
    <Center>
      <GoogleAuth />
      <WhiteSpace size="lg" />
      <AnonymouslyAuth />

      <WhiteSpace size="lg" />
      <WhiteSpace size="lg" />
      <WhiteSpace size="lg" />
      <WhiteSpace size="lg" />
      <WhiteSpace size="lg" />
      <WhiteSpace size="lg" />

      <Button
        onPress={() => {
          navigation.navigate('SignUp');
        }}
      >
        Sign Up
      </Button>
    </Center>
  );
}
