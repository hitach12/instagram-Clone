import React from 'react';
import {View , Text , Button} from 'react-native'
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
export default function Feed({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Feed Screen</Text>
        <Button
          title="Open drawer"
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
        <Button
          title="Toggle drawer"
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        />
      </View>
    );
  }