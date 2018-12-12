import Elasticsearch from "elasticsearch";

export const esClient = Elasticsearch.Client({
  host: "http://103.220.68.79:9200/"
});
