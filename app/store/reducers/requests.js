import { updateObject } from '../../utils';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    services: [],
    parts: [],
    bookingTime: 0,
    note: '',
    provider: '',
    vehicle: null,
    user: null,
};

// const updateBookingFormSuccess = (state, action) => {
//     return updateObject(state, {
//         form: action.form,
//     });
// };

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // case actionTypes.UPDATE_BOOKING_FORM_SUCCESS:
        //     return updateBookingFormSuccess(state, action);

        default:
            return state;
    }
};

export default reducer;
