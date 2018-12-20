import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getBrand(name: String!): BrandSummary
    brandHistogram(
      brandName: String!
      from: String!
      to: String!
      interval: String!
    ): [BrandHistogramItem!]
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

  type BrandHistogramItem {
    timestamp: String!
    count: Int!
  }
`;
