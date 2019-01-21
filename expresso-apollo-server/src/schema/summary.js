import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getSummaryApp: Summary
    getTopBrand: TopBrands
    getWorstBrand: WorstBrands
  }

  type Summary {
    brands_count: Int!
    comments_count: Int!
    products_count: Int!
    domain_count: Int!
  }

  type TopBrands {
    brands: [String!]
    dealers: [String!]
  }

  type WorstBrands {
    brands: [String!]
    dealers: [String!]
  }
`;
