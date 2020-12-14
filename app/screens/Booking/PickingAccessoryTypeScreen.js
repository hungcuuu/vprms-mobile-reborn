import React from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { CATALOG } from '../../data/catalog';
const PickingAccessoryTypeScreen = ({ navigation }) => {
    const renderAccessoryTypeList = (itemData) => (
        <View style={styles.items}>
            <TouchableOpacity
                onPress={() => navigation.navigate('PickingAccessory', itemData.item.ID)}
                style={{ flex: 1, width: '100%', height: '100%', borderWidth: 1 }}>
                <Text> {itemData.item.NAME} </Text>
            </TouchableOpacity>
        </View>
    );
    return (
        <View style={styles.container}>
            <View style={styles.itemsContainer}>
                <FlatList
                    data={CATALOG}
                    keyExtractor={(item, index) => item.ID.toString()}
                    renderItem={renderAccessoryTypeList}
                />
            </View>
        </View>
    );
};

export default PickingAccessoryTypeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderWidth: 1,
        // flexDirection: '',
        // flexWrap: 'nowrap',
    },
    items: {
        // flex: 1,
        borderWidth: 1,
        width: '40%',
        height: 100,
        margin: 10,
        alignItems: 'center',
    },
    itemsContainer: {
        // marginTop: 20,
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        alignContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
});
