import { gql } from "apollo-server-express";
import commentSchema from "./comment";

const linkSchema = gql`
  type Query {
    _: Boolean
  }
`;

export default [linkSchema, commentSchema];
