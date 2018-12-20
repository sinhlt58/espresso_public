import { esClient } from '../database';

export default {
  Query: {
    getBrand: async (parent, args) => {
      const esRes = await esClient.search({
        index: 'analysis',
        body: {
          size: 0,
          query: {
            bool: {
              must: [
                {
                  multi_match: {
                    query: args.name,
                    fields: ['parentAuthor', 'brand'],
                  },
                },
              ],
              filter: [{ term: { itemType: 'review' } }],
            },
          },
          aggs: {
            summary_by_domains: {
              terms: {
                field: 'domain.keyword',
              },
              aggs: {
                avg_rating: {
                  avg: {
                    field: 'rate',
                  },
                },
              },
            },
            avg_rating: {
              avg: {
                field: 'rate',
              },
            },
          },
        },
      });

      return [esRes, args.name];
    },

    brandHistogram: async (parent, args) => {
      const esRes = await esClient.search({
        index: 'analysis',
        body: {
          size: 0,
          query: {
            bool: {
              must: [
                { match: { brand: args.brandName } },
                {
                  range: {
                    date: {
                      gte: args.from,
                      lte: args.to,
                    },
                  },
                },
              ],
              filter: [{ term: { itemType: 'review' } }],
            },
          },
          aggs: {
            cmt_histogram: {
              histogram: {
                field: 'date',
                interval: args.interval,
              },
            },
          },
        },
      });

      return esRes.aggregations.cmt_histogram.buckets;
    },
  },

  BrandSummary: {
    name: (parent) => parent[1],
    rate: (parent) => parent[0].aggregations,
  },

  Rating: {
    average: (parent) => parent.avg_rating.value,
    detail: (parent) => parent.summary_by_domains.buckets,
  },

  RateDetail: {
    domain: (parent) => parent.key,
    totalCmt: (parent) => parent.doc_count,
    rate: (parent) => parent.avg_rating.value,
  },

  BrandHistogramItem: {
    timestamp: (parent) => parent.key,
    count: (parent) => parent.doc_count,
  },
};
