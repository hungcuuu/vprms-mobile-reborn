import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { FlatList, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { calculateReviewPrice, formatMoney } from '../../utils';

const ReviewScreen = ({ navigation, route }) => {
    let detail = route.params.detail ?? [];
    let serviceList = route.params.serviceList ?? [];

    console.log('detail', detail);
    console.log('part', serviceList);
    const [totalPrice, setTotalPrice] = useState({});

    const renderParts = part => {
        return (
            <>
                <View
                    style={{
                        flex: 1,
                        // borderWidth: 1,
                        marginHorizontal: 8,
                        marginVertical: 4,
                        flexDirection: 'row',
                        // justifyContent: 'space-between',
                    }}>
                    <View
                        style={{
                            // borderWidth: 1,
                            minHeight: 70,
                            width: '20%',
                        }}>
                        <Image
                            resizeMethod="resize"
                            resizeMode="contain"
                            source={{
                                uri:
                                    part.imageUrls[0] ??
                                    'https://i.vimeocdn.com/portrait/58832_300x300.jpg',
                                height: '100%',
                                width: '100%',
                            }}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </View>

                    <View style={{ width: '80%' }}>
                        <Text>{` ${part.name}   `}</Text>
                        <Text
                            style={{
                                width: '100%',
                                textAlign: 'right',
                            }}>{`x ${part.quantity}`}</Text>
                        <Text>{` ${formatMoney(part.price)}`}</Text>
                    </View>
                </View>
            </>
        );
    };
    const renderServices = service => {
        let parts = service.parts ?? [];

        return (
            <View style={{ borderTopWidth: 1 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 16,
                    }}>
                    <Text
                        style={{
                            color: 'red',
                            fontSize: 15,
                            fontWeight: 'bold',
                        }}>{`${service.name} `}</Text>
                    <Text
                        style={{
                            color: 'red',
                            fontSize: 15,
                            fontWeight: 'bold',
                        }}>{`${formatMoney(service.price)} `}</Text>
                </View>

                <FlatList
                    data={parts}
                    initialNumToRender={7}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item: part }) => renderParts(part)}
                />
            </View>
        );
    };
    useEffect(() => {
        setTotalPrice(calculateReviewPrice(serviceList));
    }, [serviceList]);
    return (
        <View style={{ flex: 1 }}>
            <View>
                <View>
                    <Text>{detail.provider.name}</Text>
                </View>
                <View>
                    <Text>{detail.provider.address}</Text>
                </View>
            </View>

            <FlatList
                data={serviceList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item: part }) => renderServices(part)}
            />

            <View
                style={{
                    marginVertical: 8,
                    borderTopWidth: 1,
                }}>
                <Text
                    style={{
                        fontWeight: 'bold',
                        alignSelf: 'flex-end',
                    }}>{`Service: ${formatMoney(totalPrice.services)}`}</Text>
                <Text
                    style={{
                        fontWeight: 'bold',
                        alignSelf: 'flex-end',
                    }}>{`Parts Price: ${formatMoney(totalPrice.partsPrice)}`}</Text>
                <Text
                    style={{
                        fontWeight: 'bold',
                        alignSelf: 'flex-end',
                    }}>{`Total: ${formatMoney(totalPrice.total)}`}</Text>
            </View>

            <Button
                title="Next"
                onPress={() =>
                    navigation.navigate('Schedule', {
                        detail: detail,
                        serviceList: serviceList,
                    })
                }
            />
        </View>
    );
};

export default ReviewScreen;
