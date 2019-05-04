ESHOST="http://localhost:9200"
ESCREDENTIALS="-u elastic:passwordhere"

# deletes and recreates a status index with a bespoke schema

curl $ESCREDENTIALS -s -XDELETE "$ESHOST/article_status_v2/" >  /dev/null

echo "Deleted article_status_v2 index"

# http://localhost:9200/status/_mapping/status?pretty

echo "Creating article_status_v2 index with mapping"

curl $ESCREDENTIALS -s -XPUT $ESHOST/article_status_v2 -H 'Content-Type: application/json' -d '
{
	"settings": {
		"index": {
			"number_of_shards": 10,
			"number_of_replicas": 1,
			"refresh_interval": "5s",
      "blocks": {
        "read_only_allow_delete": "false"
      }
		}
	},
	"mappings": {
		"article_status_v2": {
			"dynamic_templates": [{
				"metadata": {
					"path_match": "metadata.*",
					"match_mapping_type": "string",
					"mapping": {
						"type": "keyword"
					}
				}
			}],
			"_source": {
				"enabled": true
			},
			"properties": {
				"nextFetchDate": {
					"type": "date",
					"format": "dateOptionalTime"
				},
				"status": {
					"type": "keyword"
				},
				"url": {
					"type": "keyword"
				}
			}
		}
	}
}'

# deletes and recreates a status index with a bespoke schema

curl $ESCREDENTIALS -s -XDELETE "$ESHOST/article_metrics_v2/" >  /dev/null

echo ""
echo "Deleted article_metrics_v2 index"

echo "Creating metrics index with mapping"

# http://localhost:9200/metrics/_mapping/status?pretty
curl $ESCREDENTIALS -s -XPOST $ESHOST/_template/storm-metrics-template -H 'Content-Type: application/json' -d '
{
  "template": "article_metrics_v2",
  "settings": {
    "index": {
      "number_of_shards": 1,
      "refresh_interval": "30s",
      "blocks": {
        "read_only_allow_delete": "false"
      }
    },
    "number_of_replicas" : 0
  },
  "mappings": {
    "datapoint": {
      "_source":         { "enabled": true },
      "properties": {
          "name": {
            "type": "keyword"
          },
          "srcComponentId": {
            "type": "keyword"
          },
          "srcTaskId": {
            "type": "long"
          },
          "srcWorkerHost": {
            "type": "keyword"
          },
          "srcWorkerPort": {
            "type": "long"
          },
          "timestamp": {
            "type": "date",
            "format": "dateOptionalTime"
          },
          "value": {
            "type": "double"
          }
      }
    }
  }
}'

# deletes and recreates a doc index with a bespoke schema

curl $ESCREDENTIALS -s -XDELETE "$ESHOST/article_index_v2/" >  /dev/null

echo ""
echo "Deleted docs article_index_v2"

echo "Creating docs article_index_v2 with mapping"

curl $ESCREDENTIALS -s -XPUT $ESHOST/article_index_v2 -H 'Content-Type: application/json' -d @scripts/es_index_mapping.json