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
              rateCount {
                star
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

export const getComments = async ({
  offset,
  brand,
  star,
  domain,
  sort,
  keyword,
}) => {
  try {
    return await client.query({
      variables: { offset, brand, star, sort, domain, keyword },
      query: gql`
        query(
          $offset: Int!
          $brand: String
          $star: String
          $sort: SortEnum
          $domain: DomainEnum
          $keyword: String
        ) {
          getComments(
            offset: $offset
            brand: $brand
            sort: $sort
            star: $star
            domain: $domain
            keyword: $keyword
          ) {
            id
            author
            content
            rate
            date
            product {
              source {
                url
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
