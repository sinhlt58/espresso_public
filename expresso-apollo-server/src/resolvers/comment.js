import { esClient } from '../database';
import { getDomain } from './helper';
import { SOURCE } from '../const';

export default {
  Query: {
    getComments: async (parent, args) => {
      let esRes;
      const sortType = args.sort.toLowerCase();
      let domainType;

      if (args.domain !== 'ALL') {
        domainType = getDomain(args.domain);
      }

      if (args.keyword === '' && args.domain === 'ALL' && args.star === '0') {
        esRes = await esClient.search({
          index: SOURCE,
          body: {
            from: args.offset,
            query: {
              bool: {
                should: [
                  {
                    term: {
                      brand: {
                        value: args.brand,
                        boost: 3.0,
                      },
                    },
                  },
                  {
                    term: {
                      parentAuthor: {
                        value: args.brand,
                      },
                    },
                  },
                ],
                minimum_should_match: 1,
                filter: {
                  term: {
                    itemType: 'review',
                  },
                },
              },
            },
            sort: [
              {
                rate: {
                  order: sortType,
                },
              },
              {
                date: {
                  order: 'desc',
                },
              },
            ],
          },
        });
      }

      if (args.keyword !== '' && args.domain === 'ALL' && args.star === '0') {
        esRes = await esClient.search({
          index: SOURCE,
          body: {
            from: args.offset,
            query: {
              bool: {
                must: [
                  {
                    match_phrase: {
                      content: args.keyword,
                    },
                  },
                ],
                should: [
                  {
                    term: {
                      brand: {
                        value: args.brand,
                        boost: 3.0,
                      },
                    },
                  },
                  {
                    term: {
                      parentAuthor: {
                        value: args.brand,
                      },
                    },
                  },
                ],
                minimum_should_match: 1,
                filter: {
                  term: {
                    itemType: 'review',
                  },
                },
              },
            },
            sort: [
              {
                rate: {
                  order: sortType,
                },
              },
              {
                date: {
                  order: 'desc',
                },
              },
            ],
          },
        });
      }

      if (args.keyword === '' && args.domain === 'ALL' && args.star !== '0') {
        esRes = await esClient.search({
          index: SOURCE,
          body: {
            from: args.offset,
            query: {
              bool: {
                must: [
                  {
                    match: {
                      rate: args.star,
                    },
                  },
                ],
                should: [
                  {
                    term: {
                      brand: {
                        value: args.brand,
                        boost: 3.0,
                      },
                    },
                  },
                  {
                    term: {
                      parentAuthor: {
                        value: args.brand,
                      },
                    },
                  },
                ],
                minimum_should_match: 1,
                filter: {
                  term: {
                    itemType: 'review',
                  },
                },
              },
            },
            sort: [
              {
                rate: {
                  order: sortType,
                },
              },
              {
                date: {
                  order: 'desc',
                },
              },
            ],
          },
        });
      }

      if (args.keyword !== '' && args.domain === 'ALL' && args.star !== '0') {
        esRes = await esClient.search({
          index: SOURCE,
          body: {
            from: args.offset,
            query: {
              bool: {
                must: [
                  {
                    match: {
                      rate: args.star,
                    },
                  },
                  {
                    match_phrase: {
                      content: args.keyword,
                    },
                  },
                ],
                should: [
                  {
                    term: {
                      brand: {
                        value: args.brand,
                        boost: 3.0,
                      },
                    },
                  },
                  {
                    term: {
                      parentAuthor: {
                        value: args.brand,
                      },
                    },
                  },
                ],
                minimum_should_match: 1,
                filter: {
                  term: {
                    itemType: 'review',
                  },
                },
              },
            },
            sort: [
              {
                rate: {
                  order: sortType,
                },
              },
              {
                date: {
                  order: 'desc',
                },
              },
            ],
          },
        });
      }

      if (args.keyword === '' && args.domain !== 'ALL' && args.star === '0') {
        esRes = await esClient.search({
          index: SOURCE,
          body: {
            from: args.offset,
            query: {
              bool: {
                must: [
                  {
                    match: {
                      domain: domainType,
                    },
                  },
                ],
                should: [
                  {
                    term: {
                      brand: {
                        value: args.brand,
                        boost: 3.0,
                      },
                    },
                  },
                  {
                    term: {
                      parentAuthor: {
                        value: args.brand,
                      },
                    },
                  },
                ],
                minimum_should_match: 1,
                filter: {
                  term: {
                    itemType: 'review',
                  },
                },
              },
            },
            sort: [
              {
                rate: {
                  order: sortType,
                },
              },
              {
                date: {
                  order: 'desc',
                },
              },
            ],
          },
        });
      }

      if (args.keyword !== '' && args.domain !== 'ALL' && args.star === '0') {
        esRes = await esClient.search({
          index: SOURCE,
          body: {
            from: args.offset,
            query: {
              bool: {
                must: [
                  {
                    match: {
                      domain: domainType,
                    },
                  },
                  {
                    match_phrase: {
                      content: args.keyword,
                    },
                  },
                ],
                should: [
                  {
                    term: {
                      brand: {
                        value: args.brand,
                        boost: 3.0,
                      },
                    },
                  },
                  {
                    term: {
                      parentAuthor: {
                        value: args.brand,
                      },
                    },
                  },
                ],
                minimum_should_match: 1,
                filter: {
                  term: {
                    itemType: 'review',
                  },
                },
              },
            },
            sort: [
              {
                rate: {
                  order: sortType,
                },
              },
              {
                date: {
                  order: 'desc',
                },
              },
            ],
          },
        });
      }

      if (args.keyword === '' && args.domain !== 'ALL' && args.star !== '0') {
        esRes = await esClient.search({
          index: SOURCE,
          body: {
            from: args.offset,
            query: {
              bool: {
                must: [
                  {
                    match: {
                      domain: domainType,
                    },
                  },
                  {
                    match: {
                      rate: args.star,
                    },
                  },
                ],
                should: [
                  {
                    term: {
                      brand: {
                        value: args.brand,
                        boost: 3.0,
                      },
                    },
                  },
                  {
                    term: {
                      parentAuthor: {
                        value: args.brand,
                      },
                    },
                  },
                ],
                minimum_should_match: 1,
                filter: {
                  term: {
                    itemType: 'review',
                  },
                },
              },
            },
            sort: [
              {
                rate: {
                  order: sortType,
                },
              },
              {
                date: {
                  order: 'desc',
                },
              },
            ],
          },
        });
      }

      if (args.keyword !== '' && args.domain !== 'ALL' && args.star !== '0') {
        esRes = await esClient.search({
          index: SOURCE,
          body: {
            from: args.offset,
            query: {
              bool: {
                must: [
                  {
                    match: {
                      domain: domainType,
                    },
                  },
                  {
                    match: {
                      rate: args.star,
                    },
                  },
                  {
                    match_phrase: {
                      content: args.keyword,
                    },
                  },
                ],
                should: [
                  {
                    term: {
                      brand: {
                        value: args.brand,
                        boost: 3.0,
                      },
                    },
                  },
                  {
                    term: {
                      parentAuthor: {
                        value: args.brand,
                      },
                    },
                  },
                ],
                minimum_should_match: 1,
                filter: {
                  term: {
                    itemType: 'review',
                  },
                },
              },
            },
            sort: [
              {
                rate: {
                  order: sortType,
                },
              },
              {
                date: {
                  order: 'desc',
                },
              },
            ],
          },
        });
      }

      return esRes.hits.hits;
    },

    getComment: async (parent, args) => {
      const esRes = await esClient.search({
        index: SOURCE,
        body: {
          query: {
            bool: {
              must: [{ term: { id: args.id } }],
              filter: [{ term: { itemType: 'review' } }],
            },
          },
        },
      });

      if (esRes.hits.hits.length === 0) {
        throw 'Comment not found';
      }

      return esRes.hits.hits[0];
    },
  },

  Comment: {
    id: (parent) => parent._source.id,
    author: (parent) => parent._source.author,
    content: (parent) => parent._source.content,
    rate: (parent) => parent._source.rate,
    date: (parent) => parent._source.date * 1000,
    createdTime: (parent) => parent._source.createdTime,
    product: async (parent) => {
      const esRes = await esClient.search({
        index: SOURCE,
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
