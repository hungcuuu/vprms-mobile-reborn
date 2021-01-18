import React, { useState } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Input, Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';

import { Colors } from '../../constants';
import * as actions from '../../store/actions';
import { formatPhoneNumber } from '../../utils';

const RegisterScreen = ({ navigation, ...rest }) => {
    const dispatch = useDispatch();
    const [phoneInput, setPhoneInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [fullnameInput, setFullnameInput] = useState('');
    const [code, setCode] = useState('');
    const [confirm, setConfirm] = useState(null);

    const registerHandler = () => {
        const firebasePhone = formatPhoneNumber(phoneInput);
        auth()
            .signInWithPhoneNumber(firebasePhone)
            .then(confirmation => {
                setConfirm(confirmation);
            });
    };

    const codeConfirmHandler = () => {
        confirm
            .confirm(code)
            .then(({ user }) => {
                // console.log(user.uid, phoneInput);
                const newUser = {
                    fullName: fullnameInput,
                    gender: true,
                    password: passwordInput,
                    phoneNumber: phoneInput,
                    uid: user.uid,
                };
                dispatch(actions.register(newUser));
            })
            .catch(err => console.log(err));
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
                {!confirm ? (
                    <>
                        <Input
                            keyboardType="phone-pad"
                            placeholder="Phone Number"
                            inputContainerStyle={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'phone' }}
                            onChangeText={value => setPhoneInput(value)}
                        />

                        <Input
                            placeholder="Password"
                            secureTextEntry={true}
                            inputContainerStyle={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'lock' }}
                            onChangeText={value => setPasswordInput(value)}
                        />
                        <Input
                            placeholder="Fullname"
                            inputContainerStyle={styles.input}
                            // leftIcon={{ type: 'font-awesome', name: 'lock' }}
                            onChangeText={value => setFullnameInput(value)}
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
                            title="Register"
                        />
                    </>
                ) : (
                    <>
                        <Input
                            placeholder="Code"
                            inputContainerStyle={styles.input}
                            // leftIcon={{ type: 'font-awesome', name: 'lock' }}
                            onChangeText={value => setCode(value)}
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
                            onPress={codeConfirmHandler}
                            title="Confirm"
                        />
                    </>
                )}
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
