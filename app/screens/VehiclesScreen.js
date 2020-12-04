import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions';
const VehiclesScreen = () => {
    const dispatch = useDispatch();
    const vehicles = useSelector((state) => state.vehicles.vehicles ?? []);

    useEffect(() => {
        dispatch(actions.fetchVehicles());
    }, []);
    return (
        <View>
            <Text>Vehicle Screen</Text>
            {vehicles
                ? vehicles.map((vehicleItem) => (
                      <Text key={vehicleItem.id}>{vehicleItem.name}</Text>
                  ))
                : null}
        </View>
    );
};

export default VehiclesScreen;

const styles = StyleSheet.create({});
