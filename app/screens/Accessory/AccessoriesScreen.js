import React, { useState } from 'react';
import {
    Button,
    Dimensions,
    FlatList,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { ACCESSORIES } from '../../data/accessories';

const AccessoriesScreen = ({ navigation, route }) => {
    const accessoryType = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const closeModal = () => {
        setModalVisible(false);
    };
    const openModal = () => {
        setModalVisible(true);
    };
    const renderAccessoriesList = (itemData) => (
        <TouchableOpacity onPress={() => openModal()} style={styles.items}>
            <View
                style={{
                    borderWidth: 1,
                    // flex: 1,
                    height: 80,
                    width: '100%',
                }}>
                <Image
                    resizeMethod="resize"
                    resizeMode="cover"
                    source={{
                        uri: 'https://i.vimeocdn.com/portrait/58832_300x300.jpg',
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
                        // maxWidth: 100,
                    }}>
                    {' '}
                    {itemData.item.NAME}{' '}
                </Text>
            </View>
        </TouchableOpacity>
    );
    const renderAccessoryDetail = (
        <Modal
            style={{ width: '100%', borderWidth: 1 }}
            supportedOrientations
            animationType="fade"
            onSwipeComplete={() => closeModal()}
            swipeThreshold={100}
            transparent={true}
            swipeDirection={('up', 'down')}
            visible={modalVisible}
            onAccessibilityEscape
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Detail</Text>

                    <Button
                        title="Book now"
                        onPress={() => {
                            closeModal(), navigation.navigate('ProviderAccessories');
                        }}
                    />
                    <Button
                        title="close"
                        style={{
                            ...styles.openButton,
                            backgroundColor: '#2196F3',
                        }}
                        onPress={() => {
                            closeModal();
                        }}
                    />
                </View>
            </View>
        </Modal>
    );
    return (
        <View style={styles.container}>
            <View style={styles.itemsContainer}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={ACCESSORIES}
                    keyExtractor={(item, index) => index}
                    renderItem={renderAccessoriesList}
                    numColumns={2}
                />
            </View>
            {renderAccessoryDetail}
        </View>
    );
};

export default AccessoriesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
        // flexDirection: '',
        // flexWrap: 'nowrap',
    },
    items: {
        borderWidth: 1,
        width: Dimensions.get('screen').width * 0.4,
        height: 100,
        margin: 10,
        alignItems: 'center',
    },
    itemsContainer: {
        // flex: 1,

        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        alignContent: 'center',
        alignItems: 'center',
        // borderWidth: 2,
        borderColor: 'red',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        // height: 500,
        // width: '100%',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        height: '100%',
        width: '100%',
    },
});
