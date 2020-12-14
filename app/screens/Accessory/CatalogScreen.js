import React, { useState, useEffect } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

import axios from '../../axios';
import { CATALOG } from '../../data/catalog';
const CatalogScreen = ({ navigation }) => {
    const [Catalog, setCatalog] = useState([]);
    // let Catalog = [];
    const getCatalog = () => {
        return axios.get('service-type-details', {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        });
    };

    const renderAccessoryTypeList = (itemData) => (
        <View style={styles.items}>
            {/* <Text>{Object.keys(itemData.item)}</Text> */}

            <TouchableOpacity
                onPress={() => navigation.navigate('AccessoryType', itemData.item.value)}
                style={{
                    // justifyContent: 'center',
                    // alignContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    // borderWidth: 1,
                }}>
                <View
                    style={{
                        // flex: 1,
                        borderRadius: 50,
                        borderWidth: 1,

                        height: 80,
                        width: 80,
                    }}>
                    <Image
                        resizeMethod="resize"
                        resizeMode="contain"
                        source={{
                            uri: 'https://i.vimeocdn.com/portrait/58832_300x300.jpg',
                            height: '100%',
                            width: '100%',
                        }}
                        style={{
                            borderRadius: 50,
                            width: '100%',
                            height: '100%',
                            borderColor: 'red',
                        }}
                    />
                </View>
                <View>
                    <Text style={{ textAlign: 'center', fontSize: 14 }}>
                        {' '}
                        {itemData.item.name}{' '}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );

    useEffect(() => {
        // const abortController = new AbortController();
        // const signal = abortController.signal;
        getCatalog().then((rs) => {
            if (rs.status === 200) {
                setCatalog(
                    Object.keys(rs.data).map((key) => {
                        return { name: key, value: rs.data[key] };
                    }),
                );
            }
        });
        console.log('Effect');
        // return function cleanup() {
        //     abortController.abort();
        // };
    }, []);
    return (
        <View style={styles.container}>
            <View style={{ width: '100%', height: 150 }}>
                <Image
                    resizeMethod="resize"
                    resizeMode="cover"
                    source={{
                        uri: 'https://i.ytimg.com/vi/PPHMI63FHm0/maxresdefault.jpg',
                        height: '100%',
                        width: '100%',
                    }}
                    // style={{ width: '100%', height: '100%' }}
                />
            </View>
            <View style={styles.itemsContainer}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={Catalog}
                    keyExtractor={(item, index) => index}
                    renderItem={renderAccessoryTypeList}
                    numColumns={3}
                />
            </View>
        </View>
    );
};

export default CatalogScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        // paddingVertical: 8,
        // paddingHorizontal: 8,
        borderWidth: 1,
        // flexDirection: 'row',
        // flexWrap: 'nowrap',
    },
    items: {
        flex: 1,
        // borderWidth: 1,
        // borderColor: 'red',
        // alignItems: 'stretch',
        // width: '40%',
        // height: '100%',
        margin: 8,
        // height: 100,
        // margin: 10,
        // alignItems: 'center',
        alignContent: 'center',
        // justifyContent: 'center',
    },
    itemsContainer: {
        // marginTop: 20,
        flexDirection: 'row',
        flex: 1,
        // padding: 16,
        // borderWidth: 1,
    },
});
