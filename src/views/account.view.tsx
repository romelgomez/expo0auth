import React from 'react';
import { Center } from '../commons';
import { AuthNavProps } from '../AuthParamList';
import { Text } from 'react-native';
import { Button, WhiteSpace } from '@ant-design/react-native';
import { signOut } from '../auths';

export function AccountView({ navigation }: AuthNavProps<'AccountView'>) {
  return (
    <Center>
      <Text>Account View - The user exist</Text>

      <WhiteSpace size="lg" />

      <Button
        onPress={() => {
          navigation.navigate('DashboardView');
        }}
      >
        Dashboard
      </Button>

      <WhiteSpace size="lg" />

      <Button onPress={signOut}>SignOut</Button>
    </Center>
  );
}
