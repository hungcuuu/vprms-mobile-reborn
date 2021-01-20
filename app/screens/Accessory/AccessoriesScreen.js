import React, { useState, useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Location from 'expo-location';
import { AirbnbRating } from 'react-native-elements';
import { useSelector } from 'react-redux';
import axios from '../../axios';
import { formatMoney } from '../../utils';
import { Picker } from '@react-native-community/picker';

const AccessoriesScreen = ({ navigation, route }) => {
    console.log('Render ');
    const vehicles = useSelector(state => state.vehicles.currentVehicle ?? []);

    const accessoryType = route.params.typeId ?? '';
    const detect = route.params.detect;

    const [garageList, setGarageList] = useState([]);
    const [sortBy, setSortBy] = useState('price');
    const getAllAccessories = async (types, modelId, sortBy) => {
        console.log('type', types);
        const location = await Location.getCurrentPositionAsync({});
        axios
            .post('providers/part-categories', {
                categoryIds: [types],
                currentPos: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                },
                modelId: modelId ?? '',
                sortBy: sortBy,
            })
            .then(rs => {
                console.log(rs.data);
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
                            // borderWidth: 1,
                            // flex: 1,
                            marginRight: 8,
                            // alignSelf: 'flex-end',
                            // alignContent: 'flex-end',
                            height: 80,
                            width: 80,
                            // borderRadius: 16,
                            // borderWidth: 1,
                        }}>
                        <Image
                            resizeMethod="resize"
                            resizeMode="contain"
                            source={{
                                uri: part.imageUrls[0],
                                // height: '100%',
                                // width: '100%',
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
                            // maxWidth: 100,
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
            <Picker
                mode="dropdown"
                selectedValue={sortBy}
                style={
                    {
                        // height: 50,
                        // width: '30%',
                    }
                }
                accessibilityLabel="Sort By"
                onValueChange={itemValue => {
                    getAllAccessories(accessoryType, vehicles.model.id, itemValue);
                    setSortBy(itemValue);
                }}>
                <Picker.Item label={'Best Price'} value={'price'} />

                <Picker.Item label={'Rating'} value={'rating'} />
                <Picker.Item label={'Distance'} value={'distance'} />
            </Picker>
            <View style={styles.itemsContainer}>
                <FlatList
                    nestedScrollEnabled
                    showsVerticalScrollIndicator={false}
                    data={garageList}
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
        paddingVertical: 8,
        // paddingHorizontal: 16,
        borderWidth: 1,

        // flexDirection: '',
        // flexWrap: 'nowrap',
    },
    items: {
        // borderWidth: 1,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        flex: 1,
        // width: Dimensions.get('screen').width * 0.4,
        // height: 500,
        // margin: 10,
        marginVertical: 10,
        width: '100%',
        padding: 16,
        // alignItems: 'center',
    },
    itemsContainer: {
        // flex: 1,

        // marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        alignContent: 'center',
        alignItems: 'center',
        // borderWidth: 2,
        borderColor: 'red',
    },

    separator: {
        marginVertical: 10,
        marginBottom: 5,
        height: 1,
        width: '100%',
        backgroundColor: 'black',
    },
});
