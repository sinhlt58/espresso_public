import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getBrand(name: String!): BrandSummary!
    brandHistogram(
      brandName: String!
      from: String!
      to: String!
      interval: Int = 86400
      domain: DomainEnum
    ): [BrandHistogramItem!]
  }

  type BrandSummary {
    name: String!
    rate: Rating!
    totalCmt: Int!
  }

  type Rating {
    average: Float!
    detail: [RateDetail!]
    rateCount: [RateCount!]
  }

  type RateDetail {
    domain: String!
    totalCmt: Int!
    rate: Float!
  }

  type RateCount {
    star: String!
    totalCmt: Int!
  }

  type BrandHistogramItem {
    timestamp: String!
    count: Int!
  }
`;
