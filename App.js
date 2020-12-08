import React from 'react';
import { Provider } from 'react-redux';

import store from './app/store';
import AppNavigator from './app/navigation/AppNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
