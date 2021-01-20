import React, { useState, useEffect, useCallback } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    Alert,
} from 'react-native';
import * as Location from 'expo-location';
import { Button, CheckBox } from 'react-native-elements';
import { Picker } from '@react-native-community/picker';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import messaging from '@react-native-firebase/messaging';

import axios from '../../axios';
import { ActivityIndicator } from 'react-native';

const CatalogScreen = ({ navigation }) => {
    const vehicles = useSelector(state => state.vehicles.vehicles ?? []);
    const user = useSelector(state => state.auth.user ?? []);

    const dispatch = useDispatch();
    // console.log(useSelector((state) => state.vehicles.currentVehicle));
    const [isVisible, setIsVisible] = useState(false);
    // const [currentVehicle, setCurrentVehicle] = useState();
    const currentVehicle = useSelector(state => state.vehicles.currentVehicle ?? {});
    const [, setCapturedPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    // useSelector((state) => state.vehicles?.vehicles[0]),
    const [currentManu, setCurrentManu] = useState(1);
    const [manufactureList, setManufactureList] = useState();
    const [vehicleTypeList, setVehicleTypeList] = useState([]);
    const [currentType, setCurrentType] = useState(2);
    const [Catalog, setCatalog] = useState([]);
    // let Catalog = [];
    const getCatalog = () => {
        return axios.get('service-type-details/sections', {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        });
    };
    const getManufactures = async () => {
        await axios
            .get('manufacturers/', {
                headers: {
                    'Content-Type': 'application/json ; charset=UTF-8',
                    Accept: 'application/json',
                },
            })
            .then(rs => setManufactureList(rs.data))
            .catch(err => Alert.alert(err));
    };
    const getVehicleTypeList = id => {
        return axios
            .get('models/manufacturers/' + id, {
                headers: {
                    'Content-Type': 'application/json ; charset=UTF-8',
                    Accept: 'application/json',
                },
            })
            .then(rs => {
                setVehicleTypeList(rs.data);
            })
            .catch(er => Alert.alert(er));
    };
    const changeVehicle = vehicle => {
        // console.log(vehicle);
        dispatch(actions.updateCurrentVehicle(vehicle, () => null));
        // console.log('1');
    };
    const wait = timeout => {
        return new Promise(resolve => {
            setTimeout(() => setLoading(false), timeout);
        });
    };
    const pickImage = useCallback(async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            // setErrorMsg('Permission to access location was denied');
        }
        let location = await Location.getCurrentPositionAsync({});

        Alert.alert('', 'Choose options', [
            {
                text: 'Camera',
                onPress: () => {
                    try {
                        const result = ImagePicker.launchCameraAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            quality: 1,
                        });

                        if (!result.cancelled) {
                            setLoading(true);
                            let localUri = result.uri;
                            let filename = localUri.split('/').pop();

                            // Infer the type of the image
                            let match = /\.(\w+)$/.exec(filename);
                            let type = match ? `image/${match[1]}` : 'image';
                            const data = new FormData();
                            data.append('file', { uri: localUri, name: filename, type });
                            data.append('latitude', location.coords.latitude);
                            data.append('longitude', location.coords.longitude);

                            axios
                                .post(
                                    `detections/models/${currentVehicle.model.id}/parts/`,
                                    data,
                                    {
                                        headers: {
                                            'Content-Type': 'multipart/form-data',
                                            // Accept: 'application/json',
                                        },
                                    },
                                )
                                .then(rs => {
                                    setLoading(false);
                                    // console.log(rs.data);
                                    navigation.navigate('Accessories', {
                                        detect: rs.data,
                                    });
                                });
                        }
                    } catch (e) {
                        Alert.alert('Error', 'Something wrong with Camera');
                    }
                },
            },
            {
                text: 'Gallery',
                onPress: () => {
                    try {
                        const result = ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            quality: 1,
                        });

                        if (!result.cancelled) {
                            setLoading(true);
                            let localUri = result.uri;
                            let filename = localUri.split('/').pop();

                            // Infer the type of the image
                            let match = /\.(\w+)$/.exec(filename);
                            let type = match ? `image/${match[1]}` : 'image';
                            const data = new FormData();
                            data.append('file', { uri: localUri, name: filename, type });
                            data.append('latitude', location.coords.latitude);
                            data.append('longitude', location.coords.longitude);

                            axios
                                .post(
                                    `detections/models/${currentVehicle.model.id}/parts/`,
                                    data,
                                    {
                                        headers: {
                                            'Content-Type': 'multipart/form-data',
                                            // Accept: 'application/json',
                                        },
                                    },
                                )
                                .then(rs => {
                                    setLoading(false);
                                    // console.log(rs.data);
                                    navigation.navigate('Accessories', {
                                        detect: rs.data,
                                    });
                                });
                            //     .catch(err => Alert.alert(err));
                        }
                    } catch (e) {
                        Alert.alert('Error', 'Something wrong with Camera');
                    }
                },
            },
        ]);
        // console.log(currentVehicle);
    }, [currentVehicle, navigation]);
    const renderOtherPicker = () => (
        <View style={{ width: '100%' }}>
            <View>
                <Picker
                    mode="dropdown"
                    selectedValue={currentManu}
                    style={{ height: 50 }}
                    onValueChange={itemValue => {
                        setCurrentManu(itemValue);
                        getVehicleTypeList(itemValue);
                    }}>
                    {manufactureList
                        ? manufactureList.map(m => (
                              <Picker.Item key={m.id} label={m.name} value={m.id} />
                          ))
                        : null}
                </Picker>
            </View>
            <View>
                {vehicleTypeList !== undefined ? (
                    <View>
                        <Picker
                            mode="dropdown"
                            selectedValue={+currentType}
                            style={{ height: 50 }}
                            onValueChange={itemValue => {
                                changeVehicle({
                                    ...currentVehicle,
                                    model: {
                                        id: itemValue?.toString(),
                                        name: vehicleTypeList.find(
                                            vehicle => vehicle.id === itemValue,
                                        ).name,
                                        year: vehicleTypeList.find(
                                            vehicle => vehicle.id === itemValue,
                                        ).year,
                                    },
                                    id: 'other',
                                });
                                setCurrentType(itemValue);
                            }}>
                            {vehicleTypeList.map(t => (
                                <Picker.Item
                                    key={t.id}
                                    label={t.name + ' ' + t.year}
                                    value={t.id}
                                />
                            ))}
                        </Picker>
                    </View>
                ) : (
                    <Text> </Text>
                )}
            </View>
        </View>
    );
    const modalPickVehicle = () => {
        return (
            <Modal
                visible={isVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsVisible(false)}>
                <View
                    style={{
                        flex: 1,
                        // flexDirection: 'column',
                        // justifyContent: 'center',
                        // alignItems: 'center',
                        alignSelf: 'center',

                        backgroundColor: '#f2f2f2',
                        height: '90%',
                        width: '90%',
                        borderRadius: 15,
                        borderWidth: 1,
                        borderColor: '#000000',
                        // marginTop: 40,
                        marginVertical: 20,
                    }}>
                    <Text>Choose vehicle to continue</Text>
                    <FlatList
                        data={vehicles}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderVehicleList}
                        ListFooterComponent={
                            <>
                                <Button
                                    title="Create New Vehicle"
                                    onPress={() => {
                                        setIsVisible(false);
                                        navigation.navigate('CreateVehicle');
                                    }}
                                />
                            </>
                        }
                    />
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            paddingHorizontal: 50,
                            paddingBottom: 50,
                        }}>
                        <Button
                            title="cancel"
                            onPress={() => {
                                setIsVisible(false);
                            }}
                        />
                        <Button
                            buttonStyle={{ width: 100 }}
                            title="done"
                            onPress={() => {
                                setIsVisible(false);
                                pickImage();
                            }}
                        />
                    </View>
                </View>
                {/* <View style={{ justifyContent: 'center', margin: 20 }}>
                    <CheckBox
                        key={'other'}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checkedColor="red"
                        title="Other"
                        checked={currentVehicle?.id === 'other'}
                        onPress={() => {
                            changeVehicle({ ...currentVehicle, id: 'other' });
                            // console.log(currentVehicle);
                        }}
                    />
                    {renderOtherPicker()}
                </View> */}
            </Modal>
        );
    };
    const renderVehicleList = itemData => (
        <CheckBox
            key={'' + itemData.item.id}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checkedColor="red"
            title={
                <View>
                    <Text>Type: {itemData.item.model.name}</Text>
                    <Text>plateNumber: {itemData.item.plateNumber}</Text>
                </View>
            }
            checked={currentVehicle?.id === itemData.item.id}
            onPress={() => {
                changeVehicle(itemData.item);
            }}
        />
    );

    const renderAccessoryTypeList = itemData => (
        <View style={styles.items}>
            {/* <Text>{Object.keys(itemData.item)}</Text> */}

            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('PickingVehicle', {
                        sectionId: itemData.item.sectionId,
                        path: 'catalog',
                    })
                }
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
                        resizeMethod="auto"
                        resizeMode="contain"
                        source={{
                            uri:
                                itemData.item.sectionImageUrl ??
                                'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/240px-No_image_available.svg.png',
                            height: '100%',
                            width: '100%',
                        }}
                        style={{
                            borderRadius: 50,
                            borderColor: 'red',
                        }}
                    />
                </View>
                <View>
                    <Text style={{ textAlign: 'center', fontSize: 14 }}>
                        {' '}
                        {itemData.item.sectionName}{' '}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );

    useEffect(() => {
        let { status } = Location.requestPermissionsAsync();
        if (status !== 'granted') {
            // setErrorMsg('Permission to access location was denied');
        }
        navigation.setOptions({
            headerRight: () => (
                <Ionicons
                    name="camera"
                    color="white"
                    size={50}
                    onPress={() => setIsVisible(true)}
                />
            ),
        });
        // LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [navigation]);
    useEffect(() => {
        getManufactures();
        getCatalog().then(rs => {
            setCatalog(rs.data);
        });
    }, []);
    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            Alert.alert(
                JSON.stringify(remoteMessage.notification.title),
                remoteMessage.notification.body,
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: () => {
                            let id = remoteMessage.notification.android.clickAction
                                .split('_')
                                .pop();
                            axios
                                .get(`requests/users/${user.id}`)
                                .then(rs => rs.data)
                                .then(
                                    rs => {
                                        navigation.navigate('BookingDetail', {
                                            detail: rs.find(x => x.id === +id),
                                        });
                                    },
                                    // console.log(rs.find(x => x.id === 6).services),
                                );
                            // navigation.navigate('BookingDetail');sadsadasd
                        },
                    },
                ],
            );
        });

        return unsubscribe;
    }, [navigation, user.id]);
    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={
                    <>
                        <View
                            style={{
                                width: '100%',
                                height: 150,
                            }}>
                            <Image
                                resizeMethod="resize"
                                resizeMode="cover"
                                source={{
                                    uri:
                                        'https://i.pinimg.com/736x/1c/33/12/1c33121f0041bf40ad6e69d74ea2fcaf.jpg',
                                    height: '100%',
                                    width: '100%',
                                }}
                                // style={{ width: '100%', height: '100%' }}
                            />
                        </View>
                        <ActivityIndicator
                            size="large"
                            color="#0000ff"
                            animating={loading}
                            onTouchCancel={() => setLoading(false)}
                            style={{
                                zIndex: 1000,
                                justifyContent: 'center',
                                // flex: 1,
                                height: 0,
                            }}
                            hidesWhenStopped
                        />
                    </>
                }
                data={Catalog.filter(cat => cat.typeName === 'Thay thế và lắp ráp')}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderAccessoryTypeList}
                numColumns={3}
            />

            <View>{modalPickVehicle()}</View>
        </View>
    );
};

export default CatalogScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    items: {
        flex: 1,

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
