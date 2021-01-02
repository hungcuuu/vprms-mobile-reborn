import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import moment from 'moment';

import { useSelector } from 'react-redux';
import axios from '../../axios';
import { STATUS, STATUS_TAG_COLORS } from '../../constants/index';

const OrderHistory = ({ navigation, route }) => {
    const OrderStatus = route.params?.OrderStatus ?? '';

    const user = useSelector(state => state.auth.user ?? {});
    const [historyList, setHistoryList] = useState([]);

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

    const renderHistory = history => {
        return (
            <>
                <TouchableOpacity
                    useForeground
                    onPress={
                        () =>
                            navigation.navigate('BookingDetail', {
                                detail: history,
                            })
                        // console.log("asjdkawd")
                    }>
                    <View
                        style={{
                            flexDirection: 'row',
                            borderWidth: 1,
                            padding: 8,
                            marginVertical: 8,
                            borderRadius: 10,
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                width: '70%',
                                alignItems: 'center',
                            }}>
                            <Ionicons name="md-construct" size={24} />
                            <View
                                style={{
                                    width: '100%',
                                    paddingHorizontal: 8,
                                }}>
                                <Text style={{ fontSize: 14 }}>
                                    {history.provider.providerName}
                                </Text>
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        // justifyContent: "flex-end",
                                        // alignItems: "center",
                                    }}>
                                    <View style={{ padding: 2 }}>
                                        <Ionicons name="md-calendar" size={20} />
                                    </View>
                                    <View>
                                        <Text>
                                            {moment
                                                .unix(history.bookingTime)
                                                .format('DD/MM/YYYY')}
                                        </Text>
                                    </View>
                                </View>
                                <Text>
                                    <Text
                                        style={{
                                            backgroundColor: getStatusTagColor(
                                                history.status,
                                            ),
                                            opacity: 0.7,
                                            paddingVertical: 8,
                                        }}>
                                        {history.status}
                                    </Text>
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                            }}>
                            <View style={{ zIndex: 1000 }}>
                                {history.status === 'FINISHED' && !history.feedback ? (
                                    <Button
                                        title="Feedback"
                                        onPress={() =>
                                            navigation.navigate('Feedback', {
                                                requestId: history.id,
                                            })
                                        }
                                    />
                                ) : null}
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </>
        );
    };

    useEffect(() => {
        // console.log(user);
        axios.get(`requests/users/${user.id}`).then(rs => {
            setHistoryList(rs.data);
        });
    }, [user.id]);
    return (
        <View style={styles.container}>
            <FlatList
                // refreshControl={
                //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                // }
                data={
                    OrderStatus === 'inProgress'
                        ? historyList.filter(x => x.status === 'ACCEPTED')
                        : historyList.filter(x => x.status !== 'ACCEPTED')
                }
                keyExtractor={item => item.id.toString()}
                renderItem={({ item: history }) => renderHistory(history)}
            />
            {/* <Button
                onPress={() => {
                    props.navigation.navigate('BookingScreen');
                }}
                title="Book Request"
            /> */}
        </View>
    );
};

export default OrderHistory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingVertical: 16,
        paddingHorizontal: 8,
    },
});
