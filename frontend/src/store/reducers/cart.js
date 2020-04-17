import { CART_SUCCESS, CART_START, CART_FAIL, ADD_TO_CART_SUCCESS } from '../actions/actionTypes'
import { updateObject } from '../utility';

const initialState = {
    shoppingCart: null,
    error: null,
    loading: false,
}


const cartStart = (state, action) =>  {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const cartSuccess = (state, action) => {
    return updateObject(state, {
        shoppingCart: action.data,
        error: null,
        loading: false
    });
} 

/* authFail returnrs error as action error, loading as false */
const cartFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}


const cartReducer = (state=initialState, action) => {
    switch(action.type) {
        case CART_START: return cartStart(state, action);
        case CART_SUCCESS: return cartSuccess(state, action);
        case CART_FAIL: return cartFail(state, action);
        default:
            return state;
    }
}

export default cartReducer;