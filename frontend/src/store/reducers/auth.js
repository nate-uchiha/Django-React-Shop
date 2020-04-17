import * as actionTyoes from '../actions/actionTypes'
import { updateObject } from '../utility';

const initialState = {
    token: null,
    error: null,
    loading: false,
}


/* authStart takes action and state and returns updatedObject with error as null and loding as true */

const authStart = (state, action) =>  {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

/*authSuccess takes state action returns updatedObject with token, error as null, loading as false, */
const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        error: null,
        loading: false
    });
} 

/* authFail returnrs error as action error, loading as false */
const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

/* authLogout returns token null */
const authLogout = (state, action) => {
    return updateObject(state, {
        token: null
    })
}

/* make a reducer takies state and action, switch cases based on action type  */
const authReducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTyoes.AUTH_START: return authStart(state, action);
        case actionTyoes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTyoes.AUTH_FAIL: return authFail(state, action);
        case actionTyoes.AUTH_LOGOUT: return authLogout(state, action);
        default:
            return state;
    }
}

export default authReducer;