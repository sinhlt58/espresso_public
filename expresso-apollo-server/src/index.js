import 'babel-polyfill';
import { ApolloServer, gql } from 'apollo-server-express';

import express from 'express';
import path from 'path';
import schema from './schema';
import resolvers from './resolvers';

const app = express();

app.use(express.static(path.join(__dirname, '../..', 'expresso-client', 'build')));

import common from './common/common';

app.common = common;
app.configs = common.getConfig();

const PORT = app.configs['port'] || 8000;

app.use(express.json());
import routes from './routes';
app.use('/api', routes);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../..', 'expresso-client', 'build', 'index.html'));
});

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs: schema, resolvers });

server.applyMiddleware({ app, path: '/graphql' });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
app.listen({ port: PORT }, () => {
  console.log(`Apollo Server on http://localhost:${PORT}/graphql`);
});
