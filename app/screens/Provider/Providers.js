import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import axios from '../../axios';
import { normalizeString } from '../../utils';

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
                    // height: 170,
                    // width: '40%',
                    alignItems: 'center',
                    // flex: 0.5,
                    flexDirection: 'row',
                    borderWidth: 1,
                    margin: 8,
                    // backgroundColor:
                    //     selectedServices.findIndex((ser) => ser.id === section.id) > -1
                    //         ? '#D5E8D4'
                    //         : 'white',
                    borderRadius: 24,
                }}
                onPress={() =>
                    navigation.navigate('ProviderServices', {
                        provider: provider,
                        path: 'provider',
                    })
                }>
                <View
                    style={{
                        marginTop: 8,
                        marginLeft: 8,
                        borderWidth: 1,
                        // flex: 1,
                        height: 100,
                        width: 100,
                    }}>
                    <Image
                        resizeMethod="resize"
                        resizeMode="cover"
                        source={{
                            uri:
                                provider.imageUrls[0] ??
                                'https://i.vimeocdn.com/portrait/58832_300x300.jpg',
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
                        {provider.distance}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };
    useEffect(() => {
        navigation.setOptions({
            title: currentVehicle.model.name,
        });
    }, [currentVehicle.model.name, navigation]);
    useEffect(() => {
        // console.log('vehicle', currentVehicle);

        axios
            .post('providers/', {
                latitude: 0,
                longitude: 0,
            })
            .then(rs => {
                setProviders(rs.data);
                setSearchProviders(rs.data);
                console.log('data', rs.data);
            });
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
