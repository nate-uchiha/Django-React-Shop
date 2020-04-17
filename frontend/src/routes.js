import React from 'react';
import { Route } from 'react-router-dom';
import WrappedNormalLoginForm from './containers/Login';
import RegistrationForm from './containers/Signup';
import ProductList from "./containers/ProductList";
import OrderSummary from "./containers/OrderSummary";


const BaseRouter = () => (    
    <div>
        <Route exact path='/login/' component={ WrappedNormalLoginForm } />
        <Route exact path='/register/' component = {RegistrationForm} />
        <Route exact path='/products' component = { ProductList } />
        <Route exact path='/order-summary/' component = { OrderSummary } />
    </div>
);

export default BaseRouter;