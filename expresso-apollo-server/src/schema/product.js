import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getProduct(id: String!): Product!
    getProducts(brand: String!, offset: Int!): Products!
    getBrandsByProduct(title: String!): [BrandProducts!]
    productCompletion(keyword: String!): [String!]
  }

  type Products {
    total: Int!
    products: [Product!]
  }

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
    rating: Float!
  }

  type Brand {
    brand: String
    dealer: String
  }

  type Source {
    domain: String!
    url: String!
  }

  type BrandProducts {
    name: String!
    count: Int
  }
`;
