import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import axios from '../../axios';

const Orders = () => {
    // const userId = useSelector((state) => state.users.services ?? []);

    const [request, setRequest] = useState([]);

    useEffect(() => {
        axios.get('requests/users/24').then((rs) => setRequest(rs.data));
    }, []);
    return (
        <View>
            <Text>aa</Text>
        </View>
    );
};

export default Orders;

const styles = StyleSheet.create({});
