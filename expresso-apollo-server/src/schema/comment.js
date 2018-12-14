import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getComments(
      brand: String!
      keyword: String
      domain: DomainEnum
      sort: SortEnum
    ): [Comment!]
  }

  type Comment {
    id: ID!
    author: String!
    content: String!
    rate: Int!
    date: String!
    brand: BrandName!
    source: Domain!
  }

  type Domain {
    domain: String!
    url: String!
  }

  type BrandName {
    name: String!
    shop: String!
  }

  enum DomainEnum {
    SHOPEE
    TIKI
  }

  enum SortEnum {
    ASC
    DES
  }
`;
