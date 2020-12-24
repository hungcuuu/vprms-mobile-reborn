// import { formatMoney } from '';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { formatMoney } from '../../utils';

const ReviewScreen = ({ navigation, route }) => {
    let detail = route.params.detail ?? [];
    let partList = route.params.partList ?? [];

    console.log('detail', detail);
    console.log('partList', partList);
    const [totalPrice, setTotalPrice] = useState(0);

    const renderParts = (part) => {
        let service = part.services.find((x) => x.serviceId === part.checked);

        return (
            <View style={{ borderWidth: 1 }}>
                <View>
                    <Text>{part.serviceName}</Text>
                </View>
                <View>
                    <Text>{part.part.name}</Text>
                    <Text>
                        {formatMoney(
                            (part.part.price * part.part.quantity ?? 0) +
                                (part.price ?? 0),
                        )}
                    </Text>
                    <Text>x{part.part.quantity}</Text>
                </View>
                {service ? (
                    <View>
                        <Text>{service.serviceName ?? ''}</Text>
                        <Text>{service.price ?? 0}</Text>
                    </View>
                ) : null}
            </View>
        );
    };
    useEffect(() => {
        let total = 0;
        partList.map((part) => {
            total +=
                part.part.price * part.part.quantity +
                (part.services.find((x) => x.serviceId === part.checked)
                    ? part.services.find((x) => x.serviceId === part.checked).price
                    : 0);
        });
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
                    data={partList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item: part }) => renderParts(part)}
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
                            partList: partList,
                        })
                    }
                />
            </View>
        </View>
    );
};

export default ReviewScreen;

const styles = StyleSheet.create({});
