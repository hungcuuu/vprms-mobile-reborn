import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Alert } from 'react-native';
import { View } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import axios from '../../axios';

const ServiceType = ({ navigation, route }) => {
    const [typeList, setTypeList] = useState([]);
    const [selectedType, setSelectedType] = useState([]);

    const onSelectTypeChecked = type => {
        setSelectedType(curr => {
            if (curr.findIndex(item => item.id === type.id) === -1) {
                return [...curr, type];
            }
            return curr.filter(item => item.id !== type.id);
        });
    };
    useEffect(() => {
        axios.get('service-types').then(rs => setTypeList(rs.data));
    }, []);
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={typeList}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <CheckBox
                        center
                        title={item.name}
                        checkedIcon="check-square-o"
                        uncheckedIcon="square-o"
                        checked={selectedType.findIndex(s => s.id === item.id) > -1}
                        onPress={() => onSelectTypeChecked(item)}
                    />
                )}
            />
            <Button
                title="Next"
                onPress={() =>
                    selectedType.length > 0
                        ? navigation.navigate('ServiceTypeDetail', selectedType)
                        : Alert.alert('Please choose at least one option')
                }
            />
        </View>
    );
};

export default ServiceType;
