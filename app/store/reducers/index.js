import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistReducer from 'redux-persist/es/persistReducer';

import authReducer from './auth';
import servicesReducer from './services';
import vehiclesReducer from './vehicles';
import cartReducer from './cart';

const authPersistConfig = {
    key: 'auth',
    storage: AsyncStorage,
    blacklist: ['loading', 'error'],
};

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    services: servicesReducer,
    vehicles: vehiclesReducer,
    cart: cartReducer,
});

export default rootReducer;
