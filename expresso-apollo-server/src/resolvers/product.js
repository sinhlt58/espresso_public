import { esClient } from '../database';
import { SOURCE } from '../const';

export default {
  Query: {
    getProduct: async (parent, args) => {
      const esRes = await esClient.search({
        index: SOURCE,
        body: {
          query: {
            bool: {
              must: [{ match: { id: args.id } }],
              filter: [{ term: { itemType: 'product' } }],
            },
          },
        },
      });

      return esRes.hits.hits[0];
    },
  },

  Product: {
    id: (parent) => parent._source.id,
    title: (parent) => parent._source.title,
    createdTime: (parent) => parent._source.createdTime,
    uploadTime: (parent) => parent._source.uploadTime,
    deliverFrom: (parent) => parent._source.deliverFrom,
    price: (parent) => parent._source.price,
    description: (parent) => parent._source.description,
    source: (parent) => parent._source,
    brand: (parent) => parent._source,
    rating: async (parent) => {
      const esRes = await esClient.search({
        index: SOURCE,
        body: {
          size: 0,
          query: {
            bool: {
              must: [
                {
                  match: {
                    parentId: parent._source.id,
                  },
                },
              ],
              filter: [{ term: { itemType: 'review' } }],
            },
          },
          aggs: {
            avg_rating: {
              avg: {
                field: 'rate',
              },
            },
          },
        },
      });

      return esRes.aggregations.avg_rating.value;
    },
  },

  Source: {
    domain: (parent) => parent.domain,
    url: (parent) => parent.url,
  },

  Brand: {
    brand: (parent) => parent.brand,
    dealer: (parent) => parent.author,
  },
};
