import React from 'react';
import { Center } from '../commons';
import { AuthNavProps } from '../AuthParamList';
import { Button } from '@ant-design/react-native';

export function SignUpView({ navigation }: AuthNavProps<'SignUpView'>) {
  return (
    <Center>
      <Button
        onPress={() => {
          navigation.navigate('SignInView');
        }}
      >
        Sign In
      </Button>
    </Center>
  );
}
