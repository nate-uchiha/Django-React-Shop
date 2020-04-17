import { PROD_START, PROD_SUCCESS, PROD_FAIL } from "../actions/actionTypes";
import { updateObject } from '../utility';

const initialState = {
    products: [],
    error: null,
    loading: false,
}


const prodStart = (state, action) =>  {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const prodSuccess = (state, action) => {
    return updateObject(state, {
        products: action.data,
        error: null,
        loading: false
    });
} 

/* authFail returnrs error as action error, loading as false */
const prodFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}


const prodReducer = (state=initialState, action) => {
    switch(action.type) {
        case PROD_START: return prodStart(state, action);
        case PROD_SUCCESS: return prodSuccess(state, action);
        case PROD_FAIL: return prodFail(state, action);
        default:
            return state;
    }
}

export default prodReducer;