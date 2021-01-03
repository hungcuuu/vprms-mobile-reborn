import React, { useEffect } from 'react';
import { Alert, Button, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import moment from 'moment';

import { STATUS, STATUS_TAG_COLORS } from '../../constants';
import { calculateRequestPrice, formatMoney } from '../../utils/index';
import axios from '../../axios';
import { useCallback } from 'react';
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
                <View
                    style={{
                        flex: 1,
                        // borderWidth: 1,
                        marginHorizontal: 8,
                        marginVertical: 4,
                        flexDirection: 'row',
                        // justifyContent: 'space-between',
                    }}>
                    <View
                        style={{
                            // borderWidth: 1,
                            minHeight: 70,
                            width: '20%',
                        }}>
                        <Image
                            resizeMethod="resize"
                            resizeMode="contain"
                            source={{
                                uri:
                                    part.partImageUrls[0] ??
                                    'https://i.vimeocdn.com/portrait/58832_300x300.jpg',
                                height: '100%',
                                width: '100%',
                            }}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </View>

                    <View style={{ width: '80%' }}>
                        <Text>{` ${part.partName}   `}</Text>
                        <Text
                            style={{
                                width: '100%',
                                textAlign: 'right',
                            }}>{`x ${part.quantity}`}</Text>
                        <Text>{` ${formatMoney(part.priceEach)}`}</Text>
                    </View>
                </View>
            </>
        );
    };
    const renderServices = service => {
        return (
            // ${formatMoney(service.price)}
            <>
                <View style={{}}>
                    <Text
                        style={{
                            color: 'red',
                            fontSize: 18,
                            fontWeight: 'bold',
                        }}>{`${service.serviceName} `}</Text>
                    <FlatList
                        data={service.parts ?? []}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item: part }) => renderParts(part)}
                    />
                </View>
            </>
        );
    };
    const cancelBooking = useCallback(
        id => {
            axios.delete('requests/' + id).then(res =>
                // setCurrentBooking(res.data)
                {
                    if (res.status === 200) {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Order' }],
                        });
                    }
                },
            );
        },
        [navigation],
    );
    const onCancel = useCallback(
        id => {
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
        },
        [cancelBooking],
    );
    useEffect(() => {
        detail.status === 'ACCEPTED'
            ? navigation.setOptions({
                  headerRight: () => (
                      <Button title="Cancel" onPress={() => onCancel(detail.id)} />
                  ),
              })
            : null;
    }, [detail.id, detail.status, navigation, onCancel]);
    useEffect(() => {
        navigation.setOptions({ headerTitle: `request #${detail.id}` });
        // console.log(detail.services[0].parts);
    }, [detail.id, navigation]);
    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={
                    <>
                        <View style={{ alignSelf: 'center' }}>
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                }}>{`${detail.provider.providerName}`}</Text>
                        </View>

                        <View>
                            {/* <Text>Address:</Text> */}
                            <Text>{`${detail.provider.address}`}</Text>
                        </View>
                        <Card.Divider />
                        <View style={styles.rowInfo}>
                            <Text>Booking Date:</Text>
                            <Text>{` ${moment
                                .unix(detail.bookingTime)
                                .format('DD/MM/YYYY')}`}</Text>
                        </View>
                        <Card.Divider />

                        <View style={styles.rowInfo}>
                            <Text>Status</Text>
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
                            <View style={styles.rowInfo}>
                                <Text>Model:</Text>
                                <Text>{`${detail.userVehicle?.modelName ?? ''} ${detail
                                    .userVehicle?.modelYear ?? ''}`}</Text>
                            </View>
                            <View style={styles.rowInfo}>
                                <Text>PlateNumber:</Text>
                                <Text>{` ${detail.userVehicle?.plateNumber ?? ''}`}</Text>
                            </View>
                        </View>

                        <Card.Divider />
                        <View style={styles.rowInfo}>
                            <Text>Technician:</Text>
                            <Text>{` ${detail.technician?.fullname ?? 'none'}`}</Text>
                        </View>
                    </>
                }
                ListFooterComponent={
                    <>
                        <View
                            style={{
                                marginVertical: 8,
                                borderTopWidth: 1,
                            }}>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    alignSelf: 'flex-end',
                                }}>{`Service: ${formatMoney(
                                calculateRequestPrice(detail).services,
                            )}`}</Text>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    alignSelf: 'flex-end',
                                }}>{`Parts Price: ${formatMoney(
                                calculateRequestPrice(detail).partsPrice,
                            )}`}</Text>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    alignSelf: 'flex-end',
                                }}>{`Total: ${formatMoney(
                                calculateRequestPrice(detail).total,
                            )}`}</Text>
                        </View>
                    </>
                }
                data={detail.services ?? []}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item: service }) => renderServices(service)}
                initialNumToRender={3}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default BookingDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 16,
        paddingHorizontal: 8,
    },
    rowInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 8,
        marginHorizontal: 10,
        paddingHorizontal: 8,
        // alignItems: 'center',
    },
});
