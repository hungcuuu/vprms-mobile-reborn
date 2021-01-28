import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Dimensions } from 'react-native';
import { Text } from 'react-native';
import { Modal } from 'react-native';
import { Alert } from 'react-native';
import { View } from 'react-native';
import { Button, CheckBox, Input } from 'react-native-elements';
import axios from '../../axios';

const ServiceType = ({ navigation, route }) => {
    const [typeList, setTypeList] = useState([]);
    const [selectedType, setSelectedType] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [selectedMaintenance, setSelectedMaintenance] = useState('');
    const [isMaintenanceChecked, setIsMaintenanceChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [note, setNote] = useState('');
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
    const addNoteHandler = () => {
        if (note.length > 16) {
            setIsVisible(false);

            navigation.navigate('PickingProvider', {
                note: note,
                selectedServicesType: [],
                selectedMilestone: {},
                selectedSections: [],
            });
        } else {
            setErrorMessage('Note must has at least 16 character');
        }
    };
    const renderModalNote = (
        <Modal visible={isVisible} animationType="slide" transparent>
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.3)',
                }}>
                <View
                    style={{
                        width: '80%',
                        height: '70%',
                        backgroundColor: '#ccc',
                        // borderWidth: 1,
                        borderRadius: 10,
                    }}>
                    <Text
                        style={{
                            fontSize: 18,
                            margin: 8,
                            textAlign: 'center',
                        }}>
                        Describe your current situation
                    </Text>
                    <Input
                        placeholder="Text here (Max characters is 256)"
                        maxLength={256}
                        onChangeText={value => {
                            setNote(value);
                        }}
                        numberOfLines={10}
                        errorMessage={errorMessage}
                    />
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                        }}>
                        <Button title="Cancel" onPress={() => setIsVisible(false)} />
                        <Button title="Next" onPress={() => addNoteHandler()} />
                    </View>
                </View>
            </View>
        </Modal>
    );
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
                                    title="Theo số km"
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
                                    title="Theo khu vực xe"
                                    checkedIcon="dot-circle-o"
                                    uncheckedIcon="circle-o"
                                    checked={selectedMaintenance === 'section'}
                                    onPress={() => onSelectMaintenanceType('section')}
                                />
                            </View>
                            {/* ) : null} */}
                            <View>
                                <CheckBox
                                    containerStyle={{ backgroundColor: 'transparent' }}
                                    title={'Kiểm tra chung'}
                                    checkedIcon="dot-circle-o"
                                    uncheckedIcon="circle-o"
                                    checked={false}
                                    onPress={() => setIsVisible(true)}
                                />
                                {/* {isMaintenanceChecked ? ( */}
                            </View>
                        </View>
                    </>
                }
            />
            {renderModalNote}
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
