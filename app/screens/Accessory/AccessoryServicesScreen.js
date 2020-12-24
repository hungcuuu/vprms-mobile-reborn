import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import { useSelector } from 'react-redux';
import axios from '../../axios';

const AccessoryServicesScreen = ({ navigation, route }) => {
    const vehicles = useSelector((state) => state.vehicles.currentVehicle ?? []);
    const selections = route.params.selections ?? [];

    let detail = route.params.detail ?? [];
    const [partList, setPartList] = useState([]);
    // const [categoryList, setCategoryList] = useState([]);

    const serviceChangedHandler = (partId, checked) => {
        const updatedPartList = [...partList];
        const index = updatedPartList.findIndex((part) => part.part.id === partId);
        updatedPartList[index].checked = checked;
        setPartList(updatedPartList);
    };

    const renderParts = (part) => {
        return (
            <View style={{ borderWidth: 1, padding: 16 }}>
                <View>
                    <View style={{ alignItems: 'flex-start' }}>
                        {/* <Text>{part.part.id}</Text> */}
                        <Text>{part.part.name}</Text>

                        {/* <Text>{part.part.name}</Text> */}
                        {part.services
                            ? part.services.map((detail) => (
                                  <CheckBox
                                      key={detail.serviceId}
                                      center
                                      title={`${detail.serviceName}`}
                                      checkedIcon="dot-circle-o"
                                      uncheckedIcon="circle-o"
                                      checked={detail.serviceId === part.checked}
                                      onPress={() =>
                                          serviceChangedHandler(
                                              part.part.id,
                                              detail.serviceId,
                                          )
                                      }
                                  />
                              ))
                            : null}

                        <CheckBox
                            center
                            title="None"
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            checked={part.checked === 'none'}
                            onPress={() => serviceChangedHandler(part.part.id, 'none')}
                            // onPress={() => setSelected(1)}
                            // checked={selected === 1}
                        />

                        {/* <Text>{part.serviceName}</Text>
                        <Text>{part.price}</Text> */}
                        {/* <Text>{part.serviceId}</Text> */}
                    </View>
                    <View></View>
                </View>
            </View>
        );
    };

    useEffect(() => {
        // console.log('select', selections);
        let categories = [...new Set(selections.map((item) => item.id))];
        // console.log('cate', categories);
        axios
            .post(
                'services/providers/' +
                    detail.provider.id +
                    // 1 +
                    '/models/' +
                    vehicles.model.id,
                // 1,
                categories,
            )
            .then((rs) => {
                // console.log('data', rs.data);
                let a = rs.data;
                // console.log('a', a[3]);
                const partList = selections
                    .reduce(
                        (curr, part) => [
                            ...curr,
                            {
                                part: part,
                                category: part.categoryId,
                                services: a[part.id],
                            },
                        ],
                        [],
                    )
                    .map((part) => ({ ...part, checked: 'none' }));
                console.log('part', partList);
                // console.log('rs', rs.data);
                setPartList(partList);
            });
    }, []);

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
                data={partList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item: part }) => renderParts(part)}
                showsVerticalScrollIndicator={false}
            />

            <View style={{}}>
                <Button
                    title="Next"
                    onPress={() =>
                        navigation.navigate('Review', {
                            partList: partList,
                            detail: detail,
                        })
                    }
                />
            </View>
        </View>
    );
};

export default AccessoryServicesScreen;

const styles = StyleSheet.create({});
