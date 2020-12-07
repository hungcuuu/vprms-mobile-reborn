/* eslint-disable react-native/no-unused-styles */
import React, { useState } from 'react';
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
        setIsVisible(false);
        setCurrentVehicle(vehicle);
    };
    const updateVehicleHandler = (vehicle) => {
        dispatch(actions.updateVehicle(vehicle));
        setIsVisible(false);
    };

    if (error) Alert.alert(error);

    const deleteVehicle = (id) => {
        Alert.alert('', 'Do u want to Cancel this Vehicle?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => {
                    dispatch(actions.deleteVehicle(id));
                    navigation.pop();
                },
            },
        ]);
    };

    const modalUpdate = () => {
        return (
            <Modal visible={isVisible} animationType="fade">
                <Card>
                    <Text>Biển số xe</Text>

                    <Card.Divider />
                    <Text>Name</Text>
                    <Input
                        value={currentVehicle.name}
                        onChangeText={(value) =>
                            setCurrentVehicle((cur) => ({
                                ...cur,
                                name: value,
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

    React.useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => deleteVehicle(vehicle.id)} title="Delete" />
            ),
            headerTitle: vehicle.name,
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
                        // borderRadius: 100,
                    }}>
                    <View
                        style={{
                            padding: 8,
                            flexDirection: 'row',
                            // height: 150,
                            // alignItems: "center",
                            // justifyContent: "space-between",
                        }}>
                        <View
                            style={{
                                // alignItems: "center",
                                width: '30%',
                                // alignContent: "center",
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
                                    {currentVehicle.name}
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.label}>VIN: </Text>
                                <Text style={styles.textInput}>{currentVehicle.VIN}</Text>
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
