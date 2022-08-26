const eventResolver = require('./eventResolver');
const formResolver = require('./formResolver');
const hostResolver = require('./hostResolver');
const { GraphQLUpload } = require("graphql-upload");

const contactResolver = require('./contactResolver');
const paymentResolver = require('./paymentResolver');
const matchResolver = require('./matchResolver');
const checkInResolver = require('./checkinResolver')
module.exports = {
    FileUpload: GraphQLUpload,
    Query: {
        ...eventResolver.Query,
        ...formResolver.Query,
        ...hostResolver.Query,
        ...matchResolver.Query,
        ...checkInResolver.Query
    },
    Mutation: {
        ...eventResolver.Mutation,
        ...formResolver.Mutation,
        ...hostResolver.Mutation,
        ...contactResolver.Mutation,
        ...paymentResolver.Mutation,
        ...matchResolver.Mutation,
        ...checkInResolver.Mutation
    },
}