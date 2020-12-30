import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistReducer from 'redux-persist/es/persistReducer';

import authReducer from './auth';
import servicesReducer from './services';
import vehiclesReducer from './vehicles';
import requestsReducer from './requests';
import cartReducer from './cart';

const authPersistConfig = {
    key: 'auth',
    storage: AsyncStorage,
    blacklist: ['loading'],
};

const vehiclesPersistConfig = {
    key: 'vehicles',
    storage: AsyncStorage,
    whitelist: ['vehicles'],
};

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    services: servicesReducer,
    vehicles: persistReducer(vehiclesPersistConfig, vehiclesReducer),
    request: requestsReducer,
    cart: cartReducer,
});

export default rootReducer;
