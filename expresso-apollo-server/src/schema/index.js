import { gql } from 'apollo-server-express';
import commentSchema from './comment';
import brandSchema from './brand';
import productSchema from './product';

const linkSchema = gql`
  type Query {
    _: Boolean
  }
`;

export default [linkSchema, commentSchema, brandSchema, productSchema];
