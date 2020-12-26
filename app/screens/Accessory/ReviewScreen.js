// import { formatMoney } from '';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { formatMoney } from '../../utils';

const ReviewScreen = ({ navigation, route }) => {
    let detail = route.params.detail ?? [];
    let serviceList = route.params.serviceList ?? [];

    console.log('detail', detail);
    console.log('serviceList', serviceList);
    const [totalPrice, setTotalPrice] = useState(0);

    const renderServices = service => {
        let parts = service.parts ?? [];

        return (
            <View style={{ borderWidth: 1 }}>
                <View>
                    <Text>{service.name}</Text>
                </View>
                <View>
                    <Text>{service.price}</Text>
                    {/* <Text>
                        {formatMoney(
                            (part.part.price * part.part.quantity ?? 0) +
                                (part.price ?? 0),
                        )}
                    </Text> */}
                </View>
                <FlatList
                    data={parts}
                    initialNumToRender={7}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item: part }) => (
                        <View>
                            <Text>{part.name}</Text>
                        </View>
                    )}
                />
            </View>
        );
    };
    useEffect(() => {
        let total = 0;
        // partList.map(part => {
        //     total +=
        //         part.part.price * part.part.quantity +
        //         (part.services.find(x => x.serviceId === part.checked)
        //             ? part.services.find(x => x.serviceId === part.checked).price
        //             : 0);
        // });
        setTotalPrice(total);
    }, []);
    return (
        <View>
            <View>
                <View>
                    <Text>{detail.provider.name}</Text>
                </View>
                <View>
                    <Text>{detail.provider.address}</Text>
                </View>
            </View>
            <View>
                <FlatList
                    data={serviceList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item: part }) => renderServices(part)}
                />
            </View>
            <View>
                <Text>Total Price: {formatMoney(totalPrice)}</Text>
            </View>
            <View>
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
        </View>
    );
};

export default ReviewScreen;

const styles = StyleSheet.create({});
