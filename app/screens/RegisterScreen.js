import React, { useState } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, Input, Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';

import { Colors } from '../constants';
import * as actions from '../store/actions';
const RegisterScreen = ({ navigation, ...rest }) => {
    const dispatch = useDispatch();
    const [phoneInput, setPhoneInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [fullnameInput, setFullnameInput] = useState('');

    const registerHandler = () => {
        dispatch(actions.registerRequest(phoneInput, passwordInput, fullnameInput));
    };

    return (
        <View
            style={{
                justifyContent: 'center',
                height: '100%',
                paddingHorizontal: 16,
                paddingTop: StatusBar.currentHeight,
            }}>
            <View style={{ alignSelf: 'center', marginBottom: 16 }}>
                <Ionicons size={120} name="ios-car" />
            </View>

            <View>
                <Input
                    keyboardType="phone-pad"
                    placeholder="Phone Number"
                    inputContainerStyle={styles.input}
                    leftIcon={{ type: 'font-awesome', name: 'phone' }}
                    onChangeText={(value) => setPhoneInput(value)}
                />

                <Input
                    placeholder="Password"
                    inputContainerStyle={styles.input}
                    leftIcon={{ type: 'font-awesome', name: 'lock' }}
                    onChangeText={(value) => setPasswordInput(value)}
                />
                <Input
                    placeholder="Fullname"
                    inputContainerStyle={styles.input}
                    // leftIcon={{ type: 'font-awesome', name: 'lock' }}
                    onChangeText={(value) => setFullnameInput(value)}
                />
                <Button
                    buttonStyle={{
                        backgroundColor: Colors.primary,
                        marginTop: 16,
                        width: '60%',
                        alignSelf: 'center',
                        borderRadius: 15,
                    }}
                    // loading={loading}
                    onPress={registerHandler}
                    title="Registers"
                />
                <Button
                    buttonStyle={{
                        backgroundColor: Colors.primary,
                        marginTop: 16,
                        width: '60%',
                        alignSelf: 'center',
                        borderRadius: 15,
                    }}
                    title="Back to Login"
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
            </View>
        </View>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
