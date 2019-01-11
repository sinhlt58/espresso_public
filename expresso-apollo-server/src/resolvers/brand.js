import { esClient } from '../database';
import { getDomain } from './helper';
import { SOURCE } from '../const';

export default {
  Query: {
    getBrand: async (parent, args) => {
      const esRes = await esClient.search({
        index: SOURCE,
        body: {
          size: 0,
          query: {
            bool: {
              should: [
                {
                  term: {
                    brand: {
                      value: args.name,
                      boost: 3.0,
                    },
                  },
                },
                {
                  term: {
                    parentAuthor: {
                      value: args.name,
                    },
                  },
                },
              ],
              minimum_should_match: 1,
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
            summary_by_rate: {
              terms: {
                field: 'rate',
                order: { _key: 'desc' },
              },
            },
          },
        },
      });

      return [esRes, args.name];
    },

    brandHistogram: async (parent, args) => {
      let esRes;
      if (args.domain === 'ALL') {
        esRes = await esClient.search({
          index: SOURCE,
          body: {
            size: 0,
            query: {
              bool: {
                must: [
                  {
                    range: {
                      date: {
                        gte: args.from,
                        lte: args.to,
                      },
                    },
                  },
                ],
                should: [
                  {
                    term: {
                      brand: {
                        value: args.brandName,
                        boost: 3.0,
                      },
                    },
                  },
                  {
                    term: {
                      parentAuthor: {
                        value: args.brandName,
                      },
                    },
                  },
                ],
                minimum_should_match: 1,
                filter: [{ term: { itemType: 'review' } }],
              },
            },
            aggs: {
              cmt_histogram: {
                histogram: {
                  field: 'date',
                  interval: args.interval,
                },
                aggs: {
                  cmt_ranges: {
                    range: {
                      field: 'rate',
                      ranges: [
                        {
                          to: 3.0,
                        },
                        {
                          from: 3.0,
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
        });
      } else {
        esRes = await esClient.search({
          index: SOURCE,
          body: {
            size: 0,
            query: {
              bool: {
                must: [
                  {
                    match: { domain: getDomain(args.domain) },
                  },
                  {
                    range: {
                      date: {
                        gte: args.from,
                        lte: args.to,
                      },
                    },
                  },
                ],
                should: [
                  {
                    term: {
                      brand: {
                        value: args.brandName,
                        boost: 3.0,
                      },
                    },
                  },
                  {
                    term: {
                      parentAuthor: {
                        value: args.brandName,
                      },
                    },
                  },
                ],
                minimum_should_match: 1,
                filter: [{ term: { itemType: 'review' } }],
              },
            },
            aggs: {
              cmt_histogram: {
                histogram: {
                  field: 'date',
                  interval: 86400,
                },
                aggs: {
                  cmt_ranges: {
                    range: {
                      field: 'rate',
                      ranges: [
                        {
                          to: 3.0,
                        },
                        {
                          from: 3.0,
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
        });
      }

      return esRes.aggregations.cmt_histogram.buckets;
    },
  },

  BrandSummary: {
    name: (parent) => parent[1],
    rate: (parent) => parent[0].aggregations,
    totalCmt: (parent) => parent[0].hits.total,
  },

  Rating: {
    average: (parent) => parent.avg_rating.value,
    detail: (parent) => parent.summary_by_domains.buckets,
    rateCount: (parent) => parent.summary_by_rate.buckets,
  },

  RateDetail: {
    domain: (parent) => parent.key,
    totalCmt: (parent) => parent.doc_count,
    rate: (parent) => parent.avg_rating.value,
  },

  RateCount: {
    star: (parent) => parent.key,
    totalCmt: (parent) => parent.doc_count,
  },

  BrandHistogramItem: {
    timestamp: (parent) => parent.key * 1000,
    total: (parent) => parent.doc_count,
    count: (parent) => parent.cmt_ranges.buckets,
  },

  BrandCmtCount: {
    negative: (parent) => parent[0].doc_count,
    positive: (parent) => parent[1].doc_count,
  },
};
