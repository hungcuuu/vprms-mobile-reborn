import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from '../Screen/Main';

const Stack = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        options={{ tabBarBadge: 3, title: 'Con cac' }}
        name="Main"
        component={MainScreen}
      />
      {/* <Stack.Screen
        options={{ tabBarBadge: 3, title: 'Con cac' }}
        name="Main"
        component={MainScreen}
      /> */}
    </Stack.Navigator>
  );
};

export default MainNavigator;
