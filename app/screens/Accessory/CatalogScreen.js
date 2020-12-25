import React, { useState, useEffect } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
} from 'react-native';
import { Button, Card, CheckBox } from 'react-native-elements';
import { Picker } from '@react-native-community/picker';
import * as ImagePicker from 'expo-image-picker';

// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions';

import axios from '../../axios';
import { CATALOG } from '../../data/catalog';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native';
import { VirtualizedList } from 'react-native';
import { LogBox } from 'react-native';
const CatalogScreen = ({ navigation }) => {
    const vehicles = useSelector(state => state.vehicles.vehicles ?? []);
    const dispatch = useDispatch();

    // console.log(useSelector((state) => state.vehicles.currentVehicle));
    const [isVisible, setIsVisible] = useState(false);
    // const [currentVehicle, setCurrentVehicle] = useState();
    const currentVehicle = useSelector(state => state.vehicles.currentVehicle ?? {});
    const [capturedPhoto, setCapturedPhoto] = useState(null);

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
        dispatch(actions.updateCurrentVehicle(vehicle));
        // console.log('1');
    };

    const pickImage = async () => {
        return await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            //base64: true,
        })
            .then(result => {
                if (!result.cancelled) {
                    const urlBase64 = result.base64;
                    // console.log(result);
                    const { height, width, type, uri, base64 } = result;
                    // const Imagefilename = uri.substring(uri.lastIndexOf('/') + 1);

                    setCapturedPhoto(uri);
                }
            })
            .catch(error => {
                Alert.alert('Error', 'Something wrong with Camera');
            });
    };
    const renderOtherPicker = () => (
        <View style={{ width: '100%' }}>
            <View>
                <Picker
                    mode="dropdown"
                    selectedValue={currentManu}
                    style={{ height: 50 }}
                    onValueChange={(itemValue, itemIndex) => {
                        setCurrentManu(itemValue), getVehicleTypeList(itemValue);

                        // changeVehicle({
                        //     ...currentVehicle,
                        //     id: 'other',
                        // });
                        // setCurrentType(1);
                    }}>
                    {/* <Picker.Item key={0} label={'None'} value={0} /> */}

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
                            onValueChange={(itemValue, itemIndex) => {
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
                    <Text>cac</Text>
                )}
            </View>
        </View>
    );
    const modalPickVehicle = () => {
        return (
            <Modal visible={isVisible} animationType="fade">
                <View>
                    <FlatList
                        data={vehicles}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderVehicleList}
                    />
                </View>
                <View style={{ justifyContent: 'center', margin: 20 }}>
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
                </View>
                <View>
                    <Button title="done" onPress={() => setIsVisible(false)} />
                </View>
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
                    navigation.navigate('AccessoryType', itemData.item.sectionId)
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
                        resizeMethod="resize"
                        resizeMode="contain"
                        source={{
                            uri: itemData.item.sectionImageUrl,
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
                        {itemData.item.sectionName}{' '}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
    // useEffect(() => {
    //     navigation.setOptions({
    //         headerRight: () => (
    //             <Button
    //                 onPress={() => navigation.navigate('ServiceType')}
    //                 title="Booking"
    //             />
    //         ),
    //     });
    // }, []);

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, []);
    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        getManufactures();
        getCatalog().then(rs => {
            setCatalog(
                // Object.keys(rs.data).map((key) => {
                //     return { name: key, value: rs.data[key] };
                // }),
                rs.data,
            );
        });
        return function cleanup() {
            abortController.abort();
        };
    }, []);
    return (
        <ScrollView style={styles.container} nestedScrollEnabled={true}>
            <View>
                <View>
                    <Button title="Choose Image" onPress={pickImage} />
                    <Image
                        style={{
                            alignSelf: 'center',
                            width: Dimensions.get('window').width,
                            height: 300,
                            zIndex: 1,
                        }}
                        source={{ uri: capturedPhoto }}
                    />
                </View>
                <View>
                    <Button
                        title={
                            currentVehicle
                                ? currentVehicle.model?.name +
                                  ' ' +
                                  currentVehicle.model?.year
                                : 'You dont have car'
                        }
                        onPress={() => setIsVisible(true)}
                    />
                </View>
            </View>
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
                    data={Catalog.filter(cat => cat.typeName === 'Thay thế và lắp ráp')}
                    keyExtractor={(item, index) => index}
                    renderItem={renderAccessoryTypeList}
                    numColumns={3}
                    scrollEnabled={false}
                    nestedScrollEnabled={true}
                />
            </View>
            <View>{modalPickVehicle()}</View>
        </ScrollView>
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
