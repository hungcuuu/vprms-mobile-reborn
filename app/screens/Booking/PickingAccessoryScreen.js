import React from 'react';
import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { ACCESSORY_TYPE } from '../../data/accessory-type';

const PickingAccessoryScreen = ({ navigation, route }) => {
    const accessoryType = route.params;

    const renderAccessoryTypeList = (itemData) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('PickingProvider')}
            style={styles.items}>
            <Text> {itemData.item.NAME} </Text>
        </TouchableOpacity>
    );
    return (
        <View style={styles.container}>
            <View style={styles.itemsContainer}>
                <FlatList
                    data={ACCESSORY_TYPE.filter(
                        (typeId) => typeId.TYPEID === accessoryType,
                    )}
                    keyExtractor={(item, index) => item.ID.toString()}
                    renderItem={renderAccessoryTypeList}
                />
            </View>
        </View>
    );
};

export default PickingAccessoryScreen;

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
        width: Dimensions.get('screen').width * 0.4,
        height: 100,
        margin: 10,
        alignItems: 'center',
    },
    itemsContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        alignContent: 'center',
        alignItems: 'center',
        // borderWidth: 2,
    },
});
