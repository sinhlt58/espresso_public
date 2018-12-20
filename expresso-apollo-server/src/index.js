import 'babel-polyfill';
import { ApolloServer, gql } from 'apollo-server-express';

import express from 'express';
import schema from './schema';
import resolvers from './resolvers';

const app = express();

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs: schema, resolvers });

server.applyMiddleware({ app, path: '/graphql' });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
app.listen({ port: 8000 }, () => {
  console.log(`Apollo Server on http://localhost:8000/graphql`);
});
