exports.typeDefs = `

type Question {
    _id: ID
    question: String!
    answer: String!
    incorrectAnswers: [String]!
}

type Query {
    getAllQuestions: [Question]
}

type Mutation {
    addQuestion(question: String!, answer: String!, incorrectAnswers: [String]!): Question
    deleteQuestion(_id: ID): Question
    editQuestion(_id: ID!, question: String!, answer: String!, incorrectAnswers: [String]!): Question
}

`;