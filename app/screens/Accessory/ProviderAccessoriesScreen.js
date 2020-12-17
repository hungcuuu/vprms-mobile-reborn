import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, CheckBox, SearchBar } from 'react-native-elements';

import axios from '../../axios';
import { ACCESSORIES } from '../../data/accessories';

import { normalizeString } from '../../utils';
const ProviderAccessoriesScreen = ({ navigation, route }) => {
    const detail = route.params;

    const [selections, setSelections] = useState([]);
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
            <View>
                <Text>{itemData.item.name}</Text>
                <Button title="-" onPress={() => onRemovePart(itemData.item.id)} />
                <Text>{quantity}</Text>
                <Button
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
        );
    };

    useEffect(() => {
        axios.get(`/parts/1`).then((res) => {
            setAccessories(res.data);
            setFilteredAccessories(res.data);
        });
    }, []);

    // console.log(accessories);

    return (
        <View style={styles.container}>
            <View>
                <Text>Provider A</Text>
            </View>
            <View>
                <Text>0.6km</Text>
            </View>
            <View>
                <Text>A33/33 Nguyen Thi Thap</Text>
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
            />

            <View>
                <Button
                    title="Next"
                    onPress={() =>
                        navigation.navigate('AccessoryServices', {
                            selections: selections,
                            detail: detail,
                        })
                    }
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
