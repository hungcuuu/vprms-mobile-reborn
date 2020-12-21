// import { formatMoney } from '';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { formatMoney } from '../../utils';

const ReviewScreen = ({ navigation, route }) => {
    let detail = route.params.detail ?? [];
    let partList = route.params.partList ?? [];
    console.log(partList);
    const renderParts = (part) => {
        return (
            <View style={{ borderWidth: 1 }}>
                <View>
                    <Text>{part.serviceName}</Text>
                </View>
                <View>
                    <Text>{part.part.name}</Text>
                </View>
                <View>
                    <Text>
                        {formatMoney(
                            (part.part.price * part.part.quantity ?? 0) +
                                (part.price ?? 0),
                        )}
                    </Text>
                </View>
            </View>
        );
    };
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
