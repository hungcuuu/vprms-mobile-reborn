import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

const AccessoryDetailScreen = ({ navigation, route }) => {
    const detail = route.params;
    // console.log(detail);

    return (
        <View>
            <View>
                <Text>{detail.provider.name}</Text>
            </View>
            <View>
                <Text>{detail.part.name}</Text>
            </View>
            <View>
                <Button
                    title="Book now"
                    onPress={() => navigation.navigate('ProviderAccessories', detail)}
                />
            </View>
        </View>
    );
};

export default AccessoryDetailScreen;

const styles = StyleSheet.create({});
