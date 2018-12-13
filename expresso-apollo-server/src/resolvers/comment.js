import { esClient } from "../database";

export default {
  Query: {
    comments: async (parent, args) => {
      const esRes = await esClient.search({
        index: "analysis",
        body: {
          query: {
            match_all: {}
          }
        }
      });

      return esRes.hits.hits;
    }
  }
};
