import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getWords(size: Int): [Word!]
  }

  type Word {
    text: String!
    value: Int!
  }
`;
