import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

const AccessoryDetailScreen = ({ navigation, route }) => {
    const detail = route.params;

    return (
        <View>
            <View>
                <Text>{detail.ID}</Text>
            </View>
            <View>
                <Text>{detail.NAME}</Text>
            </View>
            <View>
                <Button
                    title="Book now"
                    onPress={() => navigation.navigate('ProviderAccessories')}
                />
            </View>
        </View>
    );
};

export default AccessoryDetailScreen;

const styles = StyleSheet.create({});
