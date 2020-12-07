import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, View } from 'react-native';
import { Button, Card, Input } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-community/picker';
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
                    <Input
                    // value={vehicle.name}
                    // onChangeText={(value) =>
                    //     setCurrentVehicle((cur) => ({
                    //         ...cur,
                    //         plateNumber: value,
                    //     }))
                    // }
                    />
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
                    {/* <Picker
                        mode="dropdown"
                        selectedValue={currentVehicle.color}
                        style={{ height: 50 }}
                        onValueChange={(itemValue, itemIndex) =>
                            setCurrentVehicle((cur) => ({
                                ...cur,
                                color: itemValue.toString(),
                            }))
                        }>
                        <Picker.Item label="Đỏ" value="Đỏ" />
                        <Picker.Item label="Xanh Dương" value="Xanh Dương" />
                        <Picker.Item label="Xanh Lá" value="Xanh Lá" />
                        <Picker.Item label="Vàng" value="Vàng" />
                        <Picker.Item label="Cam" value="Cam" />
                        <Picker.Item label="Đen" value="Đen" />
                        <Picker.Item label="Xám" value="Xám" />
                        <Picker.Item label="Bạc" value="Bạc" />
                        <Picker.Item label="Trắng" value="Trắng" />
                    </Picker> */}
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
        <View>
            <View>
                <Text>Detail</Text>
            </View>
            <View>
                <View>
                    <Text>{currentVehicle.name}</Text>
                </View>
            </View>
            <View>
                <Button title="Update Information" onPress={() => setIsVisible(true)} />
            </View>
            <View>{modalUpdate()}</View>
        </View>
    );
};

export default VehicleDetailScreen;

const styles = StyleSheet.create({});
