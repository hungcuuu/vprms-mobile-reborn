import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import axios from '../../axios';
import * as Location from 'expo-location';
import { Card } from 'react-native-elements';
import { formatMoney, moneyFormat } from '../../utils';
import { Alert } from 'react-native';

const AccessoryTypeScreen = ({ navigation, route }) => {
    const currentVehicle = useSelector(state => state.vehicles.currentVehicle ?? {});

    const sectionId = route.params ?? 0;
    const [categories, setCategories] = useState([]);
    const [partList, setPartList] = useState([]);
    const renderAccessoriesList = part => (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate('AccessoryDetail', {
                    part: part.part,
                    provider: part,
                })
            }
            style={styles.accessoryItems}>
            <View
                style={{
                    height: '70%',
                    width: '100%',
                }}>
                <Image
                    resizeMethod="resize"
                    resizeMode="contain"
                    source={{
                        uri:
                            part.part.imageUrls[0] ??
                            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/240px-No_image_available.svg.png',
                        height: '100%',
                        width: '100%',
                    }}
                    style={{ width: '100%', height: '100%' }}
                />
            </View>
            <View style={{ alignContent: 'center' }}>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 14,
                        maxWidth: '100%',
                    }}>
                    {' '}
                    {part.part.name}{' '}
                </Text>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 14,
                        // maxWidth: 100,
                    }}>
                    {' '}
                    Price : {formatMoney(part.part.price)}
                </Text>
            </View>
        </TouchableOpacity>
    );
    const renderAccessoryTypeList = type => (
        <TouchableOpacity
            onPress={() => navigation.navigate('Accessories', { typeId: type.id })}
            style={styles.items}>
            <View
                style={{
                    borderWidth: 1,
                    // flex: 1,
                    height: 80,
                    width: 80,
                    borderRadius: 40,
                    // alignContent: 'center',
                }}>
                <Image
                    resizeMethod="resize"
                    resizeMode="contain"
                    source={{
                        uri:
                            type.imageUrl ??
                            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/240px-No_image_available.svg.png',
                        height: '100%',
                        width: '100%',
                    }}
                    style={{ width: '100%', height: '100%' }}
                />
            </View>
            <View>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 14,
                        maxWidth: 100,
                    }}>
                    {' '}
                    {type.name}{' '}
                </Text>
            </View>
        </TouchableOpacity>
    );

    useEffect(() => {
        (async () => {
            let location = await Location.getCurrentPositionAsync({});

            axios
                .get(`service-type-details/categories/sections/${sectionId}`)
                .then(rs => {
                    setCategories(rs.data);
                })
                .catch(error => {
                    if (error.response) {
                        Alert.alert('Something went wrong!', error.response.data.message);
                    }
                });
            axios
                .post(`parts/sections/${sectionId}/models/${currentVehicle.model.id}`, {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                })
                .then(rs => {
                    setPartList(rs.data);
                })
                .catch(error => {
                    if (error.response) {
                        Alert.alert('Something went wrong!', error.response.data.message);
                    }
                });
        })();
        // console.log('vehicle', currentVehicle);
    }, [currentVehicle.model.id, sectionId]);
    return (
        <FlatList
            ListHeaderComponent={
                <>
                    <View
                        style={{
                            width: '100%',
                            height: Dimensions.get('screen').height * 0.25,
                            minHeight: 100,
                            flex: 1,
                        }}>
                        <Image
                            source={{
                                uri:
                                    'https://www.motorbeam.com/wp-content/uploads/Nissan-Mocks-Honda-In-Sunny-Ad.jpg',
                                height: '100%',
                                width: '100%',
                            }}
                            // style={{ width: '100%', height: '100%' }}
                        />
                    </View>
                    {/* <View style={styles.itemsContainer}> */}
                    <FlatList
                        nestedScrollEnabled
                        data={categories}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item: type }) => renderAccessoryTypeList(type)}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ marginVertical: 8, flex: 1 }}
                    />
                    <View style={styles.separator} />

                    {/* </View> */}
                </>
            }
            // nestedScrollEnabled
            // scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            data={partList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item: part }) => renderAccessoriesList(part)}
            numColumns={2}
            style={{ flex: 1 }}
            // contentContainerStyle={{ flex: 1 }}
            // ListHeaderComponentStyle={{ flex: 1 }}
        />
    );
};

export default AccessoryTypeScreen;

const styles = StyleSheet.create({
    container: {
        // width: '100%',
        // minHeight: Dimensions.get('screen').width,
        flex: 1,
        borderWidth: 1,
    },
    items: {
        // height: 200,
        width: 100,
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
    },
    itemsContainer: {
        marginVertical: 20,
        flexDirection: 'row',
    },
    // accessoriesContainer: {
    //     marginTop: 20,
    //     flexDirection: 'row',
    // },
    accessoryItems: {
        flex: 1,
        borderWidth: 1,
        margin: 8,
        height: 200,
        // width: '30%',
        // justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        borderRadius: 8,
    },
    separator: {
        marginVertical: 10,
        marginBottom: 5,
        height: 1,
        width: '90%',
        backgroundColor: 'black',
        // justifyContent: 'center',
        alignSelf: 'center',
    },
});
