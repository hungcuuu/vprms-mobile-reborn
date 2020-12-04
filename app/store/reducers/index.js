import { combineReducers } from 'redux';

import authReducer from './auth';
import servicesReducer from './services';
const rootReducer = combineReducers({
    auth: authReducer,
    services: servicesReducer,
});

export default rootReducer;
