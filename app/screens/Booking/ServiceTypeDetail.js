import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Alert } from 'react-native';
import { Image } from 'react-native';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import axios from '../../axios';

const ServiceTypeDetail = ({ navigation, route }) => {
    const serviceType = route.params.selectedType ?? [];
    const maintenanceType = route.params.selectedMaintenance ?? '';
    const [sectionList, setSectionList] = useState([]);
    const [milestoneList, setMilestoneList] = useState([]);

    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedSections, setSelectedSections] = useState([]);
    const [selectedMilestone, setSelectedMilestone] = useState({});

    const onSelectService = service => {
        setSelectedServices(curr => {
            if (curr.findIndex(item => item.id === service.id) === -1) {
                return [...curr, service];
            }
            return curr.filter(item => item.id !== service.id);
        });
    };
    const onSelectSection = sec => {
        setSelectedSections(curr => {
            if (curr.findIndex(item => item.sectionId === sec.sectionId) === -1) {
                return [...curr, sec];
            }
            return curr.filter(item => item.sectionId !== sec.sectionId);
        });
    };
    // const onSelectMilestone = milestone => {
    //     setSelectedSections(milestone);
    // }
    const renderSections = section => {
        return (
            <TouchableOpacity
                style={{
                    // height: 170,
                    width: '40%',
                    alignItems: 'center',
                    // flex: 0.5,
                    borderWidth: 1,
                    margin: 8,
                    backgroundColor:
                        maintenanceType === 'section'
                            ? selectedSections.findIndex(
                                  ser => ser.sectionId === section.sectionId,
                              ) > -1
                                ? '#99d6ff'
                                : 'white'
                            : selectedServices.findIndex(ser => ser.id === section.id) >
                              -1
                            ? '#99d6ff'
                            : 'white',
                    borderRadius: 24,
                }}
                onPress={() =>
                    maintenanceType === 'section'
                        ? onSelectSection(section)
                        : onSelectService(section)
                }>
                <View
                    style={{
                        marginTop: 8,
                        // borderWidth: 1,
                        // flex: 1,
                        height: 100,
                        width: 100,
                    }}>
                    <Image
                        resizeMethod="resize"
                        resizeMode="cover"
                        source={{
                            uri:
                                section.sectionImageUrl ??
                                'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/240px-No_image_available.svg.png',
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
                        {section.sectionName}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };
    const renderServiceOption = (
        <FlatList
            data={serviceType}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
                <View style={{}}>
                    <Text style={{ fontSize: 20, margin: 20 }}> {item.name} </Text>
                    <View style={{}}>
                        <FlatList
                            data={sectionList.filter(sec => sec.typeName === item.name)}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item: section }) => renderSections(section)}
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            columnWrapperStyle={{
                                alignSelf: 'center',
                                // height: Dimensions.get('screen').height * 0.1,
                            }}
                        />
                    </View>
                </View>
            )}
            showsVerticalScrollIndicator={false}
        />
    );
    const renderMaintenanceOption = (
        <FlatList
            data={sectionList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item: section }) => renderSections(section)}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            columnWrapperStyle={{
                alignSelf: 'center',
                // height: Dimensions.get('screen').height * 0.1,
            }}
        />
    );
    const renderMilestones = milestone => {
        return (
            <TouchableOpacity
                style={{
                    // height: 170,
                    width: '40%',
                    alignItems: 'center',
                    // flex: 0.5,
                    borderWidth: 1,
                    margin: 8,
                    backgroundColor:
                        selectedMilestone.id === milestone.id ? '#99d6ff' : 'white',
                    borderRadius: 8,
                }}
                onPress={() => setSelectedMilestone(milestone)}>
                <View
                    style={{
                        height: 100,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text style={{ fontSize: 18 }}>{milestone.milestone} KM</Text>
                </View>
            </TouchableOpacity>
        );
    };
    const renderMilestoneOption = (
        <FlatList
            data={milestoneList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item: milestone }) => renderMilestones(milestone)}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            columnWrapperStyle={{
                alignSelf: 'center',
                // height: Dimensions.get('screen').height * 0.1,
            }}
        />
    );
    useEffect(() => {
        if (maintenanceType === 'milestone') {
            axios
                .get('maintenance-packages/milestones')
                .then(rs => {
                    setMilestoneList(rs.data);
                })
                .catch(error => {
                    if (error.response) {
                        Alert.alert('Something went wrong!', error.response.data.message);
                    }
                });
        } else if (maintenanceType === 'section') {
            axios
                .get('service-type-details/sections/plain')
                .then(rs => setSectionList(rs.data))
                .catch(error => {
                    if (error.response) {
                        Alert.alert('Something went wrong!', error.response.data.message);
                    }
                });
        } else {
            let typeIdList = serviceType.map(type => type.id);
            axios
                .post('service-type-details', typeIdList, {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                })
                .then(rs => setSectionList(rs.data))
                .catch(error => {
                    if (error.response) {
                        Alert.alert('Something went wrong!', error.response.data.message);
                    }
                });
        }
    }, [maintenanceType, serviceType]);

    return (
        <View style={{ flex: 1 }}>
            {maintenanceType === 'section'
                ? renderMaintenanceOption
                : maintenanceType === 'milestone'
                ? renderMilestoneOption
                : renderServiceOption}

            <Button
                title="Next"
                onPress={() =>
                    navigation.navigate('PickingProvider', {
                        selectedServicesType: selectedServices,
                        selectedMilestone: selectedMilestone,
                        selectedSections: selectedSections,
                    })
                }
            />
        </View>
    );
};

export default ServiceTypeDetail;
