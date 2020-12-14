import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';

const AccessoryServicesScreen = ({ navigation, route }) => {
    return (
        <View>
            <View>
                <View>
                    <Text>ITEM 1</Text>
                </View>
                <View>
                    <CheckBox
                        // key={itemData.item.ID}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        title={'SERVICE 1'}
                        // checked={
                        //     selectedAccessories.findIndex(
                        //         (s) => s.ID === itemData.item.ID,
                        //     ) > -1
                        // }

                        // onPress={() => onSelectAccessoriesChecked(itemData.item)}
                    />
                </View>
            </View>

            <View>
                <View>
                    <Text>ITEM 2</Text>
                </View>
                <View>
                    <Text>SERVICE 3</Text>
                    <Text>SERVICE 4</Text>
                </View>
            </View>

            <View>
                <Button title="Next" onPress={() => navigation.navigate('Review')} />
            </View>
        </View>
    );
};

export default AccessoryServicesScreen;

const styles = StyleSheet.create({});
