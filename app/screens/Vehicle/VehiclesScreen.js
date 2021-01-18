import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
const VehiclesScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const provider = route.params?.provider ?? [];

    const path = route.params?.path ?? '';
    const vehicles = useSelector(state => state.vehicles.vehicles ?? []);
    console.log(vehicles);
    const renderVehicleItem = itemData => (
        <View style={{}}>
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    // useForeground
                    onPress={() =>
                        path === 'provider'
                            ? dispatch(
                                  actions.updateCurrentVehicle(itemData.item, () =>
                                      navigation.navigate('ProviderServices', {
                                          provider: provider,
                                          path: 'provider',
                                      }),
                                  ),
                              )
                            : navigation.navigate('VehicleDetail', itemData.item)
                    }>
                    <View style={styles.renderItemContainer}>
                        <View style={styles.icon}>
                            <Ionicons name="md-car" size={50} />
                        </View>

                        <View style={{ flex: 1, paddingLeft: 16, display: 'flex' }}>
                            <Text style={{ fontSize: 16 }}>
                                Model:{' '}
                                {`${itemData.item.model.name} ${itemData.item.model.fuelType} ${itemData.item.model.gearbox} ${itemData.item.model.year}`}
                            </Text>
                            <Text style={{ fontSize: 16 }}>
                                VIN: {itemData.item.vinNumber}
                            </Text>
                            <Text style={{ fontSize: 16 }}>
                                Plate: {itemData.item.plateNumber}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            {/* <View style={{ width: 50 }}>
                <Button title="A" />
            </View> */}
        </View>
    );
    useEffect(() => {}, []);
    return (
        <View style={styles.container}>
            {/* <Text>Vehicle Screen</Text> */}
            <FlatList
                data={vehicles}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={renderVehicleItem}
            />
            <Button
                title="ADD VEHICLE"
                onPress={() => navigation.navigate('CreateVehicle')}
            />
            {/* <Button title="Booking" onPress={() => navigation.navigate('Booking')} /> */}
        </View>
    );
};

export default VehiclesScreen;

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
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        // elevation: 0,
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
