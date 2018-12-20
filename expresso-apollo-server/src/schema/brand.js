import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getBrand(name: String!): BrandSummary
    getBrands: [BrandSummary!]
  }

  type BrandSummary {
    id: ID!
    name: String!
    rate: Rating!
  }

  type Rating {
    average: Float!
    detail: [SourceRating!]
  }

  type SourceRating {
    domain: String!
    totalCmt: Int!
    rate: Float!
  }
`;
