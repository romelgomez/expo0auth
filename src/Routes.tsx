import React, { useState, useEffect, } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { 
    Text,
} from 'react-native';
import { 
    Center,
} from './components';
import { 
    AuthNavProps,
} from "./AuthParamList";
import { 
  Button,
  WhiteSpace,
  ActivityIndicator
} from '@ant-design/react-native'; 
// import { AuthContext } from "./AuthProvider";
import firebase from 'firebase';
import { 
    GoogleAuth, 
    AnonymouslyAuth,
    signOut,
} from './auths';


type User = firebase.User | null;

interface RouterProps {}

const Stack = createStackNavigator();

// view
function Login({ navigation }: AuthNavProps<"Login">) {
    return (
        <Center>

            <Text>I am a login screen 2</Text>
            <WhiteSpace size="lg" />
            <Button onPress={() => {
                navigation.navigate('Register')
            }} >Go to register</Button>
            <WhiteSpace size="lg" />
            <AnonymouslyAuth />
            <WhiteSpace size="lg" />
            <GoogleAuth />

        </Center>
    )
}

// view
function Register({ navigation }: AuthNavProps<"Register">) {
    return (
        <Center>
            <Text>I am a regirter screen</Text>
            <Button onPress={() => {
                navigation.navigate('Login')
            }} >Go to login</Button>
        </Center>
    )
}

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
                .onAuthStateChanged((user: firebase.User | null) => {

                    console.log(
                        'Routes:onAuthStateChanged:user',
                        `Invoked: [${i++}] times,`,
                        `uid: ${user?.uid},`,
                        `email: ${user?.email},`,
                        `isAnonymous: ${user?.isAnonymous}.`,
                    );


                    setUser(user);
                    setLoading(false);
                }, (error: firebase.auth.Error) => {
                    console.error('Routes:onAuthStateChanged:error', error);
                });

        return () => {
            console.log('Routes:onAuthStateChanged:UNMOUNTED');

            unsubscribe();
        }
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
        `isAnonymous: ${user?.isAnonymous}.`,
    );

    return (
        <NavigationContainer>

            {user ? 
            
            <Center>
                <Text>The user exist</Text>
                <WhiteSpace size="lg" />
                <Button onPress={signOut}>SignOut</Button>

            </Center>

            
            : 

            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" options={{
                    headerTitle:"Sign In"
                }} component={Login} />
                <Stack.Screen name="Register" options={{
                    headerTitle:"Sign Up"
                }} component={Register} />
                {/* <Stack.Screen name="Home" component={Home} /> */}
                {/* {/* <Stack.Screen name="Notifications" component={Notifications} /> */}
                {/* <Stack.Screen name="Profile" component={Profile} /> */}
                {/* <Stack.Screen name="Settings" component={Settings} /> */}
            </Stack.Navigator>
            }


        </NavigationContainer>
    );
}


