import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, Card, Input } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { FlatList } from 'react-native';
import { useCallback } from 'react';

import * as actions from '../../store/actions';
import axios from '../../axios';
import { STATUS, STATUS_TAG_COLORS } from '../../constants/index';

const VehicleDetailScreen = ({ route, navigation }) => {
    const vehicle = route.params;
    const dispatch = useDispatch();
    const error = useSelector(state => state.vehicles.error);
    const [currentVehicle, setCurrentVehicle] = useState(vehicle);
    const [isVisible, setIsVisible] = useState(false);
    const [historyList, setHistoryList] = useState([]);

    const cancelUpdateHandler = () => {
        setCurrentVehicle(vehicle);

        setIsVisible(false);
    };
    const updateVehicleHandler = vehicle => {
        dispatch(actions.updateVehicle(vehicle, () => setIsVisible(false)));
    };

    if (error) {
        Alert.alert(error);
    }
    const getStatusTagColor = status => {
        switch (status) {
            case STATUS.Accepted:
                return STATUS_TAG_COLORS.Accepted;
            case STATUS.Arrived:
                return STATUS_TAG_COLORS.Arrived;
            case STATUS.InProgress:
                return STATUS_TAG_COLORS.InProgress;
            case STATUS.Canceled:
                return STATUS_TAG_COLORS.Canceled;
            case STATUS.WorkCompleted:
                return STATUS_TAG_COLORS.WorkCompleted;
            case STATUS.Finished:
                return STATUS_TAG_COLORS.Finished;
        }
    };
    const deleteVehicle = useCallback(
        id => {
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
        },
        [dispatch, navigation],
    );

    const modalUpdate = () => {
        return (
            <Modal visible={isVisible} animationType="fade">
                <Card>
                    <Text>Plate Number</Text>
                    <Input
                        value={currentVehicle.plateNumber}
                        onChangeText={value =>
                            setCurrentVehicle(cur => ({
                                ...cur,
                                plateNumber: value,
                            }))
                        }
                    />
                    <Card.Divider />
                    <Text>VIN</Text>
                    <Input
                        value={currentVehicle.vinNumber}
                        onChangeText={value =>
                            setCurrentVehicle(cur => ({
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
    const renderHistory = history => {
        return (
            <>
                <TouchableOpacity
                    useForeground
                    onPress={
                        () =>
                            navigation.navigate('BookingDetail', {
                                detail: history,
                            })
                        // console.log("asjdkawd")
                    }>
                    <View
                        style={{
                            flexDirection: 'row',
                            borderWidth: 1,
                            padding: 8,
                            marginVertical: 8,
                            borderRadius: 10,
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                width: '70%',
                                alignItems: 'center',
                            }}>
                            <Ionicons name="md-construct" size={24} />
                            <View
                                style={{
                                    width: '100%',
                                    paddingHorizontal: 8,
                                }}>
                                <Text style={{ fontSize: 14 }}>
                                    {history.provider.providerName}
                                </Text>
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        // justifyContent: "flex-end",
                                        // alignItems: "center",
                                    }}>
                                    <View style={{ padding: 2 }}>
                                        <Ionicons name="md-calendar" size={20} />
                                    </View>
                                    <View>
                                        <Text>
                                            {moment
                                                .unix(history.bookingTime)
                                                .format('DD/MM/YYYY')}
                                        </Text>
                                    </View>
                                </View>
                                <Text>
                                    <Text
                                        style={{
                                            backgroundColor: getStatusTagColor(
                                                history.status,
                                            ),
                                            opacity: 0.7,
                                            paddingVertical: 8,
                                        }}>
                                        {history.status}
                                    </Text>
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                            }}>
                            <View style={{ zIndex: 1000 }}>
                                {history.status === 'FINISHED' && !history.feedback ? (
                                    <Button
                                        title="Feedback"
                                        onPress={() =>
                                            navigation.navigate('Feedback', {
                                                requestId: history.id,
                                            })
                                        }
                                    />
                                ) : null}
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </>
        );
    };
    const renderVehicleInfo = (
        <View
            style={{
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
                    <Text style={styles.textInput}>{currentVehicle.model.name}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.label}>VIN: </Text>
                    <Text style={styles.textInput}>{currentVehicle.vinNumber}</Text>
                </View>
            </View>
        </View>
    );
    useEffect(() => {
        axios.get(`requests/vehicles/${vehicle.id}`).then(rs => {
            setHistoryList(rs.data);
        });
    }, [vehicle.id]);
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
    }, [deleteVehicle, navigation, vehicle.id, vehicle.model.name]);
    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={renderVehicleInfo}
                data={historyList}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item: history }) => renderHistory(history)}
            />
            <View>
                <Button title="Update Information" onPress={() => setIsVisible(true)} />
            </View>

            <View>{modalUpdate()}</View>
        </View>
    );
};

export default VehicleDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //marginTop: Constants.statusBarHeight,
        flexDirection: 'column',
        height: '100%',
    },
});
