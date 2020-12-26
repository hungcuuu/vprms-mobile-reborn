import { combineReducers } from 'redux';

import authReducer from './auth';
import servicesReducer from './services';
import vehiclesReducer from './vehicles';
import requestsReducer from './requests';
import cartReducer from './cart';

const rootReducer = combineReducers({
    auth: authReducer,
    services: servicesReducer,
    vehicles: vehiclesReducer,
    request: requestsReducer,
    cart: cartReducer,
});

export default rootReducer;
