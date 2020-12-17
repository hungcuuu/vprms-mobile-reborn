import { combineReducers } from 'redux';

import authReducer from './auth';
import servicesReducer from './services';
import vehiclesReducer from './vehicles';
import requestsReducer from './requests';

const rootReducer = combineReducers({
    auth: authReducer,
    services: servicesReducer,
    vehicles: vehiclesReducer,
    request: requestsReducer,
});

export default rootReducer;
