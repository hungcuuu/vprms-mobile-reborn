import React, { useState, useEffect } from 'react';
import {
    Button,
    Dimensions,
    FlatList,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Rating } from 'react-native-elements';
import { useSelector } from 'react-redux';
import axios from '../../axios';
import { formatMoney } from '../../utils';
// import { ACCESSORIES } from '../../data/accessories';

const AccessoriesScreen = ({ navigation, route }) => {
    const vehicles = useSelector((state) => state.vehicles.currentVehicle ?? []);

    const accessoryType = route.params;
    const [garageList, setGarageList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    // const [provider, setProvider] = useState({});
    const closeModal = () => {
        setModalVisible(false);
    };
    const openModal = () => {
        setModalVisible(true);
    };

    const getAllAccessories = () => {
        return axios.post('providers/part-categories', {
            categoryIds: [accessoryType],
            currentPos: {
                latitude: 0,
                longitude: 0,
            },
            modelId: vehicles.model.id,
        });
    };
    const renderParts = (part, provider) => {
        return (
            <View style={{}}>
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
                            borderWidth: 1,
                            // flex: 1,
                            marginRight: 8,
                            // alignSelf: 'flex-end',
                            // alignContent: 'flex-end',
                            height: 100,
                            width: '40%',
                        }}>
                        <Image
                            resizeMethod="resize"
                            resizeMode="cover"
                            source={{
                                uri: part.imageUrls[0],
                                height: '100%',
                                width: '100%',
                            }}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </View>
                </TouchableOpacity>

                <View style={styles.separator}></View>
            </View>
        );
    };
    const renderServices = (service, provider) => {
        // console.log(data);
        // console.log(service);
        return (
            <View style={{}}>
                {/* <View>
                <Text>{itemData.item.serviceName}</Text>
            </View> */}
                <View>
                    <FlatList
                        // scrollEnabled={false}
                        showsVerticalScrollIndicator={false}
                        data={service.parts}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item: part }) => renderParts(part, provider)}
                        // numColumns={2}
                    />
                </View>
            </View>
        );
    };
    const renderGarageList = (itemData) => {
        return (
            <View style={styles.items}>
                <View>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 16,
                            // maxWidth: 100,
                        }}>
                        {''}
                        {itemData.item.name}{' '}
                        <Rating
                            // ratingBackgroundColor={'red'}
                            // showRating
                            // tintColor="blue"
                            // ratingBackgroundColor="red"
                            ratingCount={1}
                            // fractions={5}
                            startingValue={5}
                            imageSize={15}
                        />{' '}
                        {5} {'  '} {(itemData.item.distance / 1000).toFixed(1)} km
                    </Text>
                </View>
                <View style={styles.separator}></View>
                <View style={{ marginTop: 20, marginHorizontal: 10 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={itemData.item.priceDetails}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item: service }) =>
                            renderServices(service, itemData.item)
                        }
                        // numColumns={2}
                    />
                </View>
            </View>
        );
    };

    useEffect(() => {
        getAllAccessories().then((rs) => {
            setGarageList(rs.data);
        });
    }, []);
    return (
        <View style={styles.container}>
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
        paddingHorizontal: 16,
        borderWidth: 1,

        // flexDirection: '',
        // flexWrap: 'nowrap',
    },
    items: {
        borderWidth: 1,
        flex: 1,
        // width: Dimensions.get('screen').width * 0.4,
        // height: 500,
        // margin: 10,
        marginVertical: 10,
        width: '100%',
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
