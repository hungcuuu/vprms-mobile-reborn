import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { FlatList, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { calculateReviewPrice, calculateServicePrice, formatMoney } from '../../utils';

const ReviewScreen = ({ navigation, route }) => {
    let detail = route.params.detail ?? [];
    let serviceList = route.params.serviceList ?? [];
    let packageList = route.params.packageList ?? [];
    console.log('detail', detail);
    console.log('package', packageList);
    const totalPrice = calculateReviewPrice(serviceList, packageList);

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
    const renderPackageServices = service => {
        return (
            <View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 16,
                    }}>
                    <Text
                        style={{
                            color: 'black',
                            fontSize: 15,
                            // fontWeight: 'bold',
                        }}>{`- ${service.name} `}</Text>
                </View>
            </View>
        );
    };
    const renderPackages = pac => {
        return (
            <View style={{ borderTopWidth: 1 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 8,
                    }}>
                    <Text
                        style={{
                            color: 'red',
                            // fontSize: 13,
                            fontWeight: 'bold',
                        }}>{`${pac.name} `}</Text>
                    <Text
                        style={{
                            color: 'red',
                            // fontSize: 15,
                            fontWeight: 'bold',
                        }}>{`${formatMoney(pac.totalPrice)} `}</Text>
                </View>

                <FlatList
                    data={pac.packagedServices}
                    initialNumToRender={7}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item: ser }) => renderPackageServices(ser)}
                />
            </View>
        );
    };
    // useEffect(() => {
    //     setTotalPrice(calculateReviewPrice(serviceList, packageList));
    // }, [packageList, serviceList]);
    return (
        <View style={{ flex: 1 }}>
            <View style={{ padding: 16 }}>
                <View>
                    <Text style={{ fontWeight: 'bold' }}>{detail.provider.name}</Text>
                </View>
                <View>
                    <Text>{detail.provider.address}</Text>
                </View>
            </View>

            <FlatList
                data={serviceList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item: part }) => renderServices(part)}
                ListFooterComponent={
                    <View style={{ marginTop: 20 }}>
                        <FlatList
                            data={packageList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item: Package }) => renderPackages(Package)}
                        />
                    </View>
                }
                // ListFooterComponentStyle={{ margin: 20, padding: 20 }}
                contentContainerStyle={{ margin: 8, padding: 8 }}
            />

            <View
                style={{
                    marginVertical: 8,
                    borderTopWidth: 1,
                    padding: 16,
                }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text
                        style={{
                            fontWeight: 'bold',
                        }}>{`Service: `}</Text>
                    <Text>{`${formatMoney(totalPrice.services)}`}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text
                        style={{
                            fontWeight: 'bold',
                        }}>
                        {`Parts Price: `}
                    </Text>
                    <Text>{`${formatMoney(totalPrice.partsPrice)}`}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            alignSelf: 'flex-start',
                        }}>
                        {`Package Price: `}
                    </Text>
                    <Text>{`${formatMoney(totalPrice.packagePrice)}`}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            alignSelf: 'flex-start',
                        }}>
                        {`Total: `}
                    </Text>
                    <Text>{`${formatMoney(totalPrice.total)}`}</Text>
                </View>
            </View>

            <Button
                title="Next"
                onPress={() =>
                    navigation.navigate('Schedule', {
                        detail: detail,
                        serviceList: serviceList,
                        packageList: packageList,
                    })
                }
            />
        </View>
    );
};

export default ReviewScreen;
