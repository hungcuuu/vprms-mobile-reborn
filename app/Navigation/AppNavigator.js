import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { AuthNavigator, HomeNavigator } from './MainNavigator';

const AppNavigator = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);

  return (
    <NavigationContainer>
      {isAuth ? <HomeNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
