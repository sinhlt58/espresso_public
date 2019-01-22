import { gql } from "apollo-server-express";
import commentSchema from "./comment";
import brandSchema from "./brand";
import productSchema from "./product";
import wordSchema from "./words";
import summarySchema from "./summary";

const linkSchema = gql`
  type Query {
    _: Boolean
  }
`;

export default [
  linkSchema,
  commentSchema,
  brandSchema,
  productSchema,
  wordSchema,
  summarySchema
];
