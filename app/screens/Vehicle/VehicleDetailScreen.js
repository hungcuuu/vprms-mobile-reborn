/* eslint-disable react-native/no-unused-styles */
import React, { useState, useEffect } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Card, Input } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-community/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

import * as actions from '../../store/actions';

const VehicleDetailScreen = ({ route, navigation }) => {
    const vehicle = route.params;
    const dispatch = useDispatch();
    const error = useSelector((state) => state.vehicles.error);
    const [currentVehicle, setCurrentVehicle] = useState(vehicle);
    const [isVisible, setIsVisible] = useState(false);
    const cancelUpdateHandler = () => {
        setCurrentVehicle(vehicle);

        setIsVisible(false);
    };
    const updateVehicleHandler = (vehicle) => {
        dispatch(actions.updateVehicle(vehicle, () => setIsVisible(false)));
    };

    if (error) Alert.alert(error);

    const deleteVehicle = (id) => {
        Alert.alert('', 'Do u want to Delete this Vehicle?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => {
                    dispatch(actions.deleteVehicle(id, () => navigation.pop()));
                },
            },
        ]);
    };

    const modalUpdate = () => {
        return (
            <Modal visible={isVisible} animationType="fade">
                <Card>
                    <Text>Plate Number</Text>
                    <Input
                        value={currentVehicle.plateNumber}
                        onChangeText={(value) =>
                            setCurrentVehicle((cur) => ({
                                ...cur,
                                plateNumber: value,
                            }))
                        }
                    />
                    <Card.Divider />
                    <Text>VIN</Text>
                    <Input
                        value={currentVehicle.vinNumber}
                        onChangeText={(value) =>
                            setCurrentVehicle((cur) => ({
                                ...cur,
                                vinNumber: value,
                            }))
                        }
                    />

                    <Card.Divider />
                    <Text>Màu xe</Text>
                </Card>
                <View>
                    <Button title="Cancel" onPress={() => cancelUpdateHandler()} />
                    <Button
                        title="OK"
                        onPress={() => updateVehicleHandler(currentVehicle)}
                    />
                </View>
            </Modal>
        );
    };

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={() => deleteVehicle(vehicle.id)}
                    title="Delete"
                    buttonStyle={{ backgroundColor: 'red' }}
                />
            ),
            headerTitle: vehicle.model.name,
        });
    }, []);
    return (
        <View style={styles.container}>
            <ScrollView
                nestedScrollEnabled
                // refreshControl={
                //     <RefreshControl
                //         refreshing={refreshing}
                //         onRefresh={onRefresh}
                //     />
                // }
                style={{ flex: 1 }}>
                <View
                    style={{
                        padding: 8,
                    }}>
                    <View
                        style={{
                            padding: 8,
                            flexDirection: 'row',
                        }}>
                        <View
                            style={{
                                width: '30%',

                                alignSelf: 'center',
                            }}>
                            <View
                                style={{
                                    backgroundColor: '#aaa',
                                    borderRadius: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                    width: 80,
                                    height: 80,
                                }}>
                                <Ionicons name="md-car" size={50} />
                            </View>
                        </View>

                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.label}>Name: </Text>
                                <Text style={styles.textInput}>
                                    {currentVehicle.model.name}
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.label}>VIN: </Text>
                                <Text style={styles.textInput}>
                                    {currentVehicle.vinNumber}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <Button
                            title="Update Information"
                            onPress={() => setIsVisible(true)}
                        />
                    </View>
                </View>

                <View>{modalUpdate()}</View>
            </ScrollView>
        </View>
    );
};

export default VehicleDetailScreen;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        //marginTop: Constants.statusBarHeight,
        flexDirection: 'column',
        height: '100%',
    },
});
