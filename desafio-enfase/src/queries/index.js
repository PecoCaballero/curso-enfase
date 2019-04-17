import { gql } from 'apollo-boost';

export const GET_ALL_QUESTIONS = gql`

query{
    getAllQuestions{
        _id
        question
        answer
        incorrectAnswers
    }
}

`;

export const ADD_QUESTION = gql`

mutation($question: String!, $answer: String!, $incorrectAnswers: [String]!){
  addQuestion(question: $question, answer: $answer, incorrectAnswers: $incorrectAnswers){
    question
    answer
    incorrectAnswers
  }
}
`

export const DELETE_QUESTION = gql`

mutation($_id: ID!){
  deleteQuestion(_id: $_id){
    _id
  }
}

`

export const EDIT_QUESTION = gql`

mutation($_id: ID!, $question: String!, $answer: String!, $incorrectAnswers: [String]!){
  editQuestion(_id: $_id, question: $question, answer: $answer, incorrectAnswers: $incorrectAnswers){
    _id
  }
}

`