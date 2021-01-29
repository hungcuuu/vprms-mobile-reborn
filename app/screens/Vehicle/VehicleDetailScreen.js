import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, Card, Input } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { FlatList } from 'react-native';
import { useCallback } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

import * as actions from '../../store/actions';
import axios from '../../axios';
import { STATUS, STATUS_TAG_COLORS } from '../../constants/index';
import { Image } from 'react-native';
import { formatMoney } from '../../utils';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { RefreshControl } from 'react-native';

const VehicleDetailScreen = ({ route, navigation }) => {
    const vehicle = route.params;
    // console.log(vehicle);
    const dispatch = useDispatch();
    const error = useSelector(state => state.vehicles.error);
    const [currentVehicle, setCurrentVehicle] = useState(vehicle);
    const [isVisible, setIsVisible] = useState(false);
    const [historyList, setHistoryList] = useState([]);
    const [partList, setPartList] = useState([]);
    const [show, setShow] = useState(false);
    const [maxDate, setMaxDate] = useState(new Date());
    const [currentDate, setCurrentDate] = useState(new Date());
    const [reminderId, setReminderId] = useState('');
    // const [renderNum, setRenderNum] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    const wait = timeout => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    };
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        axios
            .get(`requests/vehicles/${vehicle.id}`)
            .then(rs => {
                setHistoryList(rs.data);
                // console.log(rs.data);
            })
            .catch(error => {
                if (error.response) {
                    Alert.alert('Something went wrong!', error.response.data.message);
                }
            });
        axios
            .get(`accessories/vehicles/${vehicle.id}`)
            .then(rs => {
                // console.log('data', rs.data);
                setPartList(rs.data);
            })
            .catch(error => {
                if (error.response) {
                    Alert.alert('Something went wrong!', error.response.data.message);
                }
            });
        wait(1000).then(() => setRefreshing(false));
    }, [vehicle.id]);
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
            case STATUS.CONFIRMED:
                return STATUS_TAG_COLORS.Confirm;
        }
    };

    // const deleteVehicle = id => {
    //     Alert.alert('', 'Do u want to Delete this Vehicle?', [
    //         {
    //             text: 'Cancel',
    //             style: 'cancel',
    //         },
    //         {
    //             text: 'OK',
    //             onPress: () => {
    //                 dispatch(actions.deleteVehicle(id, () => navigation.pop()));
    //             },
    //         },
    //     ]);
    // };
    // const seeMoreHandler = () => {
    //     setRenderNum(renderNum + 1);
    // };
    const openDatePicker = (maxDate, remideDate, id) => {
        setShow(true);
        setMaxDate(new Date(maxDate));
        setCurrentDate(new Date(remideDate));
        setReminderId(id);
    };
    const onDateChange = date => {
        console.log(date);
        let newDate = moment(new Date(date)).unix();
        console.log(newDate);
        axios
            .get(`accessories/reminders/${reminderId}/time/${newDate}`)
            .then(() => {
                setShow(false);
                onRefresh();
            })
            .catch(error => {
                if (error.response) {
                    Alert.alert('Something went wrong!', error.response.data.message);
                }
            });
    };
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
    const renderParts = part => {
        return (
            <View
                style={{
                    flex: 1,
                    borderWidth: 1,
                    marginHorizontal: 8,
                    marginVertical: 4,
                    flexDirection: 'row',
                    // justifyContent: 'space-between',
                }}>
                <View
                    style={{
                        // borderWidth: 1,
                        minHeight: 70,
                        width: '20%',
                    }}>
                    <Image
                        resizeMethod="resize"
                        resizeMode="contain"
                        source={{
                            uri:
                                part.part.imageUrls[0] ??
                                'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/240px-No_image_available.svg.png',
                            height: '100%',
                            width: '100%',
                        }}
                        style={{ width: '100%', height: '100%' }}
                    />
                </View>

                <View style={{ flex: 1 }}>
                    <Text>
                        {` ${part.part.name}   `}
                        {`x ${part.quantity}`}
                    </Text>

                    <Text>
                        <Ionicons name="alarm-outline" size={20} />
                        Remind Date: <Text>{part.reminder?.remindDate}</Text>
                    </Text>

                    <Text>
                        {' '}
                        <Ionicons name="md-calendar" size={20} />
                        Maintenance:{' '}
                        <Text
                            style={{
                                textAlign: 'right',
                            }}>
                            {part.reminder?.maintenanceDate}
                        </Text>
                    </Text>
                </View>
                <Button
                    title="Change"
                    onPress={() =>
                        openDatePicker(
                            part.reminder.maintenanceDate,
                            part.reminder.remindDate,
                            part.reminder.id,
                        )
                    }
                    style={{ alignSelf: 'center' }}
                />
            </View>
        );
    };
    const renderHistory = history => {
        return (
            <>
                <TouchableOpacity
                    useForeground
                    onPress={() =>
                        navigation.navigate('BookingDetail', {
                            detail: history,
                        })
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
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.label}>Plate Number: </Text>
                    <Text style={styles.textInput}>{currentVehicle.plateNumber}</Text>
                </View>
            </View>
        </View>
    );

    useEffect(() => {
        axios
            .get(`requests/vehicles/${vehicle.id}`)
            .then(rs => {
                setHistoryList(rs.data);
                // console.log(rs.data);
            })
            .catch(error => {
                if (error.response) {
                    Alert.alert('Something went wrong!', error.response.data.message);
                }
            });
        axios
            .get(`accessories/vehicles/${vehicle.id}`)
            .then(rs => {
                setPartList(rs.data);
            })
            .catch(error => {
                if (error.response) {
                    Alert.alert('Something went wrong!', error.response.data.message);
                }
            });
    }, [vehicle.id]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={() => {
                        Alert.alert('', 'Do u want to Delete this Vehicle?', [
                            {
                                text: 'Cancel',
                                style: 'cancel',
                            },
                            {
                                text: 'OK',
                                onPress: () => {
                                    dispatch(
                                        actions.deleteVehicle(vehicle.id, () =>
                                            navigation.pop(),
                                        ),
                                    );
                                },
                            },
                        ]);
                    }}
                    title="Delete"
                    buttonStyle={{ backgroundColor: 'red' }}
                />
            ),
            headerTitle: vehicle.model.name,
        });
    }, [dispatch, navigation, vehicle.id, vehicle.model.name]);
    return (
        <View style={styles.container}>
            <FlatList
                refreshControl={
                    <RefreshControl
                        colors={['#9Bd35A', '#689F38']}
                        onRefresh={onRefresh}
                        refreshing={refreshing}
                    />
                }
                ListHeaderComponent={
                    <>
                        {renderVehicleInfo}
                        <Text style={{ fontSize: 15, fontWeight: 'bold', padding: 8 }}>
                            History
                        </Text>
                        <FlatList
                            // ListHeaderComponent={renderVehicleInfo}
                            data={historyList.slice(0, 3)}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item: history }) => renderHistory(history)}
                            scrollEnabled={false}
                            // style={{ borderWidth: 1, borderColor: 'green' }}
                            // ListFooterComponent={
                            //     <>
                            //         <Text
                            //             onPress={() => seeMoreHandler()}
                            //             style={{ textAlign: 'right' }}>
                            //             See more
                            //         </Text>
                            //     </>
                            // }
                        />
                        <Text style={{ fontSize: 15, fontWeight: 'bold', padding: 8 }}>
                            Part
                        </Text>
                    </>
                }
                ListHeaderComponentStyle={{ marginVertical: 15 }}
                data={partList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item: part }) => renderParts(part)}
                // contentContainerStyle={{ flex: 1, borderWidth: 1, borderColor: 'red' }}
                scrollEnabled={true}
                style={{ flex: 1 }}
            />

            <Button title="Update Information" onPress={() => setIsVisible(true)} />

            <View>{modalUpdate()}</View>
            {show ? (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={currentDate}
                    mode={'date'}
                    display="default"
                    minimumDate={new Date()}
                    maximumDate={maxDate}
                    onChange={(event, date) =>
                        event.type === 'set' ? onDateChange(date) : setShow(false)
                    }
                />
            ) : null}
        </View>
    );
};

export default VehicleDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //marginTop: Constants.statusBarHeight,
        // flexDirection: 'column',
        // height: '100%',
    },
});
