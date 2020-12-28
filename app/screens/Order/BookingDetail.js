import React, { useEffect } from 'react';
import {
    Alert,
    Button,
    FlatList,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Card } from 'react-native-elements';
import moment from 'moment';
import { STATUS, STATUS_TAG_COLORS } from '../../constants';
import { calculateRequestPrice, formatMoney } from '../../utils/index';
import axios from '../../axios';
const BookingDetail = ({ navigation, route }) => {
    const detail = route.params?.detail ?? {};
    const getStatusTagColor = status => {
        switch (status) {
            case STATUS.Accepted:
                return STATUS_TAG_COLORS.Accepted;
            case STATUS.Arrived:
                return STATUS_TAG_COLORS.Arrived;
            case STATUS.InProgress:
                return STATUS_TAG_COLORS.InProgress;
            case STATUS.Canceled:
                return STATUS_TAG_COLORS.Canceled;
            case STATUS.WorkCompleted:
                return STATUS_TAG_COLORS.WorkCompleted;
            case STATUS.Finished:
                return STATUS_TAG_COLORS.Finished;
        }
    };
    const renderParts = part => {
        return (
            <>
                <View>
                    <Text>{`${part.partName} ${part.priceEach} x ${part.quantity}  `}</Text>
                    <Text></Text>
                </View>
            </>
        );
    };
    const renderServices = service => {
        return (
            <>
                <View style={{ borderWidth: 1 }}>
                    <Text>{`${service.serviceName} ${service.price}`}</Text>
                    <FlatList
                        data={service.parts ?? []}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item: part }) => renderParts(part)}
                    />
                </View>
            </>
        );
    };
    const cancelBooking = id => {
        return axios.delete('requests/' + id).then(res =>
            // setCurrentBooking(res.data)
            {
                if (res.status == 200) {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Order' }],
                    });
                }
            },
        );
    };
    const onCancel = id => {
        Alert.alert('', 'Do u want to Cancel this request?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => {
                    cancelBooking(id);
                },
            },
        ]);
    };
    useEffect(() => {
        detail.status === 'ACCEPTED'
            ? navigation.setOptions({
                  headerRight: () => (
                      <Button title="Cancel" onPress={() => onCancel(detail.id)} />
                  ),
              })
            : null;
    }, []);
    useEffect(() => {
        navigation.setOptions({ headerTitle: `request #${detail.id}` });
        console.log(detail);
    }, []);
    return (
        <ScrollView style={styles.container}>
            <View>
                <Text>{`${detail.provider.providerName}`}</Text>
                <Text>{`Address: ${detail.provider.address}`}</Text>
            </View>
            <Card.Divider />
            <View>
                <Text>{`Booking Date: ${moment
                    .unix(detail.bookingTime)
                    .format('DD/MM/YYYY')}`}</Text>
            </View>
            <Card.Divider />

            <View>
                <Text>
                    <Text
                        style={{
                            backgroundColor: getStatusTagColor(detail.status),
                            opacity: 0.7,
                            paddingVertical: 8,
                        }}>
                        {`${detail.status}`}
                    </Text>
                </Text>
            </View>
            <Card.Divider />

            <View>
                <Text>{`${detail.userVehicle?.modelName ?? ''} ${detail.userVehicle
                    ?.modelYear ?? ''}`}</Text>
                <Text>{`PlateNumber ${detail.userVehicle?.plateNumber ?? ''}`}</Text>
            </View>

            <Card.Divider />
            <View style={{ borderWidth: 1 }}>
                <Text>{`Technician: ${detail.technician?.fullname ?? 'none'}`}</Text>
                <View
                    style={{
                        borderWidth: 1,
                        height: 200,
                        width: '50%',
                    }}>
                    <Image
                        resizeMethod="resize"
                        resizeMode="cover"
                        source={{
                            uri:
                                detail.technician?.imageUrl ??
                                'https://i.vimeocdn.com/portrait/58832_300x300.jpg',
                            height: '100%',
                            width: '100%',
                        }}
                        style={{ width: '100%', height: '100%' }}
                    />
                </View>
            </View>
            <View style={{ borderWidth: 1 }}>
                <FlatList
                    data={detail.services ?? []}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item: service }) => renderServices(service)}
                />
            </View>
            <View style={{ height: 100 }}>
                <Text>Total: {formatMoney(calculateRequestPrice(detail).total)}</Text>
            </View>
        </ScrollView>
    );
};

export default BookingDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingVertical: 16,
        paddingHorizontal: 8,
    },
});
