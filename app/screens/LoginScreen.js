import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import * as actions from '../store/actions';
import { Colors } from '../constants';
import { connect } from 'react-redux';

const LoginScreen = ({ loading, error, navigation, onLogin, ...rest }) => {
  const [phoneInput, setPhoneInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const loginHandler = () => {
    onLogin(phoneInput, passwordInput);
  };

  useEffect(() => {
    navigation.setOptions({ title: 'Login' });
  }, []);

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
      {error ? (
        <View style={{ alignSelf: 'center', marginBottom: 16 }}>
          <Text style={{ color: 'red', fontSize: 18 }}>{error.message}</Text>
        </View>
      ) : null}
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
        <Button
          buttonStyle={{
            backgroundColor: Colors.primary,
            marginTop: 16,
            width: '60%',
            alignSelf: 'center',
            borderRadius: 15,
          }}
          loading={loading}
          onPress={loginHandler}
          title="Login"
        />
        <Button
          buttonStyle={{
            backgroundColor: Colors.primary,
            marginTop: 16,
            width: '60%',
            alignSelf: 'center',
            borderRadius: 15,
          }}
          title="Register"
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (phoneNumber, password) =>
      dispatch(actions.loginRequest(phoneNumber, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
