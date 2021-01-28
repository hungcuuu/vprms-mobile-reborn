import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, Modal, Alert, Image, StyleSheet } from 'react-native';
import { CheckBox, Button } from 'react-native-elements';

import { useSelector } from 'react-redux';
import axios from '../../axios';
import { formatMoney } from '../../utils';

const ProviderServices = ({ navigation, route }) => {
    const modelId = useSelector(state => state.vehicles.currentVehicle.model.id ?? '');

    const provider = route.params?.provider ?? [];
    const selectedService = route.params?.selectedService ?? [];
    const path = route.params?.path ?? '';
    const [visible, setVisible] = useState(false);
    const [services, setServices] = useState(route.params?.provider.services ?? []);
    const [packages, setPackages] = useState(route.params?.provider.packages ?? []);
    const [partList, setPartList] = useState([]);
    const [modalPackage, setModalPackage] = useState([]);

    const [serviceList, setServiceList] = useState([]);
    const [packageList, setPackageList] = useState([]);
    const [packageVisible, setPackageVisible] = useState(false);

    useEffect(() => {
        navigation.setOptions({ headerTitle: 'Services' });
    }, [navigation]);

    const onSelectServiceChecked = service => {
        setServiceList(curr => {
            if (curr.findIndex(item => item.id === service.id) === -1) {
                return [...curr, service];
            }
            return curr.filter(item => item.id !== service.id);
        });
    };

    const onSelectPackageChecked = service => {
        setPackageList(curr => {
            if (curr.findIndex(item => item.id === service.id) === -1) {
                return [...curr, service];
            }
            return curr.filter(item => item.id !== service.id);
        });
    };

    const renderParts = part => {
        return (
            <View
                style={{
                    flex: 1,
                    // borderWidth: 1,
                    marginHorizontal: 8,
                    marginVertical: 4,
                    flexDirection: 'row',
                    // justifyContent: 'space-between',
                }}>
                <View
                    style={{
                        // borderWidth: 1,
                        minHeight: 70,
                        width: '20%',
                    }}>
                    <Image
                        resizeMethod="resize"
                        resizeMode="contain"
                        source={{
                            uri:
                                part.imageUrls[0] ??
                                'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/240px-No_image_available.svg.png',
                            height: '100%',
                            width: '100%',
                        }}
                        style={{ width: '100%', height: '100%' }}
                    />
                </View>

                <View style={{ width: '80%' }}>
                    <Text>{` ${part.name}   `}</Text>
                    <Text
                        style={{
                            width: '100%',
                            textAlign: 'right',
                        }}>{`x ${part.quantity}`}</Text>
                    <Text>{` ${formatMoney(part.price)}`}</Text>
                </View>
            </View>
        );
    };

    const renderModal = () => {
        return (
            <Modal
                transparent={true}
                visible={visible}
                onRequestClose={() => setVisible(false)}
                animationType="slide"
                ani>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.3)',
                    }}>
                    <View
                        style={{
                            width: '100%',
                            height: '50%',
                            backgroundColor: '#ccc',
                        }}>
                        <FlatList
                            listKey={'modal'}
                            data={partList}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item: detail }) => renderParts(detail)}
                        />

                        <View>
                            <Button
                                buttonStyle={{}}
                                title="Close"
                                onPress={() => setVisible(false)}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };

    const renderDetail = detail => {
        const styles = StyleSheet.create({
            container: {
                width: '100%',
                height: 80,
                borderWidth: 1,
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 4,
                marginVertical: 8,
                padding: 8,
            },
            checkbox: {
                width: '10%',
                height: '100%',
                justifyContent: 'center',
            },
            content: {
                width: '65%',
                marginHorizontal: 8,
                flexDirection: 'column',
                justifyContent: 'space-between',
            },
        });

        const totalPrice =
            detail.price +
            detail.parts.reduce(
                (accumulated, part) => accumulated + part.price * part.quantity,
                0,
            );

        return (
            <View style={styles.container}>
                <View style={styles.checkbox}>
                    <CheckBox
                        center
                        checkedIcon="check-square-o"
                        uncheckedIcon="square-o"
                        checked={serviceList.findIndex(s => s.id === detail.id) > -1}
                        onPress={() => onSelectServiceChecked(detail)}
                    />
                </View>
                <View style={styles.content}>
                    <Text style={{ fontWeight: 'bold' }}>{detail.name}</Text>
                    <Text>{formatMoney(totalPrice)}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Button
                        title="Details"
                        onPress={() => {
                            setPartList(detail.parts);
                            setVisible(true);
                        }}
                    />
                </View>
            </View>
        );
    };

    const renderServices = ser => {
        if (ser.serviceDetails.length) {
            return (
                <View>
                    <Text style={{ color: 'red' }}>
                        {ser.typeDetail.typeName} {ser.typeDetail.sectionName}
                    </Text>
                    {ser.serviceDetails ? null : <Text>None</Text>}
                    <FlatList
                        // contentContainerStyle={{ margin: 100 }}
                        style={{ marginHorizontal: 8 }}
                        data={ser.serviceDetails}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item: detail }) => renderDetail(detail)}
                        // scrollEnabled={false}
                    />
                </View>
            );
        }
    };

    const renderPackageDetail = detail => {
        return (
            <View
                style={{
                    flex: 1,
                    borderWidth: 1,
                    marginHorizontal: 8,
                    marginVertical: 4,
                    // flexDirection: 'row',
                    // justifyContent: 'space-between',
                }}>
                <View style={{ width: '80%' }}>
                    <Text style={{ color: 'red' }}>{` ${detail.name}   `}</Text>
                </View>
                <FlatList
                    listKey={detail.id}
                    data={detail.parts}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item: part }) => renderParts(part)}
                    initialNumToRender={3}
                    scrollEnabled={false}
                />
            </View>
        );
    };

    const renderPackageModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={packageVisible}
                onRequestClose={() => setPackageVisible(false)}>
                <View
                    style={{
                        flex: 1,
                        // flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',

                        backgroundColor: '#f2f2f2',
                        height: '70%',
                        width: '80%',
                        borderRadius: 15,
                        borderWidth: 1,
                        borderColor: '#000000',
                        // marginTop: 40,
                        marginVertical: 20,
                    }}>
                    <View style={{ height: 500 }}>
                        <FlatList
                            listKey={'package'}
                            data={modalPackage}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item: detail }) => renderPackageDetail(detail)}
                            initialNumToRender={3}
                            nestedScrollEnabled={true}
                        />
                    </View>

                    <View>
                        <Button title="Close" onPress={() => setPackageVisible(false)} />
                    </View>
                </View>
            </Modal>
        );
    };

    const renderPackageList = detail => {
        const styles = StyleSheet.create({
            container: {
                width: '100%',
                height: 80,
                borderWidth: 1,
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 4,
                marginVertical: 8,
                paddingHorizontal: 8,
            },
            checkbox: {
                width: '10%',
                height: '100%',
                justifyContent: 'center',
            },
            content: {
                width: '65%',
                marginHorizontal: 8,
                flexDirection: 'column',
                justifyContent: 'space-between',
            },
        });

        const totalPrice = detail.packagedServices.reduce(
            (accumulated, service) =>
                accumulated +
                service.price +
                service.parts.reduce(
                    (accumulated, part) => accumulated + part.price * part.quantity,
                    0,
                ),
            0,
        );

        return (
            <View style={styles.container}>
                <View style={styles.checkbox}>
                    <CheckBox
                        center
                        checkedIcon="check-square-o"
                        uncheckedIcon="square-o"
                        checked={packageList.findIndex(s => s.id === detail.id) > -1}
                        onPress={() => onSelectPackageChecked(detail)}
                    />
                </View>
                <View style={styles.content}>
                    <Text style={{ fontWeight: 'bold' }}>{detail.name}</Text>
                    <Text>{formatMoney(totalPrice)}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Button
                        title="Details"
                        onPress={() => {
                            setModalPackage(detail.packagedServices);
                            setPackageVisible(true);
                        }}
                    />
                </View>
            </View>
        );
    };

    useEffect(() => {
        if (selectedService.length > 0) {
            axios
                .get('services/providers/' + provider.id + '/models/' + modelId)
                .then(rs => setServices(rs.data));

            setServiceList(selectedService);
        }
    }, [provider.id, selectedService, modelId]);

    useEffect(() => {
        if (path === 'provider') {
            let url = `services/providers/${provider.id}/models/${modelId}`;
            axios.get(url).then(rs => setServices(rs.data));
            axios
                .get(
                    'maintenance-packages/providers/' +
                        provider.id +
                        '/models/' +
                        modelId,
                )
                .then(rs => setPackages(rs.data));
        }
    }, [path, provider.id, modelId]);

    return (
        <View style={styles.container}>
            <View style={styles.provider}>
                <View style={styles.image}>
                    <Image
                        source={{
                            uri:
                                provider.imageUrls[0] ??
                                'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/240px-No_image_available.svg.png',
                            height: '100%',
                            width: '100%',
                        }}
                    />
                </View>
                <View style={styles.providerContent}>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 18,

                            fontWeight: 'bold',
                        }}>
                        {provider.name}
                    </Text>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 14,
                        }}>
                        {provider.address}
                    </Text>
                </View>
            </View>
            <View style={styles.content}>
                <FlatList
                    ListHeaderComponent={
                        <FlatList
                            data={services}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item: ser }) => renderServices(ser)}
                        />
                    }
                    ListFooterComponent={
                        <>
                            <Text style={{ color: 'red' }}>
                                {packages.length ? 'Maintenance Packages' : null}
                            </Text>
                            <FlatList
                                data={packages}
                                style={{ marginHorizontal: 8 }}
                                keyExtractor={(item, index) => item.id.toString()}
                                renderItem={({ item: detail }) =>
                                    renderPackageList(detail)
                                }
                            />
                        </>
                    }
                />
                {renderModal()}
                {renderPackageModal()}
            </View>
            <View>
                <Button
                    title="Next"
                    onPress={() =>
                        serviceList.length > 0 || packageList.length > 0
                            ? navigation.navigate('Review', {
                                  detail: {
                                      provider: {
                                          id: provider.id,
                                          name: provider.name,
                                          address: provider.address,
                                      },
                                  },
                                  serviceList: serviceList,
                                  packageList: packageList,
                              })
                            : Alert.alert('You have to choose at least one service')
                    }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
    },
    provider: {
        width: '100%',
        height: '30%',
    },
    providerContent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingHorizontal: 8,
    },
    image: {
        width: '100%',
        height: '60%',
    },
});

export default ProviderServices;
