import React from "react";
import { connect } from "react-redux";
import { List, message, Descriptions, Avatar, Spin, Card, Button, Row, Col } from 'antd';
import {Content, Container} from 'semantic-ui-react';
import { ShoppingCartOutlined } from "@ant-design/icons";
import '../components/style.css' ;
import axios from 'axios';
import { cartFetch, addToCart } from "../store/actions/cart";
import { prodListFetch } from "../store/actions/products";
import { addToCartURL } from "../constants";

import InfiniteScroll from 'react-infinite-scroller';

const { Meta } = Card;

class ProductList extends React.Component {
    
    componentDidMount() {
        this.props.prodListFetch();
    }

    componentDidUpdate(prevProps){
        if(prevProps.data.length != this.props.data.length){
            this.props.prodListFetch();
        }
    }

    handleAddToCart = slug => {
        if( this.props.token !== null ){
            axios.defaults.headers = {
                "Authorization": `Token ${this.props.token}`,
                "Content-Type": "application/json"
            }
            axios.post(addToCartURL, {
                "slug": slug
            })
            .then(res => {
                this.props.cartFetch(this.props.token);
            })
            .catch(error => {
                message.error(error.message);
            })
        }
        else{
            this.props.history.push('/login/'); 
        }
        
    }

    render() {
        const IconText = ({ icon, text }) => (
            <span>
              {React.createElement(icon, { style: { marginRight: 8 } })}
              {text}
            </span>
        );
        
        return (
            <Container>
            {
                this.props.error === null?
                (
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                        onChange: page => {
                        },
                        pageSize: 3,
                        }}
                        dataSource={this.props.data}
                        renderItem={item => (
                        <List.Item
                            key={item.id}
                            extra={
                            <img
                                width={272}
                                alt="logo"
                                src={item.image}
                            />
                            }
                        >
                            <List.Item.Meta
                            title={item.title}
                            description={item.description}
                            />
                            <Descriptions title="Product Info">
                                <Descriptions.Item label="Price">{item.price}</Descriptions.Item>
                                <Descriptions.Item label="Category">{item.category}</Descriptions.Item>
                                <Descriptions.Item label="Label">{item.label}</Descriptions.Item>
                            </Descriptions>
                            <Button type="primary" onClick={() =>this.handleAddToCart(item.slug)}>Add To Cart <ShoppingCartOutlined /></Button>
                        </List.Item>
                        )}
                    />
                ):
                (
                    <h2>{this.props.error.message}</h2>
                )
            }
            </Container>

        );
    }
}

const mapStateToProps = state => {
    console.log("State in PRODLIST: ", state.cart);
    
    return {
        loading: state.prod.loading,
        error: state.prod.error,
        data: state.prod.products,
        token: state.auth.token,
        cart_loading: state.cart.loading,
        cart_error: state.cart.error,
        status: state.cart.status
    }
}
const mapDispatchToProps = dispatch => {
    return {
        cartFetch: (token) => dispatch(cartFetch(token)),
        prodListFetch: () => dispatch(prodListFetch()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)