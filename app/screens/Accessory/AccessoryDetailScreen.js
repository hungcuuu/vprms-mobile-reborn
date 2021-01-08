import React from 'react';
import { Image } from 'react-native';
import { Dimensions } from 'react-native';
import { ScrollView } from 'react-native';
import { Text, View, Button } from 'react-native';
import { Card } from 'react-native-elements';
import { formatMoney } from '../../utils';

const AccessoryDetailScreen = ({ navigation, route }) => {
    const detail = route.params;
    console.log(detail);

    return (
        <View style={{ padding: 8, flex: 1 }}>
            <ScrollView
                style={{ paddingVertical: 16 }}
                showsVerticalScrollIndicator={false}>
                <Text style={{ textAlign: 'center' }}>{detail.provider.name}</Text>

                <Text>{detail.provider.address}</Text>

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
                        height: Dimensions.get('screen').width * 0.6,
                        width: Dimensions.get('screen').width * 0.8,
                        // padding: 8,
                    }}>
                    <Image
                        resizeMethod="auto"
                        resizeMode="contain"
                        source={{
                            uri: detail.part.imageUrls[0] ?? '',
                            // height: Dimensions.get('screen').width * 0.6,
                            // width: Dimensions.get('screen').width * 0.8,
                            height: '100%',
                            width: '100%',
                        }}
                    />
                    {/* <Text style={{}}>Description:</Text> */}
                    {/* <Text style={{}}>{detail.part.description}</Text> */}
                </View>
                <Text style={{}}>{detail.part.description}</Text>

                <Card.Divider />
                <View style={{ height: 50 }}>
                    <Text style={{ color: 'red' }}>{formatMoney(detail.part.price)}</Text>
                </View>
            </ScrollView>
            <Button
                title="Book now"
                onPress={() =>
                    navigation.navigate('AccessoryServices', { detail: detail })
                }
                // style={{ flex: 1 }}
            />
        </View>
    );
};

export default AccessoryDetailScreen;
