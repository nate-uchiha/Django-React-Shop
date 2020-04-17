import React from "react";
import { connect } from "react-redux";
import { Button, Header, Container, Icon, Label, Menu, Table } from 'semantic-ui-react';
import { cartFetch } from "../store/actions/cart";

class OrderSummary extends React.Component{
  componentDidMount(){
    console.log("Component Mounted!!!!!!!!!!!!!!!");
    this.props.fetchCart(this.props.token)
    
  }  
  render(){

    const {cart, error, loading} = this.props;
    console.log("Cart in Order Summary", cart);
    
    return(
      <Container>
        <Header as="h3">OrderSummary</Header>
        {
          cart && <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Item #</Table.HeaderCell>
                <Table.HeaderCell>Item name</Table.HeaderCell>
                <Table.HeaderCell>Item Price</Table.HeaderCell>
                <Table.HeaderCell>Item Quantity</Table.HeaderCell>
                <Table.HeaderCell>Total Items Price</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {cart.order_items.map(order_item => {
                return(
                  <Table.Row key={order_item.id}>
                    <Table.Cell>{order_item.id}</Table.Cell>
                    <Table.Cell>{order_item.item}</Table.Cell>
                    <Table.Cell>${order_item.item_obj.price}</Table.Cell>
                    <Table.Cell>{order_item.quantity}</Table.Cell>
                    <Table.Cell>{order_item.item_obj.discount_price && (
                      <Label color="green" ribbon>ON DISCOUNT</Label>
                    )}
                    ${order_item.final_price}</Table.Cell>
                  </Table.Row>
                )
              })}
              <Table.Row>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
            <Table.Cell>Total ${cart.total}</Table.Cell>
              </Table.Row>
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell textAlign="right" colSpan='5'>
                  <Button color="yellow"> CheckOut </Button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        }
      </Container>
    )
  }
}

const mapStateToProps = state => {
  console.log("State in Order Summary: ", state.cart)
  return {
    token: state.auth.token,
    cart: state.cart.shoppingCart,
    error: state.cart.error,
    loading: state.cart.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: (token) => dispatch(cartFetch(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary)