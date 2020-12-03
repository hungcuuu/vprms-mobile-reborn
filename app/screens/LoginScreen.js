import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Colors } from '../constants';

export default function LoginScreen({ navigation, ...rest }) {
  React.useEffect(() => {
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
      <View>
        <Input
          keyboardType="phone-pad"
          placeholder="Phone Number"
          inputContainerStyle={styles.input}
          leftIcon={{ type: 'font-awesome', name: 'phone' }}
          onChangeText={(value) => {}}
        />
        <Input
          placeholder="Password"
          inputContainerStyle={styles.input}
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(value) => {}}
        />
        <Button
          buttonStyle={{
            backgroundColor: Colors.primary,
            marginTop: 16,
            width: '60%',
            alignSelf: 'center',
            borderRadius: 15,
          }}
          onPress={() => {}}
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
}

const styles = StyleSheet.create({});
