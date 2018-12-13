import { esClient } from '../database';

export default {
  Query: {
    getComments: async (parent, args) => {
      const esRes = await esClient.search({
        index: 'analysis',
        body: {
          query: {
            match_all: {},
          },
        },
      });

      return esRes.hits.hits;
    },
  },

  Comment: {
    id: (parent) => parent._source.id,
    author: (parent) => parent._source.author,
    content: (parent) => parent._source.content,
    rate: (parent) => parent._source.rate,
    date: (parent) => parent._source.rate,
    brand: (parent) => parent._source,
    source: (parent) => parent._source,
  },

  Domain: {
    domain: (parent) => parent.domain,
    url: (parent) => parent.url,
  },

  Brand: {
    name: (parent) => parent.brand,
    shop: (parent) => parent.parentAuthor,
  },
};
