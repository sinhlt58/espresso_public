import { esClient } from "../database";
import { SOURCE } from "../const";

export default {
  Query: {
    getSummaryApp: async (parent, args) => {
      const esRes = await esClient.search({
        index: SOURCE,
        body: {
          size: 0,
          query: {
            bool: {
              must: [
                {
                  match_all: {}
                }
              ],
              filter: {
                term: {
                  itemType: "product"
                }
              }
            }
          },
          aggs: {
            brand_count: {
              terms: {
                field: "brand.keyword"
              }
            },
            author_count: {
              terms: {
                field: "author.keyword"
              }
            },
            domain_count: {
              terms: {
                field: "domain.keyword"
              }
            }
          }
        }
      });

      const cmtRes = await esClient.search({
        index: SOURCE,
        body: {
          size: 0,
          query: {
            bool: {
              must: [
                {
                  match_all: {}
                }
              ],
              filter: {
                term: {
                  itemType: "review"
                }
              }
            }
          }
        }
      });

      let result = {};
      result.brands_count =
        esRes.aggregations.brand_count.sum_other_doc_count +
        esRes.aggregations.brand_count.buckets.length +
        esRes.aggregations.author_count.sum_other_doc_count +
        esRes.aggregations.author_count.buckets.length;

      result.domain_count =
        esRes.aggregations.domain_count.sum_other_doc_count +
        esRes.aggregations.domain_count.buckets.length;

      result.products_count = esRes.hits.total;

      result.comments_count = cmtRes.hits.total;

      return result;
    },
    getTopBrand: async (parent, args) => {
      const esRes = await esClient.search({
        index: SOURCE,
        body: {
          size: 0,
          query: {
            bool: {
              must: [
                {
                  match_all: {}
                }
              ],
              filter: {
                term: {
                  itemType: "review"
                }
              }
            }
          },
          aggs: {
            group_by_brands: {
              terms: {
                field: "brand.keyword",
                size: 10
              }
            },
            group_by_dealer: {
              terms: {
                field: "parentAuthor.keyword",
                size: 10
              }
            }
          }
        }
      });

      let brands = [];
      let dealers = [];

      esRes.aggregations.group_by_brands.buckets.forEach(element => {
        brands.push(element.key);
      });

      esRes.aggregations.group_by_dealer.buckets.forEach(element => {
        dealers.push(element.key);
      });

      const result = {
        brands,
        dealers
      };

      return result;
    }
  }
};
