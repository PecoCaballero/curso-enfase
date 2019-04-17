import React, { Component } from 'react';

import { Button, Modal } from 'antd';
import QuestionsList from './questions-list.js';
import QuestionCard from './question-card'

class Home extends Component {
    state = {
        visible: false,
        question: "",
        answer: "",
        incorrectAnswers: [],
        cont: 0
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

    showModal = () => {
        this.setState({
            visible: true,
            cont: this.state.cont + 1
        })
    }

    render() {
        let { visible, cont } = this.state
        let { questions } = this.props
        console.log(questions)
        return (
            <div style={styles.container}>
                <div style={styles.containerContent}>
                    <Button onClick={this.showModal} style={styles.buttonAdd} type='primary' size='large' shape='round' icon='plus'>Add Question</Button>
                    <QuestionsList questions={questions}></QuestionsList>
                    <Modal title="New Question" visible={visible} onOk={this.handleOk} onCancel={this.handleCancel} footer={[<Button type="primary" onClick={this.handleOk}>
                        OK
            </Button>]}>
                        <QuestionCard key={cont}></QuestionCard>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default Home;


const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80%',
        width: '100%'
    },
    containerContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '60%'
    },
    buttonAdd: {
        margin: '2%'
    }
}