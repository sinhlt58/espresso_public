import { esClient } from '../database';
import { getDomain } from './helper';
import { SOURCE } from '../const';

export default {
  Query: {
    getBrand: async (parent, args) => {
      let esRes;
      if (args.domain === 'ALL') {
        esRes = await esClient.search({
          index: SOURCE,
          body: {
            size: 0,
            query: {
              bool: {
                should: [
                  {
                    match_phrase: {
                      brand: args.name,
                    },
                  },
                  {
                    match_phrase: {
                      parentAuthor: args.name,
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
                  order: { _key: 'asc' },
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
                should: [
                  {
                    match_phrase: {
                      brand: args.name,
                    },
                  },
                  {
                    match_phrase: {
                      parentAuthor: args.name,
                    },
                  },
                ],
                minimum_should_match: 1,
                filter: [
                  { term: { itemType: 'review' } },
                  { term: { domain: getDomain(args.domain) } },
                ],
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
                  order: { _key: 'asc' },
                },
              },
            },
          },
        });
      }

      return [esRes, args.name];
    },

    brandHistogram: async (parent, args) => {
      let esRes;
      if (args.scoreBy === 'user') {
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
                      match_phrase: {
                        brand: args.brandName,
                      },
                    },
                    {
                      match_phrase: {
                        parentAuthor: args.brandName,
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
                      match_phrase: {
                        brand: args.brandName,
                      },
                    },
                    {
                      match_phrase: {
                        parentAuthor: args.brandName,
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
      } else {
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
                      match_phrase: {
                        brand: args.brandName,
                      },
                    },
                    {
                      match_phrase: {
                        parentAuthor: args.brandName,
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
                        field: 'sentimentStarV1',
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
                      match_phrase: {
                        brand: args.brandName,
                      },
                    },
                    {
                      match_phrase: {
                        parentAuthor: args.brandName,
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
                        field: 'sentimentStarV1',
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
      }

      return esRes.aggregations.cmt_histogram.buckets;
    },
    brandCompletion: async (parent, args) => {
      const esBrand = await esClient.search({
        index: SOURCE,
        body: {
          size: 0,
          query: {
            bool: {
              must: [
                {
                  match_phrase_prefix: {
                    brand: args.keyword,
                  },
                },
              ],
              filter: {
                term: {
                  itemType: 'review',
                },
              },
            },
          },
          aggs: {
            group_by_brand: {
              terms: {
                field: 'brand.keyword',
                size: 10,
              },
            },
          },
        },
      });

      const esDealer = await esClient.search({
        index: SOURCE,
        body: {
          size: 0,
          query: {
            bool: {
              must: [
                {
                  match_phrase_prefix: {
                    parentAuthor: args.keyword,
                  },
                },
              ],
              filter: {
                term: {
                  itemType: 'review',
                },
              },
            },
          },
          aggs: {
            group_by_dealer: {
              terms: {
                field: 'parentAuthor.keyword',
                size: 10,
              },
            },
          },
        },
      });

      const tempArray = [
        ...esBrand.aggregations.group_by_brand.buckets,
        ...esDealer.aggregations.group_by_dealer.buckets,
      ];
      let tmp = [];
      tempArray.forEach((element) => {
        tmp.push(element.key);
      });

      const tmpResult = tmp.filter((word) =>
        word.toLowerCase().includes(args.keyword.toLowerCase()),
      );

      const noDuplicateArray = tmpResult.reduce((result, element) => {
        const normalize = (x) => x.toLowerCase();

        var normalizedElement = normalize(element);
        if (
          result.every(
            (otherElement) => normalize(otherElement) !== normalizedElement,
          )
        )
          result.push(element);

        return result;
      }, []);

      return noDuplicateArray;
    },

    getFacebookPage: async (parent, args) => {
      const esRes = await esClient.search({
        index: 'fb_index',
        body: {
          from: args.offset,
          query: {
            bool: {
              must: [
                {
                  match_phrase: {
                    name: args.name,
                  },
                },
              ],
              filter: {
                term: {
                  type: 'page_detail',
                },
              },
            },
          },
        },
      });

      return esRes.hits.hits;
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

  FacebookPage: {
    name: (parent) => parent._source.name,
    likes_count: (parent) => Number(parent._source.fan_count),
    url: (parent) => parent._source.link,
    location: (parent) => parent._source.single_line_address,
  },
};
