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
import axios from '../../axios';

import { ACCESSORIES } from '../../data/accessories';

const AccessoryTypeScreen = ({ navigation, route }) => {
    const sectionId = route.params ?? 0;
    const [categories, setCategories] = useState([]);

    const renderAccessoriesList = itemData => (
        <TouchableOpacity onPress={() => {}} style={styles.accessoryItems}>
            <View
                style={{
                    borderWidth: 1,
                    height: '70%',
                    width: '80%',
                }}>
                <Image
                    resizeMethod="resize"
                    resizeMode="cover"
                    source={{
                        uri: 'https://i.vimeocdn.com/portrait/58832_300x300.jpg',
                        height: '100%',
                        width: '100%',
                    }}
                    style={{ width: '100%', height: '100%' }}
                />
            </View>
            <View style={{}}>
                <Text
                    style={{
                        textAlign: 'left',
                        fontSize: 16,
                        // maxWidth: 100,
                    }}>
                    {' '}
                    {itemData.item.NAME}{' '}
                </Text>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 16,
                        // maxWidth: 100,
                    }}>
                    {' '}
                    Price : 100{' '}
                </Text>
            </View>
        </TouchableOpacity>
    );
    const renderAccessoryTypeList = itemData => (
        <TouchableOpacity
            onPress={() => navigation.navigate('Accessories', itemData.item.id)}
            style={styles.items}>
            <View
                style={{
                    borderWidth: 1,
                    // flex: 1,
                    height: 80,
                    width: 80,
                    // alignContent: 'center',
                }}>
                <Image
                    resizeMethod="resize"
                    resizeMode="contain"
                    source={{
                        uri:
                            itemData.item.imageUrl ??
                            'https://i.vimeocdn.com/portrait/58832_300x300.jpg',
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
                    {itemData.item.name}{' '}
                </Text>
            </View>
        </TouchableOpacity>
    );

    useEffect(() => {
        axios.get('service-type-details/categories/sections/' + sectionId).then(rs => {
            setCategories(rs.data);
        });
    }, [sectionId]);
    return (
        <View contentContainerStyle={styles.container}>
            <FlatList
                ListHeaderComponent={
                    <>
                        <View
                            style={{
                                width: '100%',
                                height: Dimensions.get('screen').height * 0.25,
                                minHeight: 100,
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
                        <View style={styles.itemsContainer}>
                            <FlatList
                                nestedScrollEnabled
                                data={categories}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderAccessoryTypeList}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    </>
                }
                // nestedScrollEnabled
                // scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                data={ACCESSORIES}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderAccessoriesList}
                numColumns={2}
            />
        </View>
    );
};

export default AccessoryTypeScreen;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: Dimensions.get('screen').width,
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

        height: 200,
        width: '30%',

        alignItems: 'center',
    },
});
