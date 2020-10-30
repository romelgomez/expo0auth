import React from 'react';
import { Center } from '../commons';
import { AuthNavProps } from '../AuthParamList';
import { Button, WhiteSpace } from '@ant-design/react-native';
import { GoogleAuth, FacebookAuth, AnonymouslyAuth } from '../auths';

export function SignInView({ navigation }: AuthNavProps<'SignInView'>) {
  return (
    <Center>
      <GoogleAuth />
      <WhiteSpace size="lg" />
      <FacebookAuth />
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
          navigation.navigate('SignUpView');
        }}
      >
        Sign Up
      </Button>
    </Center>
  );
}
