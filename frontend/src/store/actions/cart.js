import { CART_SUCCESS, CART_START, CART_FAIL, ADD_TO_CART_SUCCESS } from './actionTypes';
import { authAxios } from "../../utils";
import { fetchCartURL, addToCartURL } from "../../constants";
import axios from 'axios';

//Action Creators
export const cartStart = () => {
    return{
        type: CART_START
    }
}

export const cartSuccess = (data) =>{
    return{
        type: CART_SUCCESS,
        data: data
    }
}

export const cartFail = (error) =>{
    return {
        type: CART_FAIL,
        error: error
    }
}

export const cartFetch = (token) => {
    return dispatch => {
        console.log("cart fetching///////");
        dispatch(cartStart());
        axios.defaults.headers = {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
        }        
        axios.get(fetchCartURL)
        .then(res => {
            console.log("Response after ferching cart details", res.data);
            dispatch(cartSuccess(res.data));  
        })
        .catch(err => {
            dispatch(cartFail(err))
        })
        
    }
}