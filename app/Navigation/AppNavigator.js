import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import { AuthNavigator, HomeNavigator, SideDrawer } from './MainNavigator';
import * as actions from '../store/actions';

const AppNavigator = (props) => {
    const isAuth = useSelector((state) => !!state.auth.token);
    const dispatch = useDispatch();
    dispatch(actions.fetchVehicles('1'));

    return (
        <NavigationContainer>
            <SideDrawer />
        </NavigationContainer>
    );
};

export default AppNavigator;
