import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Button } from 'react-native-elements';
import { useSelector } from 'react-redux';
import axios from '../../axios';
import { toTimeString } from '../../utils';

const ScheduleScreen = ({ navigation, route }) => {
    const vehicles = useSelector((state) => state.vehicles.currentVehicle ?? []);

    const detail = route.params.detail ?? [];
    const partList = route.params.partList ?? [];
    const [currentDay, setCurrentDay] = useState(new Date().toISOString().split('T')[0]);
    const [timeList, setTimeList] = useState([]);
    const [currentEpoch, setCurrentEpoch] = useState(null);

    const bookingRequest = () => {
        if (!currentEpoch) {
            Alert.alert('Please choose time');
        } else {
            let parts = partList
                .filter((value) => !value.checked)
                .reduce(
                    (curr, prod) =>
                        Object.assign(curr, { [prod.part.id]: prod.part.quantity }),
                    {},
                );
            let serviceParts = partList
                .filter((value) => value.checked)
                .reduce(
                    (curr, prod) =>
                        Object.assign(curr, {
                            [prod.serviceId]: {
                                id: prod.part.id,
                                quantity: prod.part.quantity,
                            },
                        }),
                    {},
                );
            try {
                axios
                    .post('requests', {
                        parts: parts,
                        serviceParts: serviceParts,
                        bookingTime: currentEpoch,
                        providerId: detail.provider.id,
                        vehicleId: vehicles.id,
                        packageIds: [],
                    })
                    .then((rs) => {
                        Alert.alert('Success');
                        // console.log('booking', rs.data);
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Accessory' }],
                        });
                    });
            } catch (error) {
                Alert.alert('Fail');
            }
        }
    };
    const getTimeTable = (id, epoch) => {
        axios
            .get('providers/' + id + '/bookings/' + epoch)
            .then((rs) => setTimeList(rs.data));
    };
    const onDayPick = (value) => {
        getTimeTable(detail.provider.id, Math.floor(new Date(value).getTime() / 1000));
        setCurrentDay(value);
    };
    const renderCalendar = () => {
        return (
            <Calendar
                // style={[styles.calendar]}
                current={currentDay}
                minDate={new Date()}
                onDayPress={(day) => {
                    onDayPick(day.dateString);
                }}
                onDayLongPress={(day) => {
                    onDayPick(day.dateString);
                }}
                monthFormat={'yyyy MMMM'}
                hideExtraDays={false}
                firstDay={1}
                hideDayNames={false}
                onPressArrowLeft={(subtractMonth) => subtractMonth()}
                onPressArrowRight={(addMonth) => addMonth()}
                enableSwipeMonths={true}
                markingType="custom"
                theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#b6c1cd',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: '#000000',
                    todayTextColor: 'green',
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#d9e1e8',
                    arrowColor: 'red',
                    monthTextColor: '#00adf5',
                    indicatorColor: 'blue',
                    textDayFontFamily: 'monospace',
                    textMonthFontFamily: 'monospace',
                    textDayHeaderFontFamily: 'monospace',
                    textDayFontWeight: '300',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '300',
                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 16,
                }}
                markedDates={{
                    [currentDay]: { selected: true, selectedColor: 'red' },
                }}
            />
        );
    };

    const renderTimeTable = (time) => {
        return (
            <TouchableOpacity
                style={{
                    borderWidth: 1,
                    justifyContent: 'center',
                    flex: 1,
                    height: 100,
                    alignItems: 'center',
                    backgroundColor:
                        time.beginTime === currentEpoch
                            ? 'yellow'
                            : time.isUnavailable
                            ? 'red'
                            : '#03fc7b',
                }}
                disabled={time.isUnavailable}
                onPress={() => {
                    setCurrentEpoch(time.beginTime);
                }}>
                <View>
                    <Text style={{ fontSize: 15 }}>{toTimeString(time.beginTime)}</Text>
                </View>
            </TouchableOpacity>
        );
    };
    useEffect(() => {
        getTimeTable(
            detail.provider.id,
            Math.floor(new Date(currentDay).getTime() / 1000),
        );
    }, []);
    return (
        <View style={{ flex: 1, padding: 8 }}>
            <View>{renderCalendar()}</View>
            {/* <View
                style={{
                    borderWidth: 1,
                    flexDirection: 'row',
                    height: '50%',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    // padding: 100,
                }}> */}
            <FlatList
                data={timeList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item: time }) => renderTimeTable(time)}
                numColumns={3}
            />
            {/* </View> */}
            <Button title="Book now" onPress={() => bookingRequest()} />
        </View>
    );
};

export default ScheduleScreen;

const styles = StyleSheet.create({});
