import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    comments: [Comment!]
  }

  type Comment {
    id: ID!
    author: String!
    content: String!
    rate: Int!
    date: String!
    brand: Brand!
    source: Domain!
  }

  type Domain {
    domain: String!
    url: String!
  }

  type Brand {
    name: String!
    shop: String!
  }
`;
