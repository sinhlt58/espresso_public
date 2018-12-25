import ApolloClient from 'apollo-boost';
import { uri } from '../constant/';

export default new ApolloClient({
  uri: uri,
});
