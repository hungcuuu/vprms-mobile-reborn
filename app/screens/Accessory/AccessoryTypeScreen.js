import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    ScrollView,
} from 'react-native';
import axios from '../../axios';

import { ACCESSORIES } from '../../data/accessories';

const AccessoryTypeScreen = ({ navigation, route }) => {
    const sectionId = route.params ?? 0;
    const [categories, setCategories] = useState([]);

    const renderAccessoriesList = (itemData) => (
        <TouchableOpacity onPress={() => openModal()} style={styles.accessoryItems}>
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
    const renderAccessoryTypeList = (itemData) => (
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
                        uri: itemData.item.imageUrl,
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
        axios.get('service-type-details/categories/sections/' + sectionId).then((rs) => {
            setCategories(rs.data);
        });
    }, []);
    return (
        <ScrollView contentContainerStyle={styles.container} nestedScrollEnabled>
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
            <View style={{ flex: 1 }}>
                <View style={styles.accessoriesContainer}>
                    <FlatList
                        // nestedScrollEnabled
                        scrollEnabled={false}
                        showsVerticalScrollIndicator={false}
                        data={ACCESSORIES}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderAccessoriesList}
                        numColumns={2}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

export default AccessoryTypeScreen;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: Dimensions.get('screen').width,
        // paddingVertical: 8,
        // paddingHorizontal: 8,
        borderWidth: 1,
        // flexDirection: 'row',
        // flexWrap: 'nowrap',
    },
    items: {
        // borderWidth: 1,
        // borderColor: 'red',
        // alignItems: 'stretch',
        // width: '40%',
        // height: '100%',
        // margin: 8,
        height: 100,
        width: 100,
        // margin: 10,
        alignItems: 'center',
        alignContent: 'center',
        // justifyContent: 'center',
    },
    itemsContainer: {
        marginTop: 20,
        flexDirection: 'row',
        // flex: 1,
        // height: '20%',
        // padding: 16,
        // borderWidth: 1,
    },
    accessoriesContainer: {
        marginTop: 20,
        flexDirection: 'row',
        // flex: 1,
        // height: 200,
        // padding: 16,
        // borderWidth: 2,
    },
    accessoryItems: {
        flex: 1,
        // borderWidth: 1,
        // borderColor: 'red',
        // alignItems: 'stretch',
        // width: '40%',
        // height: '100%',
        // margin: 8,
        height: 200,
        width: '30%',
        // paddingHorizontal: 8,
        // marginHorizontal: 8,
        // margin: 10,
        // paddingVertical: 8,
        alignItems: 'center',
        // alignContent: 'center',
        // justifyContent: 'center',
    },
});
