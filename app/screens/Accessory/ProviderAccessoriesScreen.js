import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, CheckBox, SearchBar } from 'react-native-elements';
import { ACCESSORIES } from '../../data/accessories';

import { normalizeString } from '../../utils';
const ProviderAccessoriesScreen = ({ navigation, route }) => {
    const [accessories, setAccessories] = useState(ACCESSORIES);
    const [filteredAccessories, setFilteredAccessories] = useState(ACCESSORIES);
    const [searchText, setSearchText] = useState('');
    const [selectedAccessories, setSelectedAccessories] = useState([]);
    const searchHandler = (text) => {
        setSearchText(text);
        if (!text || text === '') {
            setFilteredAccessories([...accessories]);
        }

        const updatedAccessories = accessories.filter((ser) =>
            normalizeString(ser.NAME).match(normalizeString(text)),
        );
        setFilteredAccessories(updatedAccessories);
    };
    const onSelectAccessoriesChecked = (obj) => {
        setSelectedAccessories((curr) => {
            if (curr.findIndex((item) => item.ID === obj.ID) === -1) {
                return [...curr, obj];
            }
            return curr.filter((item) => item.ID !== obj.ID);
        });
    };
    const renderAccessoryTypeList = (itemData) => (
        <CheckBox
            key={itemData.item.ID}
            checkedIcon="check"
            checkedColor="red"
            title={itemData.item.NAME}
            checked={selectedAccessories.findIndex((s) => s.ID === itemData.item.ID) > -1}
            onPress={() => onSelectAccessoriesChecked(itemData.item)}
        />
    );
    return (
        <View style={styles.container}>
            <View>
                <Text>Provider A</Text>
            </View>
            <View>
                <Text>0.6km</Text>
            </View>
            <View>
                <Text>A33/33 Nguyen Thi Thap</Text>
            </View>
            <View>
                <SearchBar
                    value={searchText}
                    placeholder="Search Here..."
                    lightTheme
                    round
                    onChangeText={(text) => searchHandler(text)}
                    autoCorrect={false}
                    blurOnSubmit={false}
                    clearButtonMode="always"
                />
            </View>
            <FlatList
                data={filteredAccessories}
                keyExtractor={(item, index) => item.ID.toString()}
                renderItem={renderAccessoryTypeList}
            />

            <View>
                <Button
                    title="Next"
                    onPress={() => navigation.navigate('AccessoryServices')}
                />
            </View>
        </View>
    );
};

export default ProviderAccessoriesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderWidth: 1,
        // marginBottom: 10,
        // flexDirection: '',
        // flexWrap: 'nowrap',
    },
});
