import React from 'react';
import { Center } from '../commons';
import { AuthNavProps } from '../AuthParamList';
import { Text } from 'react-native';
import { Button, WhiteSpace } from '@ant-design/react-native';
import { signOut } from '../auths';

export function DashboardView({ navigation }: AuthNavProps<'DashboardView'>) {
  return (
    <Center>
      <Text>Dashboard View - The user exist</Text>

      <WhiteSpace size="lg" />

      <Button
        onPress={() => {
          navigation.navigate('AccountView');
        }}
      >
        Account
      </Button>

      <WhiteSpace size="lg" />

      <Button onPress={signOut}>SignOut</Button>
    </Center>
  );
}
