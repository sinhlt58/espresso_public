import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getBrand(name: String!): BrandSummary
  }

  type BrandSummary {
    name: String!
    rate: Rating!
  }

  type Rating {
    average: Float!
    detail: [RateDetail!]
  }

  type RateDetail {
    domain: String!
    totalCmt: Int!
    rate: Float!
  }
`;
