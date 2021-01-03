import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { Alert } from 'react-native';
import { FlatList, Text, View, ScrollView, Modal, Button } from 'react-native';

import { CheckBox } from 'react-native-elements';
import { SliderBox } from 'react-native-image-slider-box';
import { useSelector } from 'react-redux';
import axios from '../../axios';
import { formatMoney } from '../../utils';

const ProviderServices = ({ navigation, route }) => {
    const vehicleId = useSelector(state => state.vehicles.currentVehicle.model.id ?? '');

    const provider = route.params?.provider ?? [];
    const selectedService = route.params?.selectedService ?? [];
    const path = route.params?.path ?? '';
    const [visible, setVisible] = useState(false);
    const [services, setServices] = useState(route.params?.provider.services ?? []);

    const [partList, setPartList] = useState([]);
    const [serviceList, setServiceList] = useState([]);
    // const images = [
    //     'https://storage.googleapis.com/vrms-290212.appspot.com/b993e482-b7d7-4cc6-b5e3-160a61243c1fpreview.jpg?GoogleAccessId=firebase-adminsdk-y2tzh@vrms-290212.iam.gserviceaccount.com&Expires=2472004708&Signature=JROFokSik32lYHppJedh5R5SzcLMEVq5egeErrWRLDqgAKOUpyeqvs1uUWgpYQf8%2B%2BhuGAm%2Fh3E1iKKSdmOSP%2FMwz9ro%2FVco%2B36FKj6RCyqduDDGznFyKSMr9rj6JTNOMUd3OYRkJl%2BJAijRztV%2Bk9p9RxucRFxfDIRJXblp59nHaccrklX%2FnoexQvgRI3lNbcEKRlG0oTwaek8ErAglg5GFgVWItTv2PvaJIhHan%2FBaYIis1btQaIZnVMwfLe08heUbTSVqmtQB30g3oJRf8s67ZsIk7UoNbycEPw5j%2BYkIsZSFlQIwm28InPuzVRKfiHw4lAI8VqFGv5uHi9K%2F6g%3D%3D',
    //     'https://lh5.googleusercontent.com/p/AF1QipP_rnwWXIAorYxSJuScmKlfJdLJ65SXGLOA60HA=w426-h240-k-no',

    //     'https://i.vimeocdn.com/portrait/58832_300x300.jpg',
    // ];
    const onSelectServiceChecked = service => {
        setServiceList(curr => {
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
                                'https://i.vimeocdn.com/portrait/58832_300x300.jpg',
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
                animationType="slide"
                transparent={true}
                // presentationStyle="formSheet"
                visible={visible}
                onRequestClose={() => setVisible(false)}>
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
                            listKey={'modal'}
                            data={partList}
                            keyExtractor={(item, index) => item.id.toString()}
                            renderItem={({ item: detail }) => renderParts(detail)}
                            initialNumToRender={7}
                        />
                    </View>

                    <View>
                        <Button title="Close" onPress={() => setVisible(false)} />
                    </View>
                </View>
            </Modal>
        );
    };
    const renderDetail = detail => {
        return (
            <View
                style={{
                    borderWidth: 1,
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'space-between',
                    borderRadius: 8,
                    margin: 8,
                }}>
                <View
                    style={{
                        // borderWidth: 1,
                        flexDirection: 'row',
                        flex: 1,
                    }}>
                    <View style={{ borderRightWidth: 1 }}>
                        <CheckBox
                            // key={detail.serviceId}
                            center
                            checkedIcon="check-square-o"
                            uncheckedIcon="square-o"
                            checked={serviceList.findIndex(s => s.id === detail.id) > -1}
                            size={30}
                            onPress={() => onSelectServiceChecked(detail)}
                        />
                    </View>
                    <View style={{ width: '80%', marginHorizontal: 8 }}>
                        {/* <Text>{detail.id}</Text> */}
                        {/* <Text>{detail}</Text> */}
                        <Text style={{ fontWeight: 'bold' }}>{detail.name}</Text>
                        <Text>{formatMoney(detail.price)}</Text>
                        {/* {detail.parts
                    ? detail.parts.map((x) => (
                          <View key={x.id}>
                              <Text>{x.name}</Text>
                          </View>
                      ))
                    : null} */}
                    </View>
                </View>

                <View style={{ justifyContent: 'center', marginRight: 8 }}>
                    <Button
                        title="detail"
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
        return (
            <View>
                <View key={ser.typeDetail.id}>
                    <Text style={{ color: 'red' }}>{ser.typeDetail.typeName}</Text>
                    {ser.serviceDetails ? null : <Text>None</Text>}
                    <FlatList
                        // listKey={}
                        data={ser.serviceDetails}
                        keyExtractor={(item, index) => item.id.toString()}
                        renderItem={({ item: detail }) => renderDetail(detail)}
                        initialNumToRender={7}
                        scrollEnabled={false}
                        nestedScrollEnabled={true}
                    />
                </View>
            </View>
        );
    };
    useEffect(() => {
        if (selectedService.length > 0) {
            axios
                .get('services/providers/' + provider.id + '/models/' + vehicleId)
                .then(rs => setServices(rs.data));

            setServiceList(selectedService);
        }
    }, [provider.id, selectedService, vehicleId]);
    useEffect(() => {
        if (path === 'provider') {
            let url = `services/providers/${provider.id}/models/${vehicleId}`;
            axios.get(url).then(rs => setServices(rs.data));
            // setServices(data);
            // console.log(data);
        }
    }, [path, provider.id, vehicleId]);
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <FlatList
                    ListHeaderComponent={
                        <>
                            <View
                                style={{
                                    marginTop: 8,
                                    marginLeft: 8,
                                    borderWidth: 1,
                                    // flex: 1,
                                    height: 200,
                                    // width: 100,
                                }}>
                                <SliderBox
                                    circleLoop
                                    images={
                                        provider.imageUrls ?? [
                                            'https://i.vimeocdn.com/portrait/58832_300x300.jpg',
                                            'https://i.vimeocdn.com/portrait/58832_300x300.jpg',

                                            'https://i.vimeocdn.com/portrait/58832_300x300.jpg',
                                        ]
                                    }
                                    autoplay
                                    dotColor="#FFEE58"
                                    inactiveDotColor="#90A4AE"
                                />
                            </View>
                            <View>
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        fontSize: 16,
                                        margin: 10,
                                        // width: '70%',
                                        // height: 20,
                                        // maxWidth: '70%',
                                    }}>
                                    {/* {provider.id} */}
                                    {provider.name}
                                </Text>
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        fontSize: 16,
                                        margin: 10,
                                        // width: '70%',
                                        // height: 20,
                                        // maxWidth: '70%',
                                    }}>
                                    {provider.address}
                                </Text>
                            </View>
                        </>
                    }
                    data={services}
                    listKey={'service'}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item: ser }) => renderServices(ser)}
                />
            </View>
            {renderModal()}
            <View style={{ justifyContent: 'flex-end' }}>
                <Button
                    title="next"
                    onPress={() =>
                        serviceList.length > 0
                            ? navigation.navigate('Review', {
                                  detail: {
                                      provider: {
                                          id: provider.id,
                                          name: provider.name,
                                          address: provider.address,
                                      },
                                  },
                                  serviceList: serviceList,
                              })
                            : Alert.alert('You have to choose at least one service')
                    }
                />
            </View>
        </View>
    );
};

export default ProviderServices;
