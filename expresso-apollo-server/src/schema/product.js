import { gql } from 'apollo-server-express';

export default gql`
  type Product {
    id: ID!
    title: String
    createdTime: String!
    uploadTime: String!
    deliverFrom: String
    source: Source!
    brand: Brand!
    price: Int!
    description: String
  }

  type Brand {
    brand: String
    dealer: String
  }

  type Source {
    domain: String!
    url: String!
  }
`;
