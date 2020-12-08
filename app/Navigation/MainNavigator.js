import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ServicesScreen from '../screens/ServicesScreen';
import VehiclesScreen from '../screens/Vehicle/VehiclesScreen';
import VehicleCreateScreen from '../screens/Vehicle/VehicleCreateScreen';
import VehicleDetailScreen from '../screens/Vehicle/VehicleDetailScreen';
import BookingScreen from '../screens/Booking/BookingScreen';
import PickingVehicleScreen from '../screens/Booking/PickingVehicleScreen';
import PickingServiceTypeScreen from '../screens/Booking/PickingServiceTypeScreen';
import PickingAccessoryTypeScreen from '../screens/Booking/PickingAccessoryTypeScreen';
import PickingAccessoryScreen from '../screens/Booking/PickingAccessoryScreen';
import PickingProviderScreen from '../screens/Booking/PickingProviderScreen';

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

const BookingStackNavigator = createStackNavigator();

const BookingNavigator = () => (
    <BookingStackNavigator.Navigator initialRouteName="PickingVehicle">
        <BookingStackNavigator.Screen
            name="PickingVehicle"
            component={PickingVehicleScreen}
        />
        <BookingStackNavigator.Screen
            name="PickingServiceType"
            component={PickingServiceTypeScreen}
        />

        <BookingStackNavigator.Screen
            name="PickingAccessoryType"
            component={PickingAccessoryTypeScreen}
        />
        <BookingStackNavigator.Screen
            name="PickingAccessory"
            component={PickingAccessoryScreen}
        />
        <BookingStackNavigator.Screen
            name="PickingProvider"
            component={PickingProviderScreen}
        />
    </BookingStackNavigator.Navigator>
);

const HomeTabNavigator = createBottomTabNavigator();

export const HomeNavigator = () => {
    return (
        <HomeTabNavigator.Navigator screenOptions={{ unmountOnBlur: true }}>
            <HomeTabNavigator.Screen name="Vehicle" component={VehicleNavigator} />

            <HomeTabNavigator.Screen name="Profile" component={ProfileScreen} />
            <HomeTabNavigator.Screen name="Service" component={ServicesScreen} />
            <HomeTabNavigator.Screen name="Booking" component={BookingNavigator} />
        </HomeTabNavigator.Navigator>
    );
};
