import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

const ReviewScreen = ({ navigation, route }) => {
    return (
        <View>
            <View>
                <View>
                    <Text>Garage Hung</Text>
                </View>
                <View>
                    <Text>Address: A33/33</Text>
                </View>
            </View>
            <View>
                <View>
                    <View>
                        <Text>SERVICE 1</Text>
                    </View>
                    <View>
                        <Text>Tên phụ tùng</Text>
                        <Text>Tên phụ tùng</Text>
                    </View>
                </View>
            </View>
            <View>
                <Button title="Next" onPress={() => navigation.navigate('Schedule')} />
            </View>
        </View>
    );
};

export default ReviewScreen;

const styles = StyleSheet.create({});
