import React from 'react';
import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login({ navigation }) {
  React.useEffect(() => {
    navigation.setOptions({ title: 'Updated!' });
  }, []);
  return (
    <View style={{ backgroundColor: 'red' }}>
      <Text>ABC</Text>
      <Text>ABC</Text>
      <Text>ABC</Text>
      <Button
        title="AAA"
        onPress={() => navigation.navigate('Home', { screen: 'Main' })}
      />
    </View>
  );
}
