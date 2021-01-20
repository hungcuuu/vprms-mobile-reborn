import React from 'react';
import { Image } from 'react-native';
import { FlatList, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

import { calculateReviewPrice, formatMoney } from '../../utils';

const ReviewScreen = ({ navigation, route }) => {
    let detail = route.params.detail ?? [];
    let serviceList = route.params.serviceList ?? [];
    let packageList = route.params.packageList ?? [];

    const totalPrice = calculateReviewPrice(serviceList, packageList);

    const renderParts = part => {
        return (
            <View style={{ flexDirection: 'row', height: 80 }}>
                <View style={{ width: '25%' }}>
                    <Image
                        resizeMethod="resize"
                        resizeMode="cover"
                        source={{
                            width: '100%',
                            height: '100%',
                            uri:
                                part.imageUrls[0] ??
                                'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/240px-No_image_available.svg.png',
                        }}
                    />
                </View>
                <View
                    style={{
                        marginHorizontal: 8,
                        flex: 1,
                        justifyContent: 'space-between',
                    }}>
                    <Text style={{ flexWrap: 'wrap' }}>{part.name}</Text>
                    <Text>{formatMoney(part.price)}</Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Text>{part.quantity}</Text>
                </View>
            </View>
        );
    };

    const renderServices = service => {
        let parts = service.parts ?? [];

        return (
            <View style={{ padding: 8 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginVertical: 8,
                    }}>
                    <Text
                        style={{
                            width: '60%',
                            color: 'red',
                            fontSize: 15,
                            fontWeight: 'bold',
                        }}>
                        {service.name}
                    </Text>
                    <Text
                        style={{
                            color: 'red',
                            fontSize: 15,
                            fontWeight: 'bold',
                        }}>
                        {formatMoney(service.price)}
                    </Text>
                </View>

                <FlatList
                    data={parts}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item: part }) => renderParts(part)}
                />
            </View>
        );
    };

    const renderPackageServices = service => {
        return (
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
                    }}>
                    {service.name}
                </Text>
            </View>
        );
    };

    const renderPackages = item => {
        return (
            <View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 8,
                        marginVertical: 8,
                    }}>
                    <Text
                        style={{
                            color: 'red',
                            fontSize: 15,
                            fontWeight: 'bold',
                        }}>
                        {item.name}
                    </Text>
                    <Text
                        style={{
                            color: 'red',
                            fontWeight: 'bold',
                        }}>
                        {formatMoney(item.totalPrice)}
                    </Text>
                </View>
                <FlatList
                    data={item.packagedServices}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item: ser }) => renderPackageServices(ser)}
                />
            </View>
        );
    };

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
                ListHeaderComponent={
                    serviceList.length ? (
                        <FlatList
                            data={serviceList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item: part }) => renderServices(part)}
                        />
                    ) : null
                }
                ListFooterComponent={
                    packageList ? (
                        <FlatList
                            data={packageList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item: Package }) => renderPackages(Package)}
                        />
                    ) : null
                }
            />

            <View
                style={{
                    marginVertical: 8,
                    borderTopWidth: 1,
                    padding: 8,
                }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text
                        style={{
                            fontWeight: 'bold',
                        }}>
                        Services Price:
                    </Text>
                    <Text>{formatMoney(totalPrice.services)}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text
                        style={{
                            fontWeight: 'bold',
                        }}>
                        Parts Price:
                    </Text>
                    <Text>{formatMoney(totalPrice.partsPrice)}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            alignSelf: 'flex-start',
                        }}>
                        Packages Price
                    </Text>
                    <Text>{formatMoney(totalPrice.packagePrice)}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            alignSelf: 'flex-start',
                        }}>
                        Total Price:
                    </Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'blue' }}>
                        {formatMoney(totalPrice.total)}
                    </Text>
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
