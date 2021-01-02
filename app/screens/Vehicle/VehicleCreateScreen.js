import React, { useState, useEffect } from 'react';
import { Alert, Text, View } from 'react-native';
import { Picker } from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Input, Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from '../../store/actions';
import axios from '../../axios';

const VehicleCreateScreen = ({ navigation }) => {
    const user = useSelector(state => state.auth.user ?? {});

    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);

    const [boughtDate, setBoughtDate] = useState(new Date());
    const [currentManu, setCurrentManu] = useState(1);
    const [manufactureList, setManufactureList] = useState();
    const [vehicleTypeList, setVehicleTypeList] = useState([]);
    const [currentVehicle, setCurrentVehicle] = useState({
        boughtDate: 0,
        color: 'red',
        modelId: 1,
        plateNumber: '',
        userId: user.id,
        vinNumber: '',
    });
    const createVehicleHandler = () => {
        dispatch(
            actions.createVehicle(currentVehicle, () => {
                navigation.goBack();
            }),
        );
        // , () => {
        // console.log('done');
    };
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setModalVisible(false);
        setBoughtDate(currentDate);
    };
    const getManufactures = () => {
        axios
            .get('manufacturers/', {
                headers: {
                    'Content-Type': 'application/json ; charset=UTF-8',
                    Accept: 'application/json',
                },
            })
            .then(rs => setManufactureList(rs.data))
            .catch(err => Alert.alert(err));
    };
    const getVehicleTypeList = async id => {
        return axios
            .get('models/manufacturers/' + id, {
                headers: {
                    'Content-Type': 'application/json ; charset=UTF-8',
                    Accept: 'application/json',
                },
            })
            .then(rs => setVehicleTypeList(rs.data))
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
                    onChangeText={value => {
                        setCurrentVehicle(currentVehicle => ({
                            ...currentVehicle,
                            plateNumber: value,
                        }));
                    }}
                />
            </View>
            <View>
                <Input
                    placeholder="VIN"
                    onChangeText={value => {
                        setCurrentVehicle(currentVehicle => ({
                            ...currentVehicle,
                            vinNumber: value,
                        }));
                    }}
                />
            </View>
            <View>
                <Text>manufacturers</Text>
                <Picker
                    mode="dropdown"
                    selectedValue={currentManu}
                    style={{ height: 50 }}
                    onValueChange={(itemValue, itemIndex) => {
                        setCurrentManu(itemValue);
                        getVehicleTypeList(itemValue);
                    }}>
                    {manufactureList
                        ? manufactureList.map(m => (
                              <Picker.Item key={m.id} label={m.name} value={m.id} />
                          ))
                        : null}
                </Picker>
            </View>
            <View>
                <Text>Model</Text>
                {vehicleTypeList !== undefined ? (
                    <View>
                        <Picker
                            mode="dropdown"
                            selectedValue={+currentVehicle.modelId}
                            style={{ height: 50 }}
                            onValueChange={(itemValue, itemIndex) => {
                                setCurrentVehicle(currentVehicle => ({
                                    ...currentVehicle,
                                    modelId: itemValue ? itemValue.toString() : '',
                                }));
                            }}>
                            {vehicleTypeList.map(t => (
                                <Picker.Item
                                    key={t.id}
                                    label={t.name + ' ' + t.year}
                                    value={t.id}
                                />
                            ))}
                        </Picker>
                    </View>
                ) : null}
            </View>

            <View>
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
            </View>
            <View>
                <Button
                    onPress={() => setModalVisible(true)}
                    title="Pick your bought date"
                />
            </View>
            <View>
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
            </View>

            {modalVisible && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={boughtDate}
                    maximumDate={new Date()}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={(event, value) => onChange(event, value)}
                />
            )}
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
