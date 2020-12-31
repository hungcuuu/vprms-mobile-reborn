import React from 'react';
import { Text, View } from 'react-native';
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
                <Text>{detail.part.id}</Text>
            </View>
            <View>
                <Text>{detail.part.name}</Text>
            </View>
            <View>
                <Button
                    title="Book now"
                    onPress={() =>
                        navigation.navigate('AccessoryServices', { detail: detail })
                    }
                />
            </View>
        </View>
    );
};

export default AccessoryDetailScreen;
