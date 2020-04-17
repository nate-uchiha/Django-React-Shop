import * as actionTypes from './actionTypes';
import axios from 'axios';

//Action Creators
export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token) =>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = (error) =>{
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

// to logout the user
export const logout = () => {
    // removing expirationTime and token from Browser's localStorage
    
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
} 

// method to logout the user after expirationTime that is passed 
const checkAuthTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 10000)
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        // start auhtemtication
        dispatch(authStart());
        //post request to login
        axios.defaults.headers = {
            "Content-Type": "application/json"
        }
        axios.post("http://127.0.0.1:8000/rest-auth/login/", {
            username: username,
            password: password
        })
        .then(res => {
            const token = res.data.key;
            const expirarationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem("token", token);
            localStorage.setItem("expirarationDate", expirarationDate);
            // storing token and expirationTime in localStorage of Browser
            // Authentication Sucessfull
            
            dispatch(authSuccess(token));
            // 1 hour expirationTime passed 
            
            dispatch(checkAuthTimeOut(3600)); 
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}


export const authSignUp = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart);
        
        axios.post("http://127.0.0.1:8000/rest-auth/registration/", {
            username: username,
            email: email,
            password1: password1,
            password2: password2,

        })
        .then(res => {
            const token = res.data.key;
            const expirarationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('expirarationDate', expirarationDate)
            localStorage.setItem('token', token);
            
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeOut(3600)); 
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authCheckState = () => {
    
    return dispatch => {
        const token = localStorage.getItem('token');
        if(token === undefined || token === null){
            dispatch(logout());
        }else{
            const expirarationDate = new Date(localStorage.getItem('expirarationDate'));
            if ( expirarationDate <= new Date() ){
                dispatch(logout());
            }
            else {
                dispatch(authSuccess(token));
                const var1 = (expirarationDate.getTime() - new Date().getTime()) / 1000
                dispatch(checkAuthTimeOut((expirarationDate.getTime() - new Date().getTime()) / 1000 ))
            }
        }
    }
}