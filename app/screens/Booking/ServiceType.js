import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Dimensions } from 'react-native';
import { Alert } from 'react-native';
import { View } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import axios from '../../axios';

const ServiceType = ({ navigation, route }) => {
    const [typeList, setTypeList] = useState([]);
    const [selectedType, setSelectedType] = useState([]);

    const [selectedMaintenance, setSelectedMaintenance] = useState('');
    const [isMaintenanceChecked, setIsMaintenanceChecked] = useState(false);
    const onSelectTypeChecked = type => {
        setSelectedMaintenance('');
        setIsMaintenanceChecked(false);
        setSelectedType(curr => {
            if (curr.findIndex(item => item.id === type.id) === -1) {
                return [...curr, type];
            }
            return curr.filter(item => item.id !== type.id);
        });
    };
    const onSelectMaintenanceChecked = () => {
        if (isMaintenanceChecked) {
            setSelectedMaintenance('');
            setIsMaintenanceChecked(false);
        } else {
            setSelectedMaintenance('milestone');
            setSelectedType([]);
            setIsMaintenanceChecked(true);
        }
    };

    const onSelectMaintenanceType = maintenance => {
        setSelectedMaintenance(maintenance);
        setSelectedType([]);
        setIsMaintenanceChecked(true);
    };
    useEffect(() => {
        axios.get('service-types').then(rs => setTypeList(rs.data));
    }, []);
    return (
        <View
            style={{
                flex: 1,
                // justifyContent: 'flex-start',
                // alignContent: 'center',
                // alignItems: 'center',
            }}>
            <FlatList
                data={typeList}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{
                    justifyContent: 'center',
                    // alignItems: 'flex-start',
                    marginTop: 50,
                    alignContent: 'center',
                    backgroundColor: 'transparent',
                    // borderWidth: 1,
                    // paddingHorizontal: 50,
                    paddingLeft: Dimensions.get('screen').width * 0.1,
                }}
                renderItem={({ item }) => (
                    <CheckBox
                        // center
                        containerStyle={{
                            backgroundColor: 'transparent',
                            paddingLeft: 45,
                        }}
                        // wrapperStyle={{ justifyContent: 'center' }}
                        title={item.name}
                        checkedIcon="check-square-o"
                        uncheckedIcon="square-o"
                        checked={selectedType.findIndex(s => s.id === item.id) > -1}
                        onPress={() => onSelectTypeChecked(item)}
                    />
                )}
                ListHeaderComponent={
                    <CheckBox
                        containerStyle={{
                            backgroundColor: 'transparent',
                        }}
                        // center
                        title="Dịch vụ"
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checked={!isMaintenanceChecked}
                        onPress={() => onSelectMaintenanceChecked()}
                    />
                }
                ListFooterComponent={
                    <>
                        <View>
                            <CheckBox
                                containerStyle={{ backgroundColor: 'transparent' }}
                                title={'Bảo dưỡng'}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                checked={isMaintenanceChecked}
                                onPress={() => onSelectMaintenanceChecked()}
                            />
                            {/* {isMaintenanceChecked ? ( */}
                            <View>
                                <CheckBox
                                    containerStyle={{
                                        backgroundColor: 'transparent',
                                        marginLeft: 45,
                                    }}
                                    // center
                                    title="MileStones"
                                    checkedIcon="dot-circle-o"
                                    uncheckedIcon="circle-o"
                                    checked={selectedMaintenance === 'milestone'}
                                    onPress={() => onSelectMaintenanceType('milestone')}
                                />
                                <CheckBox
                                    containerStyle={{
                                        backgroundColor: 'transparent',
                                        marginLeft: 45,
                                    }}
                                    // center
                                    title="Sections"
                                    checkedIcon="dot-circle-o"
                                    uncheckedIcon="circle-o"
                                    checked={selectedMaintenance === 'section'}
                                    onPress={() => onSelectMaintenanceType('section')}
                                />
                            </View>
                            {/* ) : null} */}
                        </View>
                    </>
                }
            />
            <Button
                title="Next"
                onPress={() =>
                    selectedType.length > 0 || selectedMaintenance.length > 0
                        ? navigation.navigate('ServiceTypeDetail', {
                              selectedType: selectedType,
                              selectedMaintenance: selectedMaintenance,
                          })
                        : Alert.alert('Please choose at least one option')
                }
            />
        </View>
    );
};

export default ServiceType;
