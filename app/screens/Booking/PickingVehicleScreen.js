import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
import { Alert } from 'react-native';
const PickingVehicleScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const vehicles = useSelector(state => state.vehicles.vehicles ?? []);
    const { path, sectionId } = route.params ?? {};
    console.log('path', path);
    const pickingVehicleHandler = vehicle => {
        if (path === 'catalog') {
            dispatch(
                actions.updateCurrentVehicle(vehicle, () => {
                    navigation.navigate('AccessoryType', sectionId);
                }),
            );
        } else {
            dispatch(
                actions.updateCurrentVehicle(vehicle, () => {
                    navigation.navigate('ServiceType');
                }),
            );
        }
    };
    console.log(vehicles);
    const renderVehicleItem = vehicle => (
        <TouchableOpacity
            // useForeground
            onPress={() => pickingVehicleHandler(vehicle)}>
            <View style={styles.renderItemContainer}>
                <View style={styles.icon}>
                    <Ionicons name="md-car" size={50} />
                </View>

                <View style={{ flex: 1, paddingLeft: 16, display: 'flex' }}>
                    <Text
                        style={{
                            fontSize: 16,
                            // fontWeight: 'bold'
                        }}>
                        Name: {vehicle.model.name}
                    </Text>
                    <Text style={{ fontSize: 16 }}>
                        Plate Number: {vehicle.plateNumber}
                    </Text>
                    <Text style={{ fontSize: 16 }}>VIN: {vehicle.vinNumber}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
    useEffect(() => {}, []);
    return (
        <View style={styles.container}>
            {/* <Text>Vehicle Screen</Text> */}
            <View>
                <Text style={{ fontSize: 26 }}>Please choose car</Text>
            </View>
            <FlatList
                data={vehicles}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={({ item: vehicle }) => renderVehicleItem(vehicle)}
            />
            <Button
                title="Create new Vehicle"
                onPress={() =>
                    vehicles.length < 4
                        ? navigation.navigate('CreateVehicle')
                        : Alert.alert('You must have only 4 cars')
                }
            />
        </View>
    );
};

export default PickingVehicleScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    renderItemContainer: {
        flexDirection: 'row',
        padding: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        width: '90%',
        alignSelf: 'center',
        marginVertical: 12,
        borderRadius: 30,
        // shadowColor: 'black',
        // shadowOpacity: 0.26,
        // shadowOffset: { width: 0, height: 2 },
        // shadowRadius: 8,
        // elevation: 5,
    },
    icon: {
        backgroundColor: '#aaa',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 80,
    },
});
