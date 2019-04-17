exports.resolvers = {
    Query: {
        getAllQuestions: async (root, args, { Question }) => {
            const allQuestions = await Question.find();
            return allQuestions;
        }
    },
    Mutation: {
        addQuestion: async (root, { question, answer, incorrectAnswers }, { Question }) => {
            const q = await Question.findOne({ question });
            if (q) {
                throw new Error('This question already exists');
            }
            const newQuestion = await new Question({
                question,
                answer,
                incorrectAnswers
            }).save();
            return newQuestion;
        },
        deleteQuestion: async (root, { _id }, { Question }) => {
            const question = await Question.findOneAndRemove({ _id });
            return question;
        },
        editQuestion: async (root, { _id, question, answer, incorrectAnswers }, { Question }) => {
            const updatedQuestion = await Question.findOneAndUpdate({ _id }, { question, answer, incorrectAnswers })
            return updatedQuestion;
        }
    }
};