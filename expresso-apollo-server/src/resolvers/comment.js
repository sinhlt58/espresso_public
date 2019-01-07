import { esClient } from "../database";
import { getDomain } from "./helper";

export default {
  Query: {
    getComments: async (parent, args) => {
      let esRes;
      let sortType;
      let domainType;
      if (args.sort !== undefined) {
        sortType = args.sort.toLowerCase();
      }
      if (args.domain !== undefined) {
        domainType = args.domain.toLowerCase();
      }

      esRes = await esClient.search({
        index: "analysis",
        body: {
          query: {
            bool: {
              must: [
                {
                  multi_match: {
                    query: args.brand,
                    fields: ["parentAuthor", "brand"]
                  }
                }
              ],
              filter: {
                term: {
                  itemType: "review"
                }
              }
            }
          },
          sort: [
            {
              date: {
                order: "desc"
              }
            }
          ]
        }
      });

      return esRes.hits.hits;
    },

    getComment: async (parent, args) => {
      const esRes = await esClient.search({
        index: "analysis",
        body: {
          query: {
            bool: {
              must: [{ term: { id: args.id } }],
              filter: [{ term: { itemType: "review" } }]
            }
          }
        }
      });

      if (esRes.hits.hits.length === 0) {
        throw "Comment not found";
      }

      return esRes.hits.hits[0];
    }
  },

  Comment: {
    id: parent => parent._source.id,
    author: parent => parent._source.author,
    content: parent => parent._source.content,
    rate: parent => parent._source.rate,
    date: parent => parent._source.date * 1000,
    createdTime: parent => parent._source.createdTime,
    product: async parent => {
      const esRes = await esClient.search({
        index: "analysis",
        body: {
          query: {
            bool: {
              must: [{ match: { id: parent._source.parentId } }],
              filter: [{ term: { itemType: "product" } }]
            }
          }
        }
      });

      return esRes.hits.hits[0];
    }
  }
};
