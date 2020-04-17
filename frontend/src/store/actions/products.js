import { PROD_START, PROD_SUCCESS, PROD_FAIL } from "../actions/actionTypes";
import { productListURL } from "../../constants";
import axios from "axios";


export const prodStart = () => {
    return{
        type: PROD_START
    }
}

export const prodSuccess = (data) =>{
    return{
        type: PROD_SUCCESS,
        data: data
    }
}

export const prodFail = (error) =>{
    return {
        type: PROD_FAIL,
        error: error
    }
}

export const prodListFetch = () => {
    return dispatch => {
        dispatch(prodStart());
        axios.get(productListURL)
        .then(res => {
            dispatch(prodSuccess(res.data));
            // 1 hour expirationTime passed  
        })
        .catch(err => {
            dispatch(prodFail(err))
        })
        
    }
}