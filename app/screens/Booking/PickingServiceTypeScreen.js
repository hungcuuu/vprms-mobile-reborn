import React from 'react';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const PickingServiceTypeScreen = ({ navigation }) => {
    const next = () => {
        navigation.navigate('PickingAccessoryType');
    };
    return (
        <View style={styles.container}>
            <View
                style={{
                    width: '100%',
                    margin: 8,
                }}>
                <CheckBox
                    center
                    title="Kiểm tra"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"

                    // checked={options === 'Repair' ? true : false}
                    // onPress={onRepairOption}
                />
                <CheckBox
                    center
                    title="Bảo Dưỡng"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    // checked={options === 'Maintain' ? true : false}
                    // onPress={onMaintainOption}
                />
                <CheckBox
                    center
                    title="Vệ Sinh"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    // checked={options === 'Maintain' ? true : false}
                    // onPress={onMaintainOption}
                />
                <CheckBox
                    center
                    title="Thay Thế"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    // checked={options === 'Maintain' ? true : false}
                    // onPress={onMaintainOption}
                />
            </View>

            <Button title="click" onPress={() => next()} />
        </View>
    );
};

export default PickingServiceTypeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
});
