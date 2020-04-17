import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import 'semantic-ui-css/semantic.min.css'

import authReducer from "./store/reducers/auth";
import cartReducer from "./store/reducers/cart";
import prodReducer from "./store/reducers/products";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPISE__ || compose; 

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  prod: prodReducer
})

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)))

const app = (
  <Provider store = {store} >
    <App />
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
