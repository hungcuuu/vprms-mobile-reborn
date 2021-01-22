import React, { useEffect } from 'react';
import { Alert, Button, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import moment from 'moment';

import { STATUS, STATUS_TAG_COLORS } from '../../constants';
import {
    calculatePackagePrice,
    calculateServicePrice,
    formatMoney,
} from '../../utils/index';
import axios from '../../axios';
import { useCallback } from 'react';
const BookingDetail = ({ navigation, route }) => {
    const detail = route.params?.detail ?? {};
    console.log('time', detail.bookingTime);
    // console.log('now', moment.now().toLocaleString());
    console.log('now', moment.unix(detail.bookingTime).toNow(true));

    const totalServicePrice = calculateServicePrice(
        detail.services.filter(ser => ser.isActive),
    );
    const totalPackagePrice = calculatePackagePrice(detail.packages);

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
            case STATUS.CONFIRMED:
                return STATUS_TAG_COLORS.Confirm;
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
                                    part.imageUrls[0] ??
                                    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/240px-No_image_available.svg.png',
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
                            }}>{`x ${part.quantity ?? 0}`}</Text>
                        <Text>{` ${formatMoney(part.price)}`}</Text>
                    </View>
                </View>
            </>
        );
    };
    const renderServices = service => {
        const totalPrice =
            service.servicePrice +
            service.parts.reduce(
                (accumulated, part) => accumulated + part.price * part.quantity,
                0,
            );
        return (
            // ${formatMoney(service.price)}
            <>
                <View
                    style={{
                        borderWidth: 1,
                        marginVertical: 5,
                        borderRadius: 8,
                        padding: 8,
                    }}>
                    <View
                        style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 14,
                                fontWeight: 'bold',
                                // borderWidth: 1,
                            }}>
                            {`${service.serviceName} `}
                        </Text>
                        {!service.isActive ? (
                            <Text style={{ color: 'red', fontWeight: 'bold' }}>
                                Canceled
                            </Text>
                        ) : (
                            <Text style={{ color: 'black', fontWeight: 'bold' }}>
                                {`${formatMoney(totalPrice)}`}
                            </Text>
                        )}
                    </View>

                    <FlatList
                        // listKey={`${moment.unix.toString()}`}
                        data={[
                            ...(service.parts ?? []),
                            {
                                partId: 0,
                                partName: 'Wages',
                                quantity: 1,
                                imageUrls: [],
                                price: service.servicePrice,
                            },
                        ]}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item: part }) => renderParts(part)}
                        scrollEnabled={false}
                        nestedScrollEnabled={false}
                    />
                </View>
            </>
        );
    };
    const renderPackages = packages => {
        const totalPrice = packages.services.reduce(
            (accumulated, service) =>
                accumulated +
                service.servicePrice +
                service.parts.reduce(
                    (accumulated, part) => accumulated + part.price * part.quantity,
                    0,
                ),
            0,
        );
        return (
            // ${formatMoney(service.price)}
            <>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 8,
                    }}>
                    <Text
                        style={{
                            color: 'black',
                            // fontSize: 13,
                            // fontWeight: 'bold',
                        }}>{`${packages.packageName} `}</Text>
                    <Text
                        style={{
                            color: 'black',
                            // fontSize: 15,
                            // fontWeight: 'bold',
                        }}>{`${formatMoney(totalPrice)} `}</Text>
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
        let a = moment.unix(detail.bookingTime).toNow(true);
        let b = +a.substr(0, a.indexOf(' '));
        detail.status === 'ACCEPTED' && b >= 4
            ? navigation.setOptions({
                  headerRight: () => (
                      <Button
                          title="Cancel"
                          color="red"
                          onPress={() => onCancel(detail.id)}
                      />
                  ),
              })
            : null;
    }, [detail.bookingTime, detail.id, detail.status, navigation, onCancel]);
    useEffect(() => {
        navigation.setOptions({ headerTitle: `request #${detail.id}` });
    }, [detail, detail.id, navigation]);

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
                        <Text
                            style={{
                                color: 'green',
                                fontSize: 18,
                                fontWeight: 'bold',
                            }}>
                            Services:
                        </Text>
                    </>
                }
                ListFooterComponent={
                    <>
                        <FlatList
                            data={detail.packages ?? []}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item: packages }) => renderPackages(packages)}
                            initialNumToRender={3}
                            showsVerticalScrollIndicator={false}
                            nestedScrollEnabled
                            ListHeaderComponent={
                                <>
                                    {detail.packages.length > 0 ? (
                                        <Text
                                            style={{
                                                color: '#999900',
                                                fontSize: 18,
                                                fontWeight: 'bold',
                                            }}>
                                            Maintenance-Packages:
                                        </Text>
                                    ) : null}
                                </>
                            }
                            ListFooterComponent={
                                <>
                                    <FlatList
                                        ListHeaderComponent={
                                            <>
                                                {detail.services.filter(
                                                    ser => ser.isIncurred,
                                                ).length > 0 ? (
                                                    <Text
                                                        style={{
                                                            color: 'red',
                                                            fontSize: 18,
                                                            fontWeight: 'bold',
                                                        }}>
                                                        Expense:
                                                    </Text>
                                                ) : null}
                                            </>
                                        }
                                        data={
                                            detail.services.filter(
                                                ser => ser.isIncurred,
                                            ) ?? []
                                        }
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item: ser }) =>
                                            renderServices(ser)
                                        }
                                        initialNumToRender={3}
                                        showsVerticalScrollIndicator={false}
                                        nestedScrollEnabled
                                    />
                                </>
                            }
                        />
                        <View
                            style={{
                                marginVertical: 8,
                                borderTopWidth: 1,
                            }}>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    alignSelf: 'flex-end',
                                }}>{`Service Price: ${formatMoney(
                                totalServicePrice.total,
                            )}`}</Text>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    alignSelf: 'flex-end',
                                }}>{`Package Price: ${formatMoney(
                                totalPackagePrice.total,
                            )}`}</Text>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    alignSelf: 'flex-end',
                                }}>{`Total: ${formatMoney(
                                totalServicePrice.total + totalPackagePrice.total,
                            )} `}</Text>
                        </View>
                    </>
                }
                data={detail.services.filter(ser => !ser.isIncurred) ?? []}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item: service }) => renderServices(service)}
                initialNumToRender={3}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled
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
