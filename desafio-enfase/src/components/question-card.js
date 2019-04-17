import React, { Component } from 'react';
import { Input, Icon, Button } from 'antd';
import { Mutation } from 'react-apollo';

import Error from './error'
import { ADD_QUESTION, EDIT_QUESTION, GET_ALL_QUESTIONS } from '../queries/index.js'

const InputGroup = Input.Group

class QuestionCard extends Component {
    state = {
        question: "",
        answer: "",
        incorrectAnswers: ["", "", ""],
        loading: false,
        edit: false
    }

    componentDidMount() {
        let { content } = this.props
        if (content) {
            if (content.question !== this.state.question) {
                this.setState({ question: content.question })
                this.setState({ answer: content.answer })
                this.setState({ incorrectAnswers: content.incorrectAnswers })
            }
        }
    }

    isEmpty = (currentValue) => {
        return currentValue === ""
    }

    validateForm = () => {
        let { question, answer, incorrectAnswers } = this.state
        const isInvalid = !question || !answer || incorrectAnswers.every(this.isEmpty);
        return isInvalid;
    }

    handleQuestion = event => {
        this.setState({ question: event.target.value })
    }

    handleAnswer = event => {
        this.setState({ answer: event.target.value })
    }

    handleIncorrectAnswers = (event, key) => {
        let { incorrectAnswers } = this.state;
        incorrectAnswers[key] = event.target.value
        this.setState({ incorrectAnswers: incorrectAnswers })
    }

    handleApply = (event, action) => {
        let { incorrectAnswers } = this.state
        event.preventDefault();
        this.setState({ loading: true })
        for (let i = 0; i <= incorrectAnswers.length; i++) {
            if (incorrectAnswers[i] === "") {
                incorrectAnswers.splice(i, 1);
                i -= 1;
            }
        }
        console.log(incorrectAnswers)
        this.setState({ incorrectAnswers: incorrectAnswers })
        action().then(data => {
            console.log(data);
            this.setState({ loading: false, edit: true })
        })
    }

    handleOnAddOption = () => {
        let { incorrectAnswers } = this.state
        incorrectAnswers.push("");
        this.setState({ incorrectAnswers: incorrectAnswers })

    }

    getOption = (options) => options.map((option, index) => <div style={styles.inputDiv} key={index}><Input key={index} value={option} onChange={(event) => this.handleIncorrectAnswers(event, index)}></Input></div>)

    onRadioChange = (e) => {
        this.setState({ radio: e.target.value })
    }

    render() {
        let { question, answer, incorrectAnswers, edit } = this.state
        let { content } = this.props
        if (content) {
            let _id = content._id;
            console.log("id", _id);
            return (
                <Mutation
                    mutation={EDIT_QUESTION}
                    variables={{ _id, question, answer, incorrectAnswers }}
                    refetchQueries={() => [{ query: GET_ALL_QUESTIONS }]}>
                    {(editQuestion, { data, loading, error }) => {
                        return (
                            <InputGroup style={{ padding: '3%' }}>
                                <p>New question <Icon type='question-circle'></Icon> </p>
                                <Input style={{ marginBlockEnd: '5%' }} value={question} onChange={this.handleQuestion}></Input>
                                <p>Right answer <Icon type='check-circle'></Icon> </p><Input value={answer} onChange={this.handleAnswer}></Input>
                                <InputGroup>
                                    <p style={{ marginTop: '5%' }}>Incorrect Answers <Icon type='close-circle'></Icon> </p>
                                    {this.getOption(incorrectAnswers)}
                                    <Button onClick={this.handleOnAddOption} type='primary' shape='round' style={{ marginTop: '3%' }}><Icon type='plus' /> Add incorrect answer</Button>
                                </InputGroup>
                                <Button onClick={event => this.handleApply(event, editQuestion)} loading={loading} disabled={loading || this.validateForm()} type='primary' style={{ marginTop: '5%' }}>
                                    <Icon type='check'></Icon>Apply changes
                                </Button>
                                {error && <Error error={error} />}
                                {edit && <p>Done! <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> </p>}
                            </InputGroup>)
                    }
                    }
                </Mutation>)

        }
        else {
            return (
                <Mutation mutation={ADD_QUESTION} variables={{ question, answer, incorrectAnswers }} refetchQueries={() => [{ query: GET_ALL_QUESTIONS }]}>
                    {(addQuestion, { data, loading, error }) => {
                        return (
                            <InputGroup style={{ padding: '3%' }}>
                                <p>New question <Icon type='question-circle'></Icon> </p>
                                <Input style={{ marginBlockEnd: '5%' }} value={question} onChange={this.handleQuestion}></Input>
                                <p>Right answer <Icon type='check-circle'></Icon> </p><Input value={answer} onChange={this.handleAnswer}></Input>
                                <InputGroup>
                                    <p style={{ marginTop: '5%' }}>Incorrect Answers <Icon type='close-circle'></Icon> </p>
                                    {this.getOption(incorrectAnswers)}
                                    <Button onClick={this.handleOnAddOption} type='primary' shape='round' style={{ marginTop: '3%' }}><Icon type='plus' /> Add incorrect answer</Button>
                                </InputGroup>
                                <Button onClick={event => this.handleApply(event, addQuestion)} disabled={loading || this.validateForm()} type='primary' style={{ marginTop: '5%' }}><Icon type='check'></Icon>Apply changes</Button>
                                {error && <Error error={error} />}
                            </InputGroup>)
                    }
                    }
                </Mutation>

            );
        }
    }
}

export default QuestionCard;

const styles = {
    inputDiv: {
        height: '30px', marginTop: '3%'
    }
}

//{this.getOption(incorrectAnswers)}