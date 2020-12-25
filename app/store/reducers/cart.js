import { updateObject } from '../../utils';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    parts: {},
    serviceParts: [],
};

const fetchCart = (state, action) => {
    return updateObject(state, {
        parts: action.parts,
        serviceParts: action.serviceParts,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CART:
            return fetchCart(state, action);

        default:
            return state;
    }
};

export default reducer;
