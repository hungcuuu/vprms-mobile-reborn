import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import VehiclesScreen from '../screens/Vehicle/VehiclesScreen';
import VehicleCreateScreen from '../screens/Vehicle/VehicleCreateScreen';
import VehicleDetailScreen from '../screens/Vehicle/VehicleDetailScreen';
import PickingVehicleScreen from '../screens/Booking/PickingVehicleScreen';
import CatalogScreen from '../screens/Accessory/CatalogScreen';
import AccessoryTypeScreen from '../screens/Accessory/AccessoryTypeScreen';
import AccessoriesScreen from '../screens/Accessory/AccessoriesScreen';
import AccessoryDetailScreen from '../screens/Accessory/AccessoryDetailScreen';
import ProviderAccessoriesScreen from '../screens/Accessory/ProviderAccessoriesScreen';
import AccessoryServicesScreen from '../screens/Accessory/AccessoryServicesScreen';
import ReviewScreen from '../screens/Accessory/ReviewScreen';
import ScheduleScreen from '../screens/Accessory/ScheduleScreen';
import ServiceType from '../screens/Booking/ServiceType';
import ServiceTypeDetail from '../screens/Booking/ServiceTypeDetail';
import PickingProvider from '../screens/Booking/PickingProvider';
import ProviderServices from '../screens/Booking/ProviderServices';
import OrderHistory from '../screens/Order/OrderHistory';
import Providers from '../screens/Provider/Providers';
import BookingDetail from '../screens/Order/BookingDetail';
import Feedback from '../screens/Order/Feedback';

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
            name="ServiceType"
            component={ServiceType}
            options={{
                // headerLeft: <Ionicons name="md-home" />,
                title: 'Type',
                headerTitleAlign: 'center',
            }}
        />
        <BookingStackNavigator.Screen
            name="CreateVehicle"
            component={VehicleCreateScreen}
        />
        <BookingStackNavigator.Screen
            name="ServiceTypeDetail"
            component={ServiceTypeDetail}
            options={{
                // headerLeft: <Ionicons name="md-home" />,
                title: 'Type',
                headerTitleAlign: 'center',
            }}
        />
        <BookingStackNavigator.Screen
            name="PickingProvider"
            component={PickingProvider}
            options={{
                // headerLeft: <Ionicons name="md-home" />,
                title: 'Provider',
                headerTitleAlign: 'center',
            }}
        />
        <BookingStackNavigator.Screen
            name="ProviderServices"
            component={ProviderServices}
            options={{
                // headerLeft: <Ionicons name="md-home" />,
                title: 'Services',
                headerTitleAlign: 'center',
            }}
        />
        <BookingStackNavigator.Screen
            name="Review"
            component={ReviewScreen}
            options={{
                // headerLeft: <Ionicons name="md-home" />,
                title: 'Review',
                headerTitleAlign: 'center',
            }}
        />
        <BookingStackNavigator.Screen
            name="Schedule"
            component={ScheduleScreen}
            options={{
                // headerLeft: <Ionicons name="md-home" />,
                title: 'Schedule',
                headerTitleAlign: 'center',
            }}
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
                title: 'Detail',
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
                title: 'AccessoryServices',
                headerTitleAlign: 'center',
            }}
        />
        <AccessoryStackNavigator.Screen
            name="ProviderServices"
            component={ProviderServices}
            options={{
                // headerLeft: <Ionicons name="md-home" />,
                title: 'ProviderServices',
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

const ServiceStackNavigator = createStackNavigator();
const ServiceNavigator = () => {
    <ServiceStackNavigator.Navigator>
        <ServiceStackNavigator.Screen
            name="ServiceType"
            component={ServiceType}
            options={{
                // headerLeft: <Ionicons name="md-home" />,
                title: 'ServiceType',
                headerTitleAlign: 'center',
            }}
        />
        <ServiceStackNavigator.Screen
            name="ServiceTypeDetail"
            component={ServiceTypeDetail}
            options={{
                // headerLeft: <Ionicons name="md-home" />,
                title: '',
                headerTitleAlign: 'center',
            }}
        />
    </ServiceStackNavigator.Navigator>;
};

const OrderStackNavigator = createStackNavigator();
const OrderNavigator = ({ navigation }) => (
    <OrderStackNavigator.Navigator
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
        <OrderStackNavigator.Screen
            name="Order"
            component={OrderTab}
            options={{
                // headerLeft: <Ionicons name="md-home" />,
                title: 'Order',

                headerLeft: () => (
                    <Ionicons
                        name="menu-outline"
                        style={{ fontSize: 30 }}
                        onPress={() => navigation.toggleDrawer()}
                    />
                ),
            }}
        />
        <OrderStackNavigator.Screen
            name="BookingDetail"
            component={BookingDetail}
            options={{
                // headerLeft: <Ionicons name="md-home" />,
                title: 'BookingDetail',
            }}
        />
        <OrderStackNavigator.Screen
            name="Feedback"
            component={Feedback}
            options={{
                // headerLeft: <Ionicons name="md-home" />,
                title: 'Feedback',
            }}
        />
    </OrderStackNavigator.Navigator>
);
const ProviderStackNavigator = createStackNavigator();
const ProviderNavigator = ({ navigation }) => (
    <ProviderStackNavigator.Navigator
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
        <ProviderStackNavigator.Screen
            name="VehiclesScreen"
            component={VehiclesScreen}
            initialParams={{ path: 'provider' }}
            options={{
                // headerLeft: <Ionicons name="md-home" />,
                title: 'Vehicle',

                headerLeft: () => (
                    <Ionicons
                        name="menu-outline"
                        style={{ fontSize: 30 }}
                        onPress={() => navigation.toggleDrawer()}
                    />
                ),
            }}
        />
        <ProviderStackNavigator.Screen
            name="CreateVehicle"
            component={VehicleCreateScreen}
            options={{
                // headerLeft: <Ionicons name="md-home" />,
                title: 'Providers',
            }}
        />
        <ProviderStackNavigator.Screen
            name="Providers"
            component={Providers}
            options={{
                // headerLeft: <Ionicons name="md-home" />,
                title: 'Providers',
            }}
        />
        <ProviderStackNavigator.Screen
            name="ProviderServices"
            component={ProviderServices}
            options={{
                // headerLeft: <Ionicons name="md-home" />,
                title: 'ProviderServices',
            }}
        />
        <ProviderStackNavigator.Screen
            name="Review"
            component={ReviewScreen}
            options={{
                // headerLeft: <Ionicons name="md-home" />,
                title: 'Review',
            }}
        />
        <ProviderStackNavigator.Screen
            name="Schedule"
            component={ScheduleScreen}
            options={{
                // headerLeft: <Ionicons name="md-home" />,
                title: 'Schedule',
            }}
        />
    </ProviderStackNavigator.Navigator>
);
const Tab = createMaterialTopTabNavigator();

function OrderTab() {
    return (
        <Tab.Navigator
            initialRouteName="InProgress"
            tabBarOptions={{
                // labelStyle: { fontSize: 12 },
                // tabStyle: { width: 100 },
                style: { backgroundColor: 'powderblue' },
            }}>
            <Tab.Screen
                name="InProgress"
                initialParams={{ OrderStatus: 'inProgress' }}
                component={OrderHistory}
            />
            <Tab.Screen
                name="History"
                initialParams={{ OrderStatus: 'all' }}
                component={OrderHistory}
            />
        </Tab.Navigator>
    );
}
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
                name="Provider"
                component={ProviderNavigator}
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
            <Drawer.Screen
                name="Order"
                component={OrderNavigator}
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
