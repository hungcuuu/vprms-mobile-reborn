import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import { AuthNavigator, SideDrawer } from './MainNavigator';
import * as actions from '../app/store/actions';

const AppNavigator = props => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.auth.user);

    useEffect(() => {
        if (userData) {
            dispatch(actions.fetchVehicles(userData.id));
        }
    }, [dispatch, userData]);

    return (
        <NavigationContainer>
            <AuthNavigator />
        </NavigationContainer>
    );
};

export default AppNavigator;
