const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser')

require('dotenv').config({ path: 'variables.env' });

const Question = require('./models/questions');

const cors = require('cors');

// Bring in GraphQL-Express middleware

const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');


const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers')

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

// Connects to database
mongoose.connect(process.env.MONGO_URI).then(() => console.log("DB connected")).catch(err => console.error(err))


// Initializes application
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}

app.use(cors(corsOptions));

// Create Graphiql application
app.use('/graphiql', graphiqlExpress({ endpointURL: 'graphql' }))


// Connect schemas with graphQL
app.use('/graphql', bodyParser.json(), graphqlExpress({
    schema,
    context: {
        Question
    }
}))

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
})