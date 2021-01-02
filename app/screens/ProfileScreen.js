import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { RefreshControl } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { Avatar, Button, Card, Input } from 'react-native-elements';
import { connect, useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import * as actions from '../store/actions';
import { Modal } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { Alert } from 'react-native';

const ProfileScreen = ({ navigation }, { onLogout, ...rest }) => {
    const user = useSelector(state => state.auth.user ?? []);
    const [isVisible, setIsVisible] = useState(false);
    const [fullName, setFullname] = useState(user.fullName ?? '');
    const [gender, setGender] = useState(user.gender ?? false);
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(actions.logoutRequest());
    };
    const updateUserInfo = () => {
        dispatch(actions.updateUser(user.id, fullName, gender, setIsVisible(false)));
        // console.log(user);
    };
    const onCancelUpdate = () => {
        setIsVisible(false);
    };
    const onRefresh = () => {
        setRefreshing(true);
        setRefreshing(false);
    };
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={() => setIsVisible(true)}
                    title="Edit"
                    buttonStyle={{ backgroundColor: 'red' }}
                />
            ),
        });
    }, [navigation, isVisible]);
    return (
        <ScrollView
            style={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <Card
                containerStyle={{
                    width: '90%',
                    margin: 0,
                    alignSelf: 'center',
                }}>
                <Avatar
                    size={200}
                    rounded
                    icon={{
                        name: 'user',
                        type: 'font-awesome',
                        color: 'green',
                    }}
                    source={{ uri: user.imgUrl }}
                    onPress={() => console.log('Works!')}
                    activeOpacity={0.7}
                    containerStyle={{
                        flex: 2,
                        marginLeft: 20,
                        marginTop: 10,
                        borderWidth: 1,
                        alignSelf: 'center',
                    }}
                />

                <Text style={styles.title}> {user?.fullName} </Text>
                <Card.Divider />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>Phone Number: </Text>
                    <Text>{user?.phoneNumber}</Text>
                </View>

                <Card.Divider />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>Address: </Text>
                    <Text></Text>
                </View>

                <Card.Divider />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>DOB: </Text>
                    <Text></Text>
                </View>

                <Card.Divider />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>Gender </Text>
                    <Text> {user.gender ? 'Male' : 'Female'} </Text>
                </View>

                <Card.Divider />

                <Button
                    buttonStyle={{ backgroundColor: 'red' }}
                    title="Logout"
                    onPress={() => logoutHandler()}
                />
            </Card>
            <Modal visible={isVisible} animationType="fade">
                <Card>
                    <Text> Fullname </Text>
                    <Input value={fullName} onChangeText={value => setFullname(value)} />
                    <Card.Divider />
                    <View>
                        <Picker
                            mode="dropdown"
                            selectedValue={gender ? 'Male' : 'Female'}
                            style={{ height: 50 }}
                            onValueChange={(itemValue, itemIndex) =>
                                setGender(itemValue === 'Male')
                            }>
                            <Picker.Item label="Male" value="Male" />
                            <Picker.Item label="Female" value="Female" />
                        </Picker>
                    </View>
                </Card>
                <View>
                    <Button title="OK" onPress={() => updateUserInfo()} />
                    <Button title="Cancel" onPress={() => onCancelUpdate()} />
                </View>
            </Modal>
        </ScrollView>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logoutRequest()),
    };
};
export default connect(null, mapDispatchToProps)(ProfileScreen);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        alignSelf: 'center',
    },
    separator: {
        height: 1,
        width: '100%',
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    logo: {
        width: 70,
        height: 58,
        alignSelf: 'center',
        margin: 10,
        flexDirection: 'column',
    },
    Add_Button: {
        // width: 70,
        height: 58,
        alignItems: 'center',
        margin: 10,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    touchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },
    floatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        //backgroundColor:'black'
    },
});
