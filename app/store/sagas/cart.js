import { put, takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions';

function* fetchCart(action) {
    try {
        yield put(actions.fetchCart({ parts: 1, serviceParts: 2 }));
    } catch (error) {
        console.log(error);
    }
}

export default function* cartSagas() {
    yield takeEvery(actionTypes.FETCH_CART, fetchCart);
}
