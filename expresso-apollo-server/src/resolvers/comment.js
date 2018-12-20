import { esClient } from '../database';

export default {
  Query: {
    getComments: async (parent, args) => {
      let esRes;

      if (args.keyword !== undefined) {
        esRes = await esClient.search({
          index: 'analysis',
          body: {
            query: {
              bool: {
                must: [
                  { match: { itemType: 'review' } },
                  { match: { content: args.keyword } },
                ],
              },
            },
          },
        });
      }

      if (args.brand !== undefined) {
        esRes = await esClient.search({
          index: 'analysis',
          body: {
            query: {
              bool: {
                must: [
                  { match: { itemType: 'review' } },
                  { match: { brand: args.brand } },
                ],
              },
            },
          },
        });
      }

      return esRes.hits.hits;
    },

    getComment: async (parent, args) => {
      const esRes = await esClient.search({
        index: 'analysis',
        body: {
          query: {
            bool: {
              must: [
                { match: { itemType: 'review' } },
                { match: { id: args.id } },
              ],
            },
          },
        },
      });

      return esRes.hits.hits[0];
    },
  },

  Comment: {
    id: (parent) => parent._source.id,
    author: (parent) => parent._source.author,
    content: (parent) => parent._source.content,
    rate: (parent) => parent._source.rate,
    date: (parent) => parent._source.date,
    createdTime: (parent) => parent._source.createdTime,
    product: async (parent) => {
      const esRes = await esClient.search({
        index: 'analysis',
        body: {
          query: {
            bool: {
              must: [
                { match: { itemType: 'product' } },
                { match: { id: parent._source.parentId } },
              ],
            },
          },
        },
      });

      return esRes.hits.hits[0];
    },
  },
};
