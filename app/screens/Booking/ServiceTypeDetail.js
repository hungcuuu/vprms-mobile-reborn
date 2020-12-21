import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { Image } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import axios from '../../axios';

const ServiceTypeDetail = ({ navigation, route }) => {
    const serviceType = route.params ?? [];

    const [sectionList, setSectionList] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);

    const onSelectService = (service) => {
        setSelectedServices((curr) => {
            if (curr.findIndex((item) => item.id === service.id) === -1) {
                return [...curr, service];
            }
            return curr.filter((item) => item.id !== service.id);
        });
    };
    const renderSections = (section) => {
        return (
            <TouchableOpacity
                style={{
                    // height: 170,
                    width: '40%',
                    alignItems: 'center',
                    // flex: 0.5,
                    borderWidth: 1,
                    margin: 8,
                    backgroundColor:
                        selectedServices.findIndex((ser) => ser.id === section.id) > -1
                            ? '#D5E8D4'
                            : 'white',
                    borderRadius: 24,
                }}
                onPress={() => onSelectService(section)}>
                <View
                    style={{
                        marginTop: 8,
                        borderWidth: 1,
                        // flex: 1,
                        height: 100,
                        width: 100,
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
                        {section.id + ' ' + section.sectionName}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };
    useEffect(() => {
        let typeIdList = serviceType.map((type) => type.id);
        axios
            .post('service-type-details', typeIdList)
            .then((rs) => setSectionList(rs.data));
    }, []);
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={serviceType}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{}}>
                        <Text> {item.name} </Text>
                        <View style={{}}>
                            <FlatList
                                data={sectionList.filter(
                                    (sec) => sec.typeName === item.name,
                                )}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item: section }) =>
                                    renderSections(section)
                                }
                                showsVerticalScrollIndicator={false}
                                numColumns={2}
                                columnWrapperStyle={{
                                    alignSelf: 'center',
                                    // height: Dimensions.get('screen').height * 0.1,
                                }}
                            />
                        </View>
                    </View>
                )}
                showsVerticalScrollIndicator={false}
            />
            <Button
                title="Next"
                onPress={() =>
                    navigation.navigate('PickingProvider', {
                        selectedServicesType: selectedServices,
                    })
                }
            />
        </View>
    );
};

export default ServiceTypeDetail;

const styles = StyleSheet.create({});
