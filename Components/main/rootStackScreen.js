import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Mainscreen from '../Main';
import FeedScreen from './Feed';
import ProfileScreen from './Profile';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="SplashScreen" component={Mainscreen}/>
        <RootStack.Screen name="SignInScreen" component={FeedScreen}/>
        <RootStack.Screen name="SignUpScreen" component={ProfileScreen}/>
    </RootStack.Navigator>
);

export default RootStackScreen;