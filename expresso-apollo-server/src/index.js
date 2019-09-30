import "babel-polyfill";
import { ApolloServer, gql } from "apollo-server-express";

import express from "express";
import path from "path";
import schema from "./schema";
import resolvers from "./resolvers";

const app = express();

app.use(
  express.static(path.join(__dirname, "../..", "expresso-client", "build"))
);

import common from "./common/common";

app.common = common;
app.configs = common.getConfig();

const PORT = app.configs["port"] || 8000;

// Add headers
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use(express.json());
import routes from "./routes";
app.use("/api", routes);

app.get("/*", function(req, res) {
  res.sendFile(
    path.join(__dirname, "../..", "expresso-client", "build", "index.html")
  );
});

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs: schema, resolvers });

server.applyMiddleware({ app, path: "/graphql" });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
app.listen({ port: PORT }, () => {
  console.log(`Apollo Server on http://localhost:${PORT}/graphql`);
});
