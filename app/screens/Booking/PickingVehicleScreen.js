import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
const PickingVehicleScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const vehicles = useSelector(state => state.vehicles.vehicles ?? []);

    const pickingVehicleHandler = vehicle => {
        dispatch(
            actions.updateCurrentVehicle(vehicle, () => {
                navigation.navigate('ServiceType');
            }),
        );
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
                <Text>Please choose car</Text>
            </View>
            <FlatList
                data={vehicles}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={({ item: vehicle }) => renderVehicleItem(vehicle)}
            />
            <Button
                title="Create new Vehicle"
                onPress={() => navigation.navigate('CreateVehicle')}
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
