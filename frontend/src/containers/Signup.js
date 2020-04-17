import React from 'react';
import { connect } from 'react-redux';

import {
    Form,
    Input,
    Button,
    AutoComplete,
    message
} from 'antd';
import { UserOutlined } from "@ant-design/icons";

import * as actions from '../store/actions/auth';

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
         },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

class RegistrationForm extends React.Component {
    onFinish = values => {
        console.log("Button Clicked!");
    
        this.props.onAuth(values.username, values.email, values.password, values.confirm);
    };

    componentDidUpdate(){
        const { error, loading } = this.props;

        if(error){
            message.error(error.message);
        }

        if(loading){
            const hide = message.loading("Please wait! Aunthenticating Credentials", 0);
            setTimeout(hide, 2500)
        }
    }

    render(){

        return (
            <Form 
            {...formItemLayout}
            name="register"
            onFinish={this.onFinish}
            scrollToFirstError
            >
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input/>
                </Form.Item>
                
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>
                
                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject('The two passwords that you entered do not match!');
                        },
                    }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
    
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        )    
    }
    
    
}

const mapStatetoProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        onAuth: (username, email, password1, password2, user_type) => dispatch(actions.authSignUp(username, email, password1, password2, user_type))
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(RegistrationForm);