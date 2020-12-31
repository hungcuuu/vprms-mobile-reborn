import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import { useSelector } from 'react-redux';
import axios from '../../axios';

const AccessoryServicesScreen = ({ navigation, route }) => {
    const vehicles = useSelector(state => state.vehicles.currentVehicle ?? []);
    // const selections = route.params.selections ?? [];

    let detail = route.params.detail ?? [];
    const [services, setServices] = useState();
    const [selectedService, setSelectedService] = useState([]);
    // const [categoryList, setCategoryList] = useState([]);

    // const serviceChangedHandler = (partId, checked) => {
    //     setSelectedService((curr) => {
    //         if (curr.findIndex((item) => item.id === type.id) === -1) {
    //             return [...curr, type];
    //         }
    //         return curr.filter((item) => item.id !== type.id);
    //     });
    // };

    const renderServices = service => {
        return (
            <View style={{ borderWidth: 1, padding: 16 }}>
                <View>
                    <View style={{ alignItems: 'flex-start' }}>
                        {/* <Text>{part.part.id}</Text> */}
                        <CheckBox
                            key={service.id}
                            center
                            title={`${service.name}`}
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            checked={
                                selectedService.findIndex(x => x.id === service.id) > -1
                            }
                            onPress={() =>
                                // serviceChangedHandler(service.serviceId)
                                setSelectedService([service])
                            }
                        />

                        <Text>{service.price}</Text>

                        {service.parts
                            ? service.parts.map(part => (
                                  <View key={part.id}>
                                      <Text>{part.name}</Text>
                                      <Text>quantity {part.quantity}</Text>
                                      <Text>{part.price}</Text>
                                  </View>
                              ))
                            : null}

                        {/* <CheckBox
                            center
                            title="None"
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            checked={service.checked === 'none'}
                            onPress={() => serviceChangedHandler(service.part.id, 'none')}
                            // onPress={() => setSelected(1)}
                            // checked={selected === 1}
                        /> */}

                        {/* <Text>{part.serviceName}</Text>
                        <Text>{part.price}</Text> */}
                        {/* <Text>{part.serviceId}</Text> */}
                    </View>
                </View>
            </View>
        );
    };

    useEffect(() => {
        // console.log('select', selections);
        // let categories = [...new Set(selections.map(item => item.id))];
        // console.log('cate', categories);
        axios
            .get(
                'services/providers/' +
                    detail.provider.id +
                    // 1 +
                    '/models/' +
                    vehicles.model.id +
                    '/parts/' +
                    detail.part.id,
                // 1,
                // categories,
            )
            .then(rs => {
                // console.log('data', rs.data);
                setServices(rs.data);
                console.log('a', rs.data);
                // const partList = selections
                //     .reduce(
                //         (curr, part) => [
                //             ...curr,
                //             {
                //                 part: part,
                //                 category: part.categoryId,
                //                 services: a[part.id],
                //             },
                //         ],
                //         [],
                //     )
                //     .map((part) => ({ ...part, checked: 'none' }));
                // console.log('part', partList);
                // console.log('rs', rs.data);
                // setPartList(partList);
            });
    }, [detail.part.id, detail.provider.id, vehicles.model.id]);

    return (
        <View
            style={{
                flex: 1,
                width: '100%',
                paddingVertical: 16,
                paddingHorizontal: 16,
                borderWidth: 1,
            }}>
            <FlatList
                data={services}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item: service }) => renderServices(service)}
                showsVerticalScrollIndicator={false}
                initialNumToRender={7}
            />
            <View style={{}}>
                <Button
                    title="See More"
                    onPress={() =>
                        selectedService
                            ? navigation.navigate('ProviderServices', {
                                  provider: detail.provider,
                                  selectedService: selectedService,
                              })
                            : Alert.alert('You have to choose one service')
                    }
                />
            </View>
            <View style={{}}>
                <Button
                    title="Next"
                    onPress={() =>
                        selectedService
                            ? navigation.navigate('Review', {
                                  serviceList: selectedService,
                                  detail: detail,
                              })
                            : Alert.alert('You have to choose one service')
                    }
                />
            </View>
        </View>
    );
};

export default AccessoryServicesScreen;
