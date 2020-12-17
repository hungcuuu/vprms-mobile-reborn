import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, CheckBox, SearchBar } from 'react-native-elements';

import axios from '../../axios';
import { ACCESSORIES } from '../../data/accessories';

import { normalizeString } from '../../utils';
const ProviderAccessoriesScreen = ({ navigation, route }) => {
    const detail = route.params;
    // console.log('detail', detail);
    const [selections, setSelections] = useState([
        // {
        //     id: detail.part.id,
        //     name: detail.part.id,
        //     price: detail.part.price,
        //     quantity: 1,
        //     categoryId: '',
        // },
    ]);
    const [accessories, setAccessories] = useState([]);
    const [filteredAccessories, setFilteredAccessories] = useState([]);
    const [searchText, setSearchText] = useState('');

    const searchHandler = (text) => {
        setSearchText(text);
        if (!text || text === '') {
            setFilteredAccessories([...accessories]);
        }

        const updatedAccessories = accessories.filter((ser) =>
            normalizeString(ser.name).match(normalizeString(text)),
        );
        setFilteredAccessories(updatedAccessories);
    };

    const onAddPart = (itemId, price, categoryId, name) => {
        const updatedSelections = [...selections];
        const index = selections.findIndex((item) => item.id === itemId);
        if (index >= 0) {
            // Update quantity
            updatedSelections[index].quantity++;
        } else {
            // Add to list
            updatedSelections.push({
                id: itemId,
                name: name,
                price: price,
                quantity: 1,
                categoryId: categoryId,
            });
        }
        setSelections(updatedSelections);
    };

    const onRemovePart = (itemId) => {
        let updatedSelections = [...selections];
        const index = selections.findIndex((item) => item.id === itemId);
        if (index >= 0) {
            if (updatedSelections[index].quantity >= 1) {
                updatedSelections[index].quantity--;
            } else {
                updatedSelections = updatedSelections.splice(index, 1);
            }
        } else {
            return;
        }
        setSelections(updatedSelections);
    };
    const renderAccessoryList = (itemData) => {
        const quantity =
            selections.find((item) => item.id === itemData.item.id)?.quantity ?? 0;

        return (
            <View
                style={{
                    // flex: 1,
                    flexDirection: 'row',
                    height: 70,
                    borderWidth: 1,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        width: '70%',
                    }}>
                    <Text
                        style={{
                            height: '100%',
                            width: '100%',
                            textAlign: 'center',
                        }}>
                        {itemData.item.name}
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        paddingHorizontal: 16,

                        // borderWidth: 1,
                        height: '100%',

                        // justifyContent: 'flex-end',
                    }}>
                    <Button
                        buttonStyle={{
                            backgroundColor: 'red',
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            // justifyContent: 'flex-end',

                            // alignSelf: 'flex-end',
                        }}
                        title="-"
                        onPress={() => onRemovePart(itemData.item.id)}
                    />
                    <Text
                        style={{
                            alignSelf: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                            // borderWidth: 1,
                            height: '100%',
                            width: 20,
                            textAlign: 'center',
                        }}>
                        {quantity}
                    </Text>
                    <Button
                        buttonStyle={{
                            backgroundColor: 'red',
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                        }}
                        title="+"
                        onPress={() =>
                            onAddPart(
                                itemData.item.id,
                                itemData.item.price,
                                itemData.item.categoryId,
                                itemData.item.name,
                            )
                        }
                    />
                </View>
            </View>
        );
    };

    useEffect(() => {
        axios.get(`/parts/1`).then((res) => {
            setAccessories(res.data);
            setFilteredAccessories(res.data);
            let list = res.data ?? [];
            let a = list.find((item) => item.id === detail.part.id);
            setSelections([
                {
                    id: a.id,
                    name: a.name,
                    price: a.price,
                    quantity: 1,
                    categoryId: a.categoryId,
                },
            ]);
        });
    }, []);

    return (
        <View style={styles.container}>
            <View>
                <Text>{detail.provider.name}</Text>
            </View>
            <View>
                <Text>{detail.provider.distance} km</Text>
            </View>
            <View>
                <Text>{detail.provider.address}</Text>
            </View>
            <View>
                <SearchBar
                    value={searchText}
                    placeholder="Search Here..."
                    lightTheme
                    round
                    onChangeText={(text) => searchHandler(text)}
                    autoCorrect={false}
                    blurOnSubmit={false}
                    clearButtonMode="always"
                />
            </View>
            <FlatList
                data={filteredAccessories}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderAccessoryList}
                showsVerticalScrollIndicator={false}
            />

            <View>
                <Button
                    title="Next"
                    onPress={() => {
                        navigation.navigate('AccessoryServices', {
                            selections: selections,
                            detail: detail,
                        });
                    }}
                />
            </View>
        </View>
    );
};

export default ProviderAccessoriesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderWidth: 1,
        // marginBottom: 10,
        // flexDirection: '',
        // flexWrap: 'nowrap',
    },
});
