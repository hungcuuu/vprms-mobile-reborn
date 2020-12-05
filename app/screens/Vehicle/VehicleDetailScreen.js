import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const VehicleDetailScreen = ({ navigation }) => {
    React.useEffect(() => {
        navigation.setOptions({ headerTitle: `Request #${id}` });
    }, []);
    return (
        <View>
            <Text>Detail</Text>
        </View>
    );
};

export default VehicleDetailScreen;

const styles = StyleSheet.create({});
