import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getSummaryApp: Summary
    getTopBrand: TopBrands
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
`;
