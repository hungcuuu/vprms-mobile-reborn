import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator>
      <AuthStackNavigator.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </AuthStackNavigator.Navigator>
  );
};

const HomeTabNavigator = createBottomTabNavigator();

export const HomeNavigator = () => {
  return (
    <HomeTabNavigator.Navigator>
      <HomeTabNavigator.Screen name="Profile" component={ProfileScreen} />
    </HomeTabNavigator.Navigator>
  );
};
