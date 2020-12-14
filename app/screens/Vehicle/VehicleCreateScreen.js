import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Input, Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions';

const VehicleCreateScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [licensePlateNum, setLicensePlateNum] = useState('');
    // const userId = dispatch(actions.)
    const createVehicleHandler = (name, licensePlateNumber) => {
        dispatch(actions.createVehicle({ name, licensePlateNumber }));
        navigation.pop();
    };
    return (
        <View>
            <Text>Vehicle Create Screen</Text>

            <View>
                <Input
                    placeholder="License plate number"
                    onChangeText={(value) => setLicensePlateNum(value)}
                />
            </View>
            <View>
                <Input placeholder="Name" onChangeText={(value) => setName(value)} />
            </View>
            <View>
                <Input placeholder="A" onChangeText={(value) => setName(value)} />
            </View>
            <View>
                <Input placeholder="B" onChangeText={(value) => setName(value)} />
            </View>
            <View>
                <Input placeholder="C" onChangeText={(value) => setName(value)} />
            </View>
            <View>
                <Button
                    title="Add"
                    onPress={() => createVehicleHandler(name, licensePlateNum)}
                    // onPress={() => true}
                />
            </View>
        </View>
    );
};

export default VehicleCreateScreen;

const styles = StyleSheet.create({});
