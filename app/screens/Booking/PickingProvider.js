import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';
import { AirbnbRating, SearchBar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import * as Location from 'expo-location';
import * as _ from 'lodash';

import axios from '../../axios';
import { normalizeString } from '../../utils';
import { Picker } from '@react-native-community/picker';

const PickingProvider = ({ navigation, route }) => {
    const selectedServicesType = route.params?.selectedServicesType ?? [];
    const selectedMilestone = route.params?.selectedMilestone ?? {};
    const selectedSections = route.params?.selectedSections ?? [];
    const noteParam = route.params?.note ?? '';
    console.log(selectedServicesType);
    // console.log('serviceType', selectedServicesType);
    const vehicles = useSelector(state => state.vehicles.currentVehicle ?? []);

    const [providers, setProviders] = useState([]);
    const [searchProviders, setSearchProviders] = useState([]);
    const [sortBy, setSortBy] = useState(['ratings', 'desc']);

    const [searchText, setSearchText] = useState('');
    const searchHandler = text => {
        setSearchText(text);
        if (!text || text === '') {
            setSearchProviders([...providers]);
        }

        const updatedProviders = providers.filter(pro =>
            normalizeString(pro.name).match(normalizeString(text)),
        );
        setSearchProviders(updatedProviders);
    };
    const renderProviders = provider => {
        return (
            <TouchableOpacity
                style={{
                    // height: 170,
                    // width: '40%',
                    alignItems: 'center',
                    // flex: 0.5,
                    flexDirection: 'row',
                    borderWidth: 1,
                    margin: 8,
                    padding: 8,
                    // backgroundColor:
                    //     selectedServices.findIndex((ser) => ser.id === section.id) > -1
                    //         ? '#D5E8D4'
                    //         : 'white',
                    borderRadius: 24,
                }}
                onPress={() => {
                    if (noteParam) {
                        navigation.navigate('Schedule', {
                            detail: { provider },
                            note: noteParam,
                        });
                    } else {
                        navigation.navigate('ProviderServices', { provider: provider });
                    }
                }}>
                <View
                    style={{
                        height: 100,
                        width: 100,
                    }}>
                    <Image
                        resizeMethod="resize"
                        resizeMode="cover"
                        source={{
                            uri:
                                provider.imageUrls[0] ??
                                'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/240px-No_image_available.svg.png',
                            height: '100%',
                            width: '100%',
                        }}
                        style={{ width: '100%', height: '100%', borderRadius: 16 }}
                    />
                </View>
                <View
                    style={{
                        textAlign: 'center',
                        fontSize: 16,
                        margin: 16,
                        // width: '70%',
                        // height: 20,
                        // maxWidth: '70%',
                    }}>
                    <Text>{provider.name}</Text>
                    <Text>{`${(provider.distance / 1000).toFixed(1)} km`}</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                        }}>
                        <AirbnbRating
                            count={1}
                            size={15}
                            reviews={false}
                            showRating={false}
                        />
                        <Text>{provider.ratings > -1 ? provider.ratings : 'none'}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    // useEffect(() => {
    //     if (noteParam.length > 0) {
    //         console.log('2');

    //         async () => {
    //             let location = await Location.getCurrentPositionAsync();

    //             console.log('2');
    //             axios
    //                 .post('providers/', {
    //                     latitude: location.coords.latitude,
    //                     longitude: location.coords.longitude,
    //                 })
    //                 .then(rs => {
    //                     setProviders(rs.data);
    //                     setSearchProviders(rs.data);
    //                 });
    //         };
    //     }
    // }, [noteParam]);
    useEffect(() => {
        (async () => {
            let location = await Location.getCurrentPositionAsync({});
            if (selectedServicesType.length > 0) {
                console.log('1');
                let serviceTypes = selectedServicesType.map(ser => ser.id) ?? [];
                axios
                    .post('providers/type-details', {
                        currentPos: {
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        },
                        modelId: vehicles.model.id,
                        serviceDetailIds: serviceTypes,
                    })
                    .then(rs => {
                        setProviders(rs.data);
                        setSearchProviders(rs.data);
                    });
            } else if (!_.isEmpty(selectedMilestone)) {
                let milestone = selectedMilestone?.id ?? '';
                console.log('3');
                axios
                    .post(
                        `maintenance-packages/milestones/${milestone}/models/${vehicles.model.id}`,
                        {
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        },
                    )
                    .then(rs => {
                        setProviders(rs.data);
                        setSearchProviders(rs.data);
                    });
            } else if (selectedSections.length > 0) {
                let sectionIds = selectedSections.map(sec => sec.sectionId) ?? [];
                console.log('4');
                axios
                    .post(`maintenance-packages/models/${vehicles.model.id}`, {
                        currentLocation: {
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        },
                        sectionIds: sectionIds,
                    })
                    .then(rs => {
                        setProviders(rs.data);
                        setSearchProviders(rs.data);
                    });
            } else {
                console.log('2');

                console.log('2');
                axios
                    .post('providers/', {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    })
                    .then(rs => {
                        setProviders(rs.data);
                        setSearchProviders(rs.data);
                    });
            }
        })();
    }, [
        noteParam,
        selectedMilestone,
        selectedSections,
        selectedServicesType,
        vehicles.model.id,
    ]);
    return (
        <View>
            <View style={{ flexDirection: 'row' }}>
                <SearchBar
                    value={searchText}
                    placeholder="Search Here..."
                    lightTheme
                    round
                    containerStyle={{ width: '70%', flex: 1 }}
                    onChangeText={text => searchHandler(text)}
                    autoCorrect={false}
                    blurOnSubmit={false}
                    clearButtonMode="always"
                />
                <Picker
                    mode="dropdown"
                    selectedValue={sortBy[0]}
                    style={{ height: 50, width: '30%' }}
                    accessibilityLabel="Sort By"
                    onValueChange={(itemValue, itemIndex) => {
                        if (itemValue === 'ratings') {
                            setSortBy([itemValue, 'desc']);
                        } else {
                            setSortBy([itemValue, 'asc']);
                        }
                    }}>
                    <Picker.Item label={'Rating'} value={'ratings'} />
                    <Picker.Item label={'Distance'} value={'distance'} />
                </Picker>
            </View>

            <View>
                <FlatList
                    data={_.orderBy(searchProviders, sortBy[0], sortBy[1])}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item: provider }) => renderProviders(provider)}
                    // showsVerticalScrollIndicator={false}
                    // numColumns={2}
                />
            </View>
        </View>
    );
};

export default PickingProvider;
