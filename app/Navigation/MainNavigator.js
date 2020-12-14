import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

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
import CatalogScreen from '../screens/Accessory/CatalogScreen';
import AccessoryTypeScreen from '../screens/Accessory/AccessoryTypeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { color } from 'react-native-reanimated';
import AccessoriesScreen from '../screens/Accessory/AccessoriesScreen';
import AccessoryDetailScreen from '../screens/Accessory/AccessoryDetailScreen';
import ProviderAccessoriesScreen from '../screens/Accessory/ProviderAccessoriesScreen';
import AccessoryServicesScreen from '../screens/Accessory/AccessoryServicesScreen';
import ReviewScreen from '../screens/Accessory/ReviewScreen';
import ScheduleScreen from '../screens/Accessory/ScheduleScreen';

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

const VehicleNavigator = ({ navigation }) => (
    <VehicleStackNavigator.Navigator
        initialRouteName="VehicleOverview"
        screenOptions={{
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
        }}>
        <VehicleStackNavigator.Screen
            name="VehicleOverview"
            component={VehiclesScreen}
            options={{
                // headerLeft: <Ionicons name="md-home" />,
                title: 'My Vehicles',
                headerTitleAlign: 'center',
                headerLeft: () => (
                    <Ionicons
                        name="menu-outline"
                        style={{ fontSize: 30 }}
                        onPress={() => navigation.toggleDrawer()}
                    />
                ),
            }}
        />
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

const BookingNavigator = ({ navigation }) => (
    <BookingStackNavigator.Navigator initialRouteName="PickingVehicle">
        <BookingStackNavigator.Screen
            name="PickingVehicle"
            component={PickingVehicleScreen}
            options={{
                // headerLeft: <Ionicons name="md-home" />,
                title: 'Booking',
                headerTitleAlign: 'center',
                headerLeft: () => (
                    <Ionicons
                        name="menu-outline"
                        style={{ fontSize: 30 }}
                        onPress={() => navigation.toggleDrawer()}
                    />
                ),
            }}
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
const AccessoryStackNavigator = createStackNavigator();
const AccessoryNavigator = ({ navigation }) => (
    <AccessoryStackNavigator.Navigator
        initialRouteName="AccessoryOverview"
        screenOptions={{
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
        }}>
        <AccessoryStackNavigator.Screen
            name="AccessoryOverview"
            component={CatalogScreen}
            options={{
                // headerLeft: <Ionicons name="md-home" />,
                title: 'Main',

                headerLeft: () => (
                    <Ionicons
                        name="menu-outline"
                        style={{ fontSize: 30 }}
                        onPress={() => navigation.toggleDrawer()}
                    />
                ),
            }}
        />
        <AccessoryStackNavigator.Screen
            name="AccessoryType"
            component={AccessoryTypeScreen}
            options={{
                // headerLeft: <Ionicons name="md-home" />,
                title: 'Type',
                headerTitleAlign: 'center',
            }}
        />
        <AccessoryStackNavigator.Screen
            name="Accessories"
            component={AccessoriesScreen}
            options={{
                // headerLeft: <Ionicons name="md-home" />,
                title: 'Accessories',
                headerTitleAlign: 'center',
            }}
        />
        <AccessoryStackNavigator.Screen
            name="AccessoryDetail"
            component={AccessoryDetailScreen}
            options={{
                // headerLeft: <Ionicons name="md-home" />,
                title: '',
                headerTitleAlign: 'center',
            }}
        />
        <AccessoryStackNavigator.Screen
            name="ProviderAccessories"
            component={ProviderAccessoriesScreen}
            options={{
                // headerLeft: <Ionicons name="md-home" />,
                title: '',
                headerTitleAlign: 'center',
            }}
        />
        <AccessoryStackNavigator.Screen
            name="AccessoryServices"
            component={AccessoryServicesScreen}
            options={{
                // headerLeft: <Ionicons name="md-home" />,
                title: '',
                headerTitleAlign: 'center',
            }}
        />
        <AccessoryStackNavigator.Screen
            name="Review"
            component={ReviewScreen}
            options={{
                // headerLeft: <Ionicons name="md-home" />,
                title: 'Review',
                headerTitleAlign: 'center',
            }}
        />
        <AccessoryStackNavigator.Screen
            name="Schedule"
            component={ScheduleScreen}
            options={{
                // headerLeft: <Ionicons name="md-home" />,
                title: 'Schedule',
                headerTitleAlign: 'center',
            }}
        />
    </AccessoryStackNavigator.Navigator>
);
const HomeTabNavigator = createBottomTabNavigator();

export const HomeNavigator = () => {
    return (
        <HomeTabNavigator.Navigator screenOptions={{ unmountOnBlur: true }}>
            <HomeTabNavigator.Screen name="Booking" component={BookingNavigator} />

            <HomeTabNavigator.Screen name="Vehicle" component={VehicleNavigator} />

            <HomeTabNavigator.Screen name="Profile" component={ProfileScreen} />
            <HomeTabNavigator.Screen name="Service" component={ServicesScreen} />
        </HomeTabNavigator.Navigator>
    );
};
const Drawer = createDrawerNavigator();
export function SideDrawer() {
    return (
        <Drawer.Navigator
            initialRouteName="Accessory"
            screenOptions={{
                unmountOnBlur: true,
            }}
            drawerStyle={{ width: 200 }}>
            <Drawer.Screen
                name="Accessory"
                component={AccessoryNavigator}
                options={{
                    drawerIcon: ({ focused, size }) => (
                        <Ionicons
                            name="md-home"
                            size={size}
                            color={focused ? '#7cc' : '#ccc'}
                        />
                    ),
                }}
            />

            <Drawer.Screen
                name="Vehicle"
                component={VehicleNavigator}
                options={{
                    drawerIcon: ({ focused, size }) => (
                        <Ionicons
                            name="md-car"
                            size={size}
                            color={focused ? '#7cc' : '#ccc'}
                        />
                    ),
                }}
            />

            <Drawer.Screen
                name="Booking"
                component={BookingNavigator}
                options={{
                    drawerIcon: ({ focused, size }) => (
                        <Ionicons
                            name="md-calendar"
                            size={size}
                            color={focused ? '#7cc' : '#ccc'}
                        />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}
