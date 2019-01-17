import { esClient } from "../database";
import { SOURCE } from "../const";

export default {
  Query: {
    getProduct: async (parent, args) => {
      const esRes = await esClient.search({
        index: SOURCE,
        body: {
          query: {
            bool: {
              must: [{ match: { id: args.id } }],
              filter: [{ term: { itemType: "product" } }]
            }
          }
        }
      });

      return esRes.hits.hits[0];
    },

    getBrandsByProduct: async (parent, args) => {
      const esRes = await esClient.search({
        index: SOURCE,
        body: {
          size: 0,
          query: {
            bool: {
              must: [
                {
                  match_phrase: {
                    title: args.title
                  }
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
            group_by_brand: {
              terms: {
                field: "brand.keyword",
                order: { _count: "desc" },
                size: 1000000000
              }
            },
            group_by_dealer: {
              terms: {
                field: "author.keyword",
                order: { _count: "desc" },
                size: 1000000000
              }
            }
          }
        }
      });

      const result = [
        ...esRes.aggregations.group_by_brand.buckets,
        ...esRes.aggregations.group_by_dealer.buckets
      ];

      return result;
    },
    productCompletion: async (parent, args) => {
      const esRes = await esClient.search({
        index: SOURCE,
        body: {
          size: 0,
          query: {
            bool: {
              must: [
                {
                  match_phrase_prefix: {
                    title: args.keyword
                  }
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
            group_by_title: {
              terms: {
                field: "title.keyword",
                size: 10
              }
            }
          }
        }
      });

      let result = [];
      esRes.aggregations.group_by_title.buckets.forEach(element => {
        result.push(element.key);
      });

      return result;
    },
    getProducts: async (parent, args) => {
      const esRes = await esClient.search({
        index: SOURCE,
        body: {
          from: args.offset,
          query: {
            bool: {
              should: [
                {
                  match_phrase: {
                    brand: args.brand
                  }
                },

                {
                  match_phrase: {
                    author: args.brand
                  }
                }
              ],
              minimum_should_match: 1,
              filter: {
                term: {
                  itemType: "product"
                }
              }
            }
          }
        }
      });

      return esRes.hits;
    }
  },

  Products: {
    total: parent => parent.total,
    products: parent => parent.hits
  },

  Product: {
    id: parent => parent._source.id,
    title: parent => parent._source.title,
    createdTime: parent => parent._source.createdTime,
    uploadTime: parent => parent._source.uploadTime,
    deliverFrom: parent => parent._source.deliverFrom,
    price: parent => parent._source.price,
    description: parent => parent._source.description,
    source: parent => parent._source,
    brand: parent => parent._source,
    rating: async parent => {
      const esRes = await esClient.search({
        index: SOURCE,
        body: {
          size: 0,
          query: {
            bool: {
              must: [
                {
                  match: {
                    parentId: parent._source.id
                  }
                }
              ],
              filter: [{ term: { itemType: "review" } }]
            }
          },
          aggs: {
            avg_rating: {
              avg: {
                field: "rate"
              }
            }
          }
        }
      });

      return esRes.aggregations.avg_rating.value;
    }
  },

  Source: {
    domain: parent => parent.domain,
    url: parent => parent.url
  },

  Brand: {
    brand: parent => parent.brand,
    dealer: parent => parent.author
  },

  BrandProducts: {
    name: parent => parent.key,
    count: parent => parent.doc_count
  }
};
