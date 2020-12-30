import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Modal,
    Button,
    TouchableOpacity,
    VirtualizedList,
} from 'react-native';

import { CheckBox } from 'react-native-elements';
import { SliderBox } from 'react-native-image-slider-box';
import { useSelector } from 'react-redux';
import axios from '../../axios';

const ProviderServices = ({ navigation, route }) => {
    const vehicles = useSelector(state => state.vehicles.currentVehicle ?? []);

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
    const renderParts = parts => {
        return (
            <View style={{ borderWidth: 1 }}>
                <View>
                    <Text>Id: {parts.id}</Text>
                    {/* <Text>{detail}</Text> */}
                    <Text>Name: {parts.name}</Text>
                    <Text>Price: {parts.price}</Text>
                </View>

                {/* {detail.parts
                    ? detail.parts.map((x) => (
                          <View key={x.id}>
                              <Text>{x.name}</Text>
                          </View>
                      ))
                    : null} */}
            </View>
        );
    };
    const renderModal = () => {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                // presentationStyle="formSheet"
                visible={visible}
                style={{ justifyContent: 'flex-end' }}>
                <View
                    style={{
                        flex: 1,
                        // flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#00BCD4',
                        height: '70%',
                        width: '80%',
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: '#fff',
                        marginTop: 80,
                        marginLeft: 40,
                    }}>
                    <View style={{ height: 500 }}>
                        <FlatList
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
                        <Text>{detail.price}</Text>
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
                            setPartList(detail.parts), setVisible(true);
                        }}
                    />
                </View>
            </View>
        );
    };
    const renderServices = () => {
        return (
            <View>
                {services
                    ? services.map(ser => (
                          <View key={ser.typeDetail.id}>
                              <Text style={{ color: 'red' }}>
                                  {ser.typeDetail.typeName}
                              </Text>
                              {ser.serviceDetails ? null : <Text>None</Text>}
                              <FlatList
                                  data={ser.serviceDetails}
                                  keyExtractor={(item, index) => item.id.toString()}
                                  renderItem={({ item: detail }) => renderDetail(detail)}
                                  initialNumToRender={7}
                              />
                          </View>
                      ))
                    : null}
            </View>
        );
    };
    useEffect(() => {
        if (path === 'provider') {
            let url = `services/providers/${provider.id}/models/${vehicles.model.id}`;
            axios.get(url).then(rs => {
                setServices(rs.data), console.log(rs.data);
            });
        }
        if (selectedService.length > 0) {
            axios
                .get('services/providers/' + provider.id + '/models/' + vehicles.model.id)
                .then(rs => setServices(rs.data));
            setServiceList(selectedService);
            console.log('///////////');
        }
    }, []);
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
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
                        {provider.id}
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
                {renderServices()}
                {renderModal()}
            </ScrollView>
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

const styles = StyleSheet.create({});
