import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainNavigator from './MainNavigator';

import Login from '../Screen/Login';
const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        options={{ tabBarBadge: 3, title: 'Con cac' }}
        name="Login"
        component={Login}
      />
      <Stack.Screen name="Home" component={MainNavigator} />
    </Stack.Navigator>
  );
}

export default MainStack;
