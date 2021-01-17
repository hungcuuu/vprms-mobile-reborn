import React, { useState, useEffect } from 'react';
import { Alert, Text, View } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { Input, Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import * as actions from '../../store/actions';
import axios from '../../axios';

const VehicleCreateScreen = ({ navigation }) => {
    const user = useSelector(state => state.auth.user ?? {});

    const dispatch = useDispatch();
    // const [modalVisible, setModalVisible] = useState(false);

    const [currentManu, setCurrentManu] = useState(1);
    const [manufactureList, setManufactureList] = useState();
    const [vehicleTypeList, setVehicleTypeList] = useState([]);
    const [vehicleTypeName, setVehicleTypeName] = useState('CRV');
    const [error, setError] = useState({
        errorVIN: '',
        errorPlate: '',
    });
    const [currentVehicle, setCurrentVehicle] = useState({
        boughtDate: 0,
        color: 'red',
        modelId: 1,
        plateNumber: '',
        userId: user.id,
        vinNumber: '',
    });
    const createVehicleHandler = () => {
        let check = true;
        if (currentVehicle.vinNumber.length === 0) {
            setError(cur => ({
                ...cur,
                errorVIN: 'VIN can not be blank!',
            }));
            check = false;
        } else if (currentVehicle.vinNumber.length !== 17) {
            setError(cur => ({
                ...cur,
                errorVIN: 'VIN must has 17 digits!',
            }));
            check = false;
        } else {
            setError(cur => ({
                ...cur,
                errorVIN: '',
            }));
        }
        if (currentVehicle.plateNumber.length === 0) {
            setError(cur => ({
                ...cur,
                errorPlate: 'Plate number can not be blank!',
            }));
            check = false;
        } else {
            setError(cur => ({
                ...cur,
                errorPlate: '',
            }));
        }
        if (check) {
            dispatch(
                actions.createVehicle(currentVehicle, () => {
                    navigation.goBack();
                }),
            );
        }
    };
    // const onChange = (event, selectedDate) => {
    //     const currentDate = selectedDate;
    //     setModalVisible(false);
    //     setBoughtDate(currentDate);
    // };
    const getManufactures = () => {
        axios
            .get('manufacturers/', {
                headers: {
                    'Content-Type': 'application/json ; charset=UTF-8',
                    Accept: 'application/json',
                },
            })
            .then(rs => {
                setManufactureList(rs.data);
            })
            .catch(err => Alert.alert(err));
    };

    const getVehicleTypeList = id => {
        axios
            .get('models/manufacturers/' + id, {
                headers: {
                    'Content-Type': 'application/json ; charset=UTF-8',
                    Accept: 'application/json',
                },
            })
            .then(rs => {
                setVehicleTypeName(rs.data.find(x => x)?.name);
                // setVehicleModelId(rs.data.find(x => x)?.id);
                setVehicleTypeList(rs.data);
                setCurrentVehicle(currentVehicle => ({
                    ...currentVehicle,
                    modelId: rs.data.find(x => x)?.id,
                }));
            })
            .catch(er => Alert.alert(er));
    };

    useEffect(() => {
        getManufactures();
    }, []);
    return (
        <View>
            <View>
                <Input
                    placeholder="License plate number"
                    maxLength={15}
                    onChangeText={value => {
                        setCurrentVehicle(currentVehicle => ({
                            ...currentVehicle,
                            plateNumber: value,
                        }));
                    }}
                    errorMessage={error.errorPlate}
                />
            </View>
            <View>
                <Input
                    placeholder="VIN"
                    keyboardType="number-pad"
                    maxLength={17}
                    onChangeText={value => {
                        setCurrentVehicle(currentVehicle => ({
                            ...currentVehicle,
                            vinNumber: value,
                        }));
                    }}
                    errorMessage={error.errorVIN}
                />
            </View>
            <View>
                <Text>manufacturers</Text>
                <Picker
                    mode="dropdown"
                    selectedValue={currentManu}
                    style={{ height: 50 }}
                    onValueChange={(itemValue, itemIndex) => {
                        getVehicleTypeList(itemValue);
                        setCurrentManu(itemValue);
                    }}>
                    {manufactureList
                        ? manufactureList.map(m => (
                              <Picker.Item key={m.id} label={m.name} value={m.id} />
                          ))
                        : null}
                </Picker>
            </View>
            <View>
                <Text>Name</Text>
                {vehicleTypeList !== undefined && (
                    <View>
                        <Picker
                            mode="dropdown"
                            selectedValue={vehicleTypeName}
                            style={{ height: 50 }}
                            onValueChange={(itemValue, itemIndex) => {
                                setVehicleTypeName(itemValue);

                                setCurrentVehicle(currentVehicle => ({
                                    ...currentVehicle,
                                    modelId: vehicleTypeList.find(
                                        x => x.name === itemValue,
                                    )?.id,
                                }));
                            }}>
                            {_.uniqBy(vehicleTypeList, 'name').map(t => (
                                <Picker.Item
                                    key={t.id}
                                    label={`${t.name} `}
                                    value={t.name}
                                />
                            ))}
                        </Picker>
                    </View>
                )}
            </View>
            <View>
                <Text>Model</Text>
                {vehicleTypeList !== undefined && (
                    <View>
                        <Picker
                            mode="dropdown"
                            selectedValue={currentVehicle.modelId}
                            style={{ height: 50 }}
                            onValueChange={(itemValue, itemIndex) => {
                                setCurrentVehicle(currentVehicle => ({
                                    ...currentVehicle,
                                    modelId: itemValue ? itemValue : '',
                                }));
                                // setVehicleModelId(itemValue);
                            }}>
                            {vehicleTypeList
                                .filter(x => x.name === vehicleTypeName)
                                .map(t => (
                                    <Picker.Item
                                        key={t.id}
                                        label={`${t.name} ${t.fuelType} ${t.gearbox} (${t.year})`}
                                        value={t.id}
                                    />
                                ))}
                        </Picker>
                    </View>
                )}
            </View>
            {/* <View>
                <Text>Color</Text>
                <Picker
                    mode="dropdown"
                    selectedValue={currentVehicle.color}
                    style={{
                        height: 50,
                        backgroundColor: '' + currentVehicle.color,
                        color: currentVehicle.color,
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                        setCurrentVehicle(currentVehicle => ({
                            ...currentVehicle,
                            color: itemValue.toString(),
                        }))
                    }>
                    <Picker.Item label="red" value="red" />
                    <Picker.Item label="blue" value="blue" />
                    <Picker.Item label="green" value="green" />
                    <Picker.Item label="yellow" value="yellow" />
                    <Picker.Item label="orange" value="orange" />
                    <Picker.Item label="black" value="black" />
                    <Picker.Item label="grey" value="grey" />
                    <Picker.Item label="silver" value="silver" />
                    <Picker.Item label="white" value="white" />
                </Picker>
            </View> */}
            {/* <View>
                <Button
                    onPress={() => setModalVisible(true)}
                    title="Pick your bought date"
                />
            </View> */}
            {/* <View>
                <Input
                    value={
                        '' +
                        boughtDate.toLocaleDateString('vi-VN', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })
                    }
                />
            </View> */}

            {/* {modalVisible && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={boughtDate}
                    maximumDate={new Date()}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={(event, value) => onChange(event, value)}
                />
            )} */}
            <View>
                <Button
                    title="Add"
                    onPress={() => createVehicleHandler()}
                    // onPress={() => true}
                />
            </View>
        </View>
    );
};

export default VehicleCreateScreen;
