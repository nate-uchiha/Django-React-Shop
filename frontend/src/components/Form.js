import React from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

class CustomForm extends React.Component {

    state = {
        error: null,
        created: null,
        deleted: null,
        updated: null
    }

    handleFormSubmit = (event, requestType, articleID) => {
        
        const title = event.target.elements.title.value;
        const content = event.target.elements.content.value;
        const description = event.target.elements.description.value;
        console.log("Title: ", title);
        console.log("Content: ", content);
        console.log("Descript: ", description);
        
        switch(requestType){
            case 'post':
                console.log("Posting Articles///.....");
                return axios.post('http://127.0.0.1:8000/articles/', {
                        title: title,
                        content: content,
                        description: description
                    })
                    .then(res => console.log(res))
                    .catch(error => console.error(error));              
            
            case 'put':
                return axios.put(`http://127.0.0.1:8000/articles/${articleID}/`, {
                    title: title,
                    content: content,
                    description: description
                })
                .then(res => console.log(res))
                .catch(error => console.error(error));

        }
    }

    render() {
        return (
            <div>
                <Form onSubmit = {(event) => this.handleFormSubmit(event, this.props.requestType, this.props.articleID)}>
                <Form.Item label="title">
                    <Input name='title' placeholder="Putt a title here!" />
                </Form.Item>
                <Form.Item label="content">
                    <TextArea rows={5} name='content' />
                </Form.Item>
                <Form.Item label="description">
                    <TextArea rows={3} name='description' />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" >{this.props.buttonState}</Button>
                </Form.Item>
                </Form>
            </div>
        );
    }
}

export default CustomForm