import React from 'react';
import { Image } from 'react-native';
import { Dimensions } from 'react-native';
import { ScrollView } from 'react-native';
import { Text, View } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { formatMoney } from '../../utils';

const AccessoryDetailScreen = ({ navigation, route }) => {
    const detail = route.params;
    console.log(detail);

    return (
        <View style={{ flex: 1, padding: 8 }}>
            <ScrollView style={{ paddingVertical: 16 }}>
                <View>
                    <Text style={{ textAlign: 'center' }}>{detail.provider.name}</Text>
                </View>
                <View>
                    <Text>{detail.provider.address}</Text>
                </View>
                {/* <View>
                <Text>{detail.part.id}</Text>
            </View> */}
                <Card.Divider />
                <View
                    style={{
                        // justifyContent: 'space-between',
                        // flexDirection: 'row',
                        margin: 8,
                    }}>
                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                        {detail.part.name}
                    </Text>
                </View>
                <View
                    style={{
                        // flexDirection: 'row',
                        // justifyContent: 'space-between',
                        margin: 20,
                        alignItems: 'center',
                        // padding: 8,
                    }}>
                    <Image
                        resizeMethod="auto"
                        resizeMode="stretch"
                        source={{
                            uri: detail.part.imageUrls[0] ?? '',
                            height: Dimensions.get('screen').width * 0.6,
                            width: Dimensions.get('screen').width * 0.8,
                        }}
                    />
                    {/* <Text style={{}}>Description:</Text> */}
                    {/* <Text style={{}}>{detail.part.description}</Text> */}
                </View>
                <Text style={{}}>{detail.part.description}</Text>

                <Card.Divider />

                <Text style={{ color: 'red' }}>{formatMoney(detail.part.price)}</Text>

                {/* <View
                    style={{
                        justifyContent: 'space-around',
                        flexDirection: 'row',
                        // margin: 8,
                        borderWidth: 1,
                    }}>
                    <Text style={{}}>Description:</Text>
                    <Text>{detail.part.description}</Text>
                </View> */}
            </ScrollView>
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
