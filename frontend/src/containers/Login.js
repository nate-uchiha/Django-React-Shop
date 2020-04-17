import React from 'react';

import { Row, Col, Form, Input, Button, Checkbox, message } from 'antd';
import { LoadingOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { Redirect, Link } from 'react-router-dom';

import {connect} from 'react-redux';

import * as actions from '../store/actions/auth';

class NormalLoginForm extends React.Component {
    state = {
        username: "",
        password: ""
    };

    onFinish = values => {
        console.log('Received values of form: ', values);
        this.props.onAuth(values.username, values.password);
    }

    render() {
        if (this.props.token) {
            return <Redirect to="/" />;
          }
        return (
            
            <React.Fragment>
                <Row>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={this.onFinish}
                            onSubmit={this.onSubmit}
                            >
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                                <Link className="login-form-forgot" to="/password-reset/">
                                Forgot password
                                </Link>
                            </Form.Item>

                            <Form.Item>
                                <Button 
                                    type="primary" 
                                    htmlType="submit" 
                                    className="login-form-button"
                                    loading={this.props.loading}
                                    disabled={this.props.loading}
                                    >
                                Log in
                                </Button>
                                Or <Link to="/register"> Register now!</Link>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={8}></Col>
                </Row>
            </React.Fragment>
        );
    }
}


const mapStatetoProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        token: state.auth.token
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(NormalLoginForm)