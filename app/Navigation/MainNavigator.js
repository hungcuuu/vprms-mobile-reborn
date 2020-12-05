import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ServicesScreen from '../screens/ServicesScreen';
import VehiclesScreen from '../screens/Vehicle/VehiclesScreen';
import VehicleCreateScreen from '../screens/Vehicle/VehicleCreateScreen';
import VehicleDetailScreen from '../screens/Vehicle/VehicleDetailScreen';

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator>
            <AuthStackNavigator.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <AuthStackNavigator.Screen
                name="Register"
                component={RegisterScreen}
                options={{ headerShown: false }}
            />
        </AuthStackNavigator.Navigator>
    );
};

const VehicleStackNavigator = createStackNavigator();

const VehicleNavigator = () => (
    <VehicleStackNavigator.Navigator initialRouteName="VehicleOverview">
        <VehicleStackNavigator.Screen name="VehicleOverview" component={VehiclesScreen} />
        <VehicleStackNavigator.Screen
            name="CreateVehicle"
            component={VehicleCreateScreen}
        />
        <VehicleStackNavigator.Screen
            name="VehicleDetail"
            component={VehicleDetailScreen}
        />
    </VehicleStackNavigator.Navigator>
);

const HomeTabNavigator = createBottomTabNavigator();

export const HomeNavigator = () => {
    return (
        <HomeTabNavigator.Navigator screenOptions={{ unmountOnBlur: true }}>
            <HomeTabNavigator.Screen name="Profile" component={ProfileScreen} />
            <HomeTabNavigator.Screen name="Service" component={ServicesScreen} />
            <HomeTabNavigator.Screen name="Vehicle" component={VehicleNavigator} />
        </HomeTabNavigator.Navigator>
    );
};
