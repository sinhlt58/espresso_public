import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getComments(
      brand: String
      keyword: String
      domain: DomainEnum
      sort: SortEnum = DESC
      productId: String
    ): [Comment!]

    getComment(id: String!): Comment!
  }

  type Comment {
    id: ID!
    author: String!
    content: String!
    rate: Float!
    date: String!
    product: Product!
    createdTime: String!
  }

  enum DomainEnum {
    SHOPEE
    TIKI
    LAZADA
  }

  enum SortEnum {
    ASC
    DESC
  }
`;
