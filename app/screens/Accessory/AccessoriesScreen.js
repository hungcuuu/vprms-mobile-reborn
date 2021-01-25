import React, { useState, useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Location from 'expo-location';
import _ from 'lodash';
import { AirbnbRating } from 'react-native-elements';
import { useSelector } from 'react-redux';
import axios from '../../axios';
import { formatMoney } from '../../utils';
import { Picker } from '@react-native-community/picker';

const AccessoriesScreen = ({ navigation, route }) => {
    const vehicles = useSelector(state => state.vehicles.currentVehicle ?? []);

    const accessoryType = route.params.typeId ?? '';
    const detect = route.params.detect;

    const [garageList, setGarageList] = useState([]);
    const [sortBy, setSortBy] = useState('price');

    const getAllAccessories = async (types, modelId, sortBy) => {
        const location = await Location.getCurrentPositionAsync({});
        axios
            .post('providers/part-categories', {
                categoryIds: [types],
                currentPos: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                },
                modelId: modelId ?? '',
                // sortBy: 'price',
            })
            .then(rs => {
                setGarageList(rs.data);
            });
    };

    const renderParts = (part, provider) => {
        return (
            <View style={{}}>
                <View style={styles.separator} />

                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('AccessoryDetail', {
                            part: part,
                            provider: provider,
                        })
                    }
                    style={{
                        flexDirection: 'row',
                        // paddingHorizontal: 8,
                        justifyContent: 'space-between',
                    }}>
                    <View style={{ justifyContent: 'center', width: '60%' }}>
                        <Text>{part.name}</Text>
                        <Text>{formatMoney(part.price)}</Text>
                    </View>
                    <View
                        style={{
                            marginRight: 8,
                            height: 80,
                            width: 80,
                        }}>
                        <Image
                            resizeMethod="resize"
                            resizeMode="contain"
                            source={{
                                uri: part.imageUrls[0],
                            }}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    const renderGarageList = itemData => {
        return (
            <View style={styles.items}>
                <View
                    style={{
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                    }}>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 16,
                            fontWeight: 'bold',
                        }}>
                        {''}
                        {itemData.item.name} {'  '}{' '}
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <AirbnbRating
                            count={1}
                            size={15}
                            reviews={false}
                            showRating={false}
                        />
                        <Text style={{ fontSize: 16 }}>
                            {itemData.item.ratings > -1 ? itemData.item.ratings : 'none'}{' '}
                        </Text>

                        <Text style={{ fontSize: 16 }}>
                            {'  -  '}
                            {(itemData.item.distance / 1000).toFixed(1)} km{' '}
                        </Text>
                    </View>
                </View>
                {/* <View style={styles.separator} /> */}
                <View style={{ marginTop: 0, marginHorizontal: 0 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={itemData.item.suggestedParts}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item: part }) => renderParts(part, itemData.item)}
                        // numColumns={2}
                    />
                </View>
            </View>
        );
    };

    useEffect(() => {
        if (detect) {
            setGarageList(detect);
        } else {
            getAllAccessories(accessoryType, vehicles.model.id, 'price');
        }
    }, [detect, accessoryType, vehicles.model.id]);

    return (
        <View style={styles.container}>
            <View
                style={{
                    borderWidth: 1,
                    marginHorizontal: 8,
                    borderRadius: 8,
                }}>
                <Picker
                    mode="dropdown"
                    selectedValue={sortBy[0]}
                    accessibilityLabel="Sort By"
                    onValueChange={(itemValue, itemIndex) => {
                        if (itemValue === 'ratings') {
                            setSortBy([itemValue, 'desc']);
                        } else {
                            setSortBy([itemValue, 'asc']);
                        }
                    }}>
                    <Picker.Item label={'Best Price'} value={'price'} />
                    <Picker.Item label={'Rating'} value={'ratings'} />
                    <Picker.Item label={'Distance'} value={'distance'} />
                </Picker>
            </View>

            <View style={styles.itemsContainer}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={_.orderBy(garageList, sortBy[0], sortBy[1])}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderGarageList}
                />
            </View>
        </View>
    );
};

export default AccessoriesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    itemsContainer: {
        flex: 1,
        marginHorizontal: 8,
    },
    items: {
        borderBottomWidth: 1,
        borderTopWidth: 1,
        flex: 1,
        marginVertical: 8,
        width: '100%',
        padding: 8,
        backgroundColor: '#ccc',
    },
    separator: {
        marginVertical: 8,
        height: 1,
        width: '100%',
        backgroundColor: 'black',
    },
});
