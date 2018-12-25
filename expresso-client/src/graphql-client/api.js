import gql from 'graphql-tag';
import client from './client';

export const getBrand = async (name) => {
  try {
    return await client.query({
      variables: { name },
      query: gql`
        query($name: String!) {
          getBrand(name: $name) {
            totalCmt
            rate {
              average
              detail {
                rate
                domain
                totalCmt
              }
            }
          }
        }
      `,
    });
  } catch (err) {
    return err;
  }
};
