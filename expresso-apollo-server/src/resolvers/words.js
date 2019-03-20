import { esClient } from "../database";

export default {
  Query: {
    getWords: async (parent, args) => {
      const esRes = await esClient.search({
        index: "v2_vocabulary",
        body: {
          size: args.size,
          query: {
            bool: {
              must: [{ match_all: {} }]
            }
          },
          sort: [
            {
              count: {
                order: "desc"
              }
            }
          ]
        }
      });

      return esRes.hits.hits;
    }
  },

  Mutation: {
    addLog: async (parent, args) => {
      const esRes = await esClient.index({
        index: "v2_log",
        type: "_doc",
        body: {
          type: "sentiment",
          text: args.text,
          score: args.score,
          star: args.star,
          time: args.time
        }
      });

      return args.text;
    }
  },

  Word: {
    text: parent => parent._source.orth,
    value: parent => parent._source.count
  }
};
