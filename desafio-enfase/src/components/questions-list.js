import React, { Component } from 'react';

import { DELETE_QUESTION, GET_ALL_QUESTIONS } from '../queries/index'
import { Mutation } from 'react-apollo';
import { List, Button, Popconfirm, Modal } from 'antd'
import QuestionCard from './question-card.js';


class QuestionsList extends Component {
    state = {
        visible: false,
        modal_item: { question: '', incorrectAnswers: [], answer: '' }
    }


    handleDelete = deleteQuestion => {
        deleteQuestion().then(({ data }) => {
            console.log(data);
        })
    }

    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    showModal = item => {
        this.setState({
            visible: true,
            modal_item: item
        })
    }

    render() {
        let { visible, modal_item } = this.state
        let { questions } = this.props
        console.log("question-list: ", questions.getAllQuestions)
        return (
            <div>
                <List
                    bordered
                    dataSource={questions.getAllQuestions}
                    renderItem={item => (
                        <List.Item
                            actions={[
                                <Button type='primary' shape='circle' icon='edit' onClick={() => this.showModal(item)} />,
                                <Mutation mutation={DELETE_QUESTION} variables={{ _id: item._id }} refetchQueries={() => [{ query: GET_ALL_QUESTIONS }]}>
                                    {(deleteQuestion) => {
                                        return (
                                            <Popconfirm title='Confirm to delete question' onConfirm={() => this.handleDelete(deleteQuestion)} okText='Delete'>
                                                <Button type='danger' shape='circle' icon='delete' />
                                            </Popconfirm>)
                                    }}

                                </Mutation>]}>
                            <List.Item.Meta title={item.question}></List.Item.Meta>
                        </List.Item>)}
                ></List>
                <Modal title={modal_item.question} visible={visible} onOk={this.handleOk} onCancel={this.handleCancel} footer={[<Button type="primary" onClick={this.handleOk}>
                    OK
            </Button>]}>
                    <QuestionCard key={modal_item.question} content={modal_item}></QuestionCard>
                </Modal>
            </div>
        );
    }
}

export default QuestionsList;