import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { PROVIDERS } from '../../data/providers';
// import {} from '../../data/'
const PickingProviderScreen = () => {
    const renderProviderList = (itemData) => (
        <TouchableOpacity
            // onPress={() => navigation.navigate('PickingAccessory')}
            style={styles.items}>
            <Text> {itemData.item.NAME} </Text>
        </TouchableOpacity>
    );
    return (
        <View style={styles.container}>
            <FlatList
                // refreshControl={
                //     <RefreshControl
                //         refreshing={refreshing}
                //         onRefresh={onRefresh}
                //     />
                // }
                data={PROVIDERS}
                keyExtractor={(item, index) => item.ID.toString()}
                renderItem={renderProviderList}
            />
        </View>
    );
};

export default PickingProviderScreen;

const styles = StyleSheet.create({});
