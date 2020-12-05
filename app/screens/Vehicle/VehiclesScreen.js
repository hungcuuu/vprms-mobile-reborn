import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
const VehiclesScreen = ({ navigation }) => {
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
                      <TouchableNativeFeedback
                          key={vehicleItem.id}
                          onPress={() => navigation.navigate('VehicleDetail')}>
                          <Text>
                              {vehicleItem.name} | {vehicleItem.licensePlateNumber}
                          </Text>
                      </TouchableNativeFeedback>
                  ))
                : null}
            <View>
                <Button
                    title="ADD VEHICLE"
                    onPress={() => navigation.navigate('CreateVehicle')}
                />
            </View>
        </View>
    );
};

export default VehiclesScreen;

const styles = StyleSheet.create({});
