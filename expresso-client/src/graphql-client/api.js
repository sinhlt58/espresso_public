import gql from "graphql-tag";
import client from "./client";

export const getBrand = async (name, domain) => {
  try {
    return await client.query({
      variables: { name, domain },
      query: gql`
        query($name: String!, $domain: DomainEnum) {
          getBrand(name: $name, domain: $domain) {
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
      `
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
  keyword
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
            total
            comments {
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
        }
      `
    });
  } catch (err) {
    return err;
  }
};

export const getHistogram = async ({
  brandName,
  from,
  to,
  interval,
  domain
}) => {
  try {
    return await client.query({
      variables: { brandName, from, to, interval, domain },
      query: gql`
        query(
          $brandName: String!
          $from: String!
          $to: String!
          $interval: Int!
          $domain: DomainEnum
        ) {
          brandHistogram(
            brandName: $brandName
            from: $from
            to: $to
            interval: $interval
            domain: $domain
          ) {
            timestamp
            total
            count {
              positive
              negative
            }
          }
        }
      `
    });
  } catch (err) {
    return err;
  }
};

export const getTopWords = async size => {
  try {
    return await client.query({
      variables: { size },
      query: gql`
        query($size: Int!) {
          getWords(size: $size) {
            text
            value
          }
        }
      `
    });
  } catch (err) {
    return err;
  }
};

export const getBrands = async title => {
  try {
    return await client.query({
      variables: { title },
      query: gql`
        query($title: String!) {
          getBrandsByProduct(title: $title) {
            name
            count
          }
        }
      `
    });
  } catch (err) {
    return err;
  }
};

export const brandAutocomplete = async keyword => {
  try {
    return await client.query({
      variables: { keyword },
      query: gql`
        query($keyword: String!) {
          brandCompletion(keyword: $keyword)
        }
      `
    });
  } catch (err) {
    return err;
  }
};

export const productAutocomplete = async keyword => {
  try {
    return await client.query({
      variables: { keyword },
      query: gql`
        query($keyword: String!) {
          productCompletion(keyword: $keyword)
        }
      `
    });
  } catch (err) {
    return err;
  }
};

export const getProductsByBrand = async (brand, offset) => {
  try {
    return await client.query({
      variables: { brand, offset },
      query: gql`
        query($brand: String!, $offset: Int!) {
          getProducts(brand: $brand, offset: $offset) {
            total
            products {
              id
              title
              price
              source {
                domain
                url
              }
            }
          }
        }
      `
    });
  } catch (err) {
    return err;
  }
};

export const getAppStats = async () => {
  try {
    return await client.query({
      query: gql`
        query {
          getSummaryApp {
            brands_count
            comments_count
            products_count
            domain_count
          }
        }
      `
    });
  } catch (err) {
    return err;
  }
};

export const getPopuplarBrands = async () => {
  try {
    return await client.query({
      query: gql`
        query {
          getTopBrand {
            brands
            dealers
          }
        }
      `
    });
  } catch (err) {
    return err;
  }
};
