import { esClient } from '../database';

export default {
  Query: {
    getWords: async (parent, args) => {
      const esRes = await esClient.search({
        index: 'v2_vocabulary',
        body: {
          size: args.size,
          query: {
            bool: {
              must: [{ match_all: {} }],
            },
          },
          sort: [
            {
              count: {
                order: 'desc',
              },
            },
          ],
        },
      });

      return esRes.hits.hits;
    },
  },

  Word: {
    text: (parent) => parent._source.orth,
    value: (parent) => parent._source.count,
  },
};
