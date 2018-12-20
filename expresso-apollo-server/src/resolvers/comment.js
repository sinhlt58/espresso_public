import { esClient } from '../database';

const getDomain = (enumValue) => {
  switch (enumValue) {
    case 'SHOPEE':
      return 'shopee.vn';
    case 'TIKI':
      return 'tiki.vn';
    case 'LAZADA':
      return 'lazada.vn';
    default:
      return '';
  }
};

export default {
  Query: {
    getComments: async (parent, args) => {
      let esRes;
      let sortType;
      if (args.sort !== undefined) {
        sortType = args.sort.toLowerCase();
      }

      if (
        args.keyword !== undefined &&
        args.brand === undefined &&
        args.productId === undefined &&
        args.domain === undefined
      ) {
        esRes = await esClient.search({
          index: 'analysis',
          body: {
            query: {
              bool: {
                must: [{ match: { content: args.keyword } }],
              },
              filter: [{ term: { itemType: 'review' } }],
            },
            sort: {
              rate: { order: sortType },
            },
          },
        });
      }

      if (
        args.brand !== undefined &&
        args.domain === undefined &&
        args.keyword === undefined &&
        args.productId === undefined
      ) {
        esRes = await esClient.search({
          index: 'analysis',
          body: {
            query: {
              bool: {
                must: [
                  {
                    multi_match: {
                      query: args.brand,
                      fields: ['parentAuthor', 'brand'],
                    },
                  },
                ],
                filter: [{ term: { itemType: 'review' } }],
              },
            },
            sort: {
              rate: { order: sortType },
            },
          },
        });
      }

      if (
        args.brand !== undefined &&
        args.domain !== undefined &&
        args.keyword === undefined &&
        args.productId === undefined
      ) {
        esRes = await esClient.search({
          index: 'analysis',
          body: {
            query: {
              bool: {
                must: [
                  {
                    multi_match: {
                      query: args.brand,
                      fields: ['parentAuthor', 'brand'],
                    },
                  },
                ],
                filter: [
                  { term: { itemType: 'review' } },
                  { term: { domain: getDomain(args.domain) } },
                ],
              },
            },
            sort: {
              rate: { order: sortType },
            },
          },
        });
      }

      if (
        args.productId !== undefined &&
        args.keyword === undefined &&
        args.domain === undefined &&
        args.brand === undefined
      ) {
        esRes = await esClient.search({
          index: 'analysis',
          body: {
            query: {
              bool: {
                filter: [
                  {
                    term: { itemType: 'review' },
                  },
                  {
                    term: { parentId: args.productId },
                  },
                ],
              },
            },
            sort: {
              rate: { order: sortType },
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
              must: [{ term: { id: args.id } }],
              filter: [{ term: { itemType: 'review' } }],
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
              must: [{ match: { id: parent._source.parentId } }],
              filter: [{ term: { itemType: 'product' } }],
            },
          },
        },
      });

      return esRes.hits.hits[0];
    },
  },
};
