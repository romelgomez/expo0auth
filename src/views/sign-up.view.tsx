import React from 'react';
import { Center } from '../commons';
import { AuthNavProps } from '../AuthParamList';
import { Button } from '@ant-design/react-native';

export function SignUp({ navigation }: AuthNavProps<'SignUp'>) {
  return (
    <Center>
      <Button
        onPress={() => {
          navigation.navigate('SignIn');
        }}
      >
        Sign In
      </Button>
    </Center>
  );
}
