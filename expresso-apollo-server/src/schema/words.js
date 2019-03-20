import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getWords(size: Int): [Word!]
  }

  type Mutation {
    addLog(text: String!, score: Float!, star: Int!, time: String!): String!
  }

  type Word {
    text: String!
    value: Int!
  }
`;
