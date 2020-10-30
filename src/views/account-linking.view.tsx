import React from 'react';
import { Center } from '../commons';
import { AuthNavProps } from '../AuthParamList';
import { Button, WhiteSpace } from '@ant-design/react-native';
import { Text } from 'react-native';
import { GoogleAuth, FacebookAuth, AnonymouslyAuth } from '../auths';

export function AccountLinkingView({
  navigation,
}: AuthNavProps<'AccountLinkingView'>) {


    return (
    <Center>
      <Text>Hi ___, you have already a account here with the email:</Text>
      <Text>___email___</Text>
      <Text>you can will sign in with __ too, but first sign in with  </Text>


      {/* <GoogleAuth />
      <WhiteSpace size="lg" />
      <FacebookAuth />
      <WhiteSpace size="lg" /> */}

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
