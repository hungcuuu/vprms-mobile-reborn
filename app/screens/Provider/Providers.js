import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { AirbnbRating, SearchBar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import axios from '../../axios';
import { normalizeString } from '../../utils';
import * as Location from 'expo-location';

const Providers = ({ navigation }) => {
    const vehicle = useSelector(state => state.vehicles.currentVehicle ?? []);
    const [providers, setProviders] = useState([]);
    const [searchProviders, setSearchProviders] = useState([]);
    const [currentVehicle] = useState(vehicle);
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
                    alignItems: 'center',

                    flexDirection: 'row',
                    borderWidth: 1,
                    margin: 8,

                    borderRadius: 24,
                }}
                onPress={() =>
                    navigation.navigate('VehiclesScreen', {
                        provider: provider,
                        path: 'provider',
                    })
                }>
                <View
                    style={{
                        marginTop: 8,
                        marginLeft: 8,
                        // borderWidth: 1,
                        // flex: 1,
                        height: 100,
                        width: 100,
                    }}>
                    <Image
                        resizeMethod="resize"
                        resizeMode="contain"
                        source={{
                            uri:
                                provider.imageUrls[0] ??
                                'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/240px-No_image_available.svg.png',
                            height: '100%',
                            width: '100%',
                        }}
                        style={{ width: '100%', height: '100%' }}
                    />
                </View>
                <View
                    style={{
                        textAlign: 'center',
                        fontSize: 16,
                        margin: 10,
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
    useEffect(() => {
        navigation.setOptions({
            title: 'Providers',
        });
    }, [currentVehicle.model.name, navigation]);
    useEffect(() => {
        (async () => {
            let location = await Location.getCurrentPositionAsync({});
            // setLocation(location);
            axios
                .post('providers/', {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                })
                .then(rs => {
                    setProviders(rs.data);
                    setSearchProviders(rs.data);
                    console.log('data', rs.data);
                });
        })();
        // console.log('vehicle', currentVehicle);
    }, []);
    return (
        <View>
            <View>
                <SearchBar
                    value={searchText}
                    placeholder="Search Here..."
                    lightTheme
                    round
                    onChangeText={text => searchHandler(text)}
                    autoCorrect={false}
                    blurOnSubmit={false}
                    clearButtonMode="always"
                />
            </View>

            <View>
                <FlatList
                    data={searchProviders}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item: provider }) => renderProviders(provider)}
                    showsVerticalScrollIndicator={false}
                    // numColumns={2}
                />
            </View>
        </View>
    );
};

export default Providers;
