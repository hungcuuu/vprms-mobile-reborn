import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

const ScheduleScreen = () => {
    const [currentDay, setCurrentDay] = useState(new Date().toISOString().split('T')[0]);

    const onDayPick = (value) => {
        // props.setTime(value);
        // getTimeTable(providerId, Math.floor(new Date(value).getTime() / 1000));
        setCurrentDay(value);
    };
    return (
        <View>
            <View>
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
            </View>
        </View>
    );
};

export default ScheduleScreen;

const styles = StyleSheet.create({});
