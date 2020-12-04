import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions';

const ServicesScreen = () => {
    const dispatch = useDispatch();
    const services = useSelector((state) => state.services.services ?? []);

    useEffect(() => {
        dispatch(actions.fetchServices());
    }, []);
    return (
        <View>
            {services.map((ser) => (
                <Text key={ser.id}>{ser.name}</Text>
            ))}
        </View>
    );
};

export default ServicesScreen;

const styles = StyleSheet.create({});
