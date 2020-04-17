import React from 'react';
import { Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Input,
  Menu,
  Segment } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../store/actions/auth";
import { cartFetch } from "../store/actions/cart";
import { withError } from 'antd/lib/modal/confirm';

class CustomLayout extends React.Component {
  state = { activeItem: 'home' }
  
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    if(name=="home"){
      this.props.history.push("/");
    }
    else {
      this.props.history.push(`/${name}/`);
    }
  }
  
  componentDidMount(){
    if(this.props.isAuthenticated){
      this.props.fetchCart(this.props.token);
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.isAuthenticated){     
      if( prevProps.token !== this.props.token ) {
        this.props.fetchCart(this.props.token);
      }
    }
    
  }

  render() {
    const { isAuthenticated, cart, loading } = this.props;
    const { activeItem } = this.state
    return (
      <Container>
        <Menu secondary>
            <Menu.Item
              name="home"
              active={activeItem === 'home'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='products'
              active={activeItem === 'products'}
              onClick={this.handleItemClick}
            />
          {
            isAuthenticated?
            (
              <Menu.Item
                name='logout'
                active={activeItem === 'logout'}
                onClick={() => this.props.Logout()}
              />
            ):
            (
              <React.Fragment>
                <Menu.Item
                  name='login'
                  active={activeItem === 'login'}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name='register'
                  active={activeItem === 'register'}
                  onClick={this.handleItemClick}
                />
              </React.Fragment>              
            )
          }
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
          </Menu.Menu>
          <Menu.Menu position="right">
            <Dropdown icon='cart' loading={loading} text={`${cart!==null? cart.order_items.length: 0}` } pointing className='link item'>
              <Dropdown.Menu>
                {cart && cart.order_items.map(order_item => {
                  return(
                    <Dropdown.Item key={order_item.id} text={`${order_item.item} x ${order_item.quantity}`} /> 
                  )
                })}
                {cart && cart.order_items.length < 1 ? <Dropdown.Item>No Items in your cart</Dropdown.Item> : null}
                <Dropdown.Divider />
                <Dropdown.Item icon="arrow right" text="Checkout" name="order-summary" onClick={this.handleItemClick} />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Menu>
        <Segment>
          {this.props.children}
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    loading: state.cart.loading,
    error: state.cart.error,
    cart: state.cart.shoppingCart
  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    Logout: () => dispatch(actions.logout()),
    fetchCart: (token) => dispatch(cartFetch(token))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchtoProps)(CustomLayout));