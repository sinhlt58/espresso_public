ESHOST="http://localhost:9200"
ESCREDENTIALS="-u elastic:passwordhere"

# deletes and recreates a status index with a bespoke schema

curl $ESCREDENTIALS -s -XDELETE "$ESHOST/v2_status/" >  /dev/null

echo "Deleted v2_status index"

# http://localhost:9200/status/_mapping/status?pretty

echo "Creating v2_status index with mapping"

curl $ESCREDENTIALS -s -XPUT $ESHOST/v2_status -H 'Content-Type: application/json' -d '
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
		"v2_status": {
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

curl $ESCREDENTIALS -s -XDELETE "$ESHOST/v2_metrics*/" >  /dev/null

echo ""
echo "Deleted v2_metrics index"

echo "Creating metrics index with mapping"

# http://localhost:9200/metrics/_mapping/status?pretty
curl $ESCREDENTIALS -s -XPOST $ESHOST/_template/storm-metrics-template -H 'Content-Type: application/json' -d '
{
  "template": "v2_metrics*",
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

curl $ESCREDENTIALS -s -XDELETE "$ESHOST/v2_index*/" >  /dev/null

echo ""
echo "Deleted docs v2_index"

echo "Creating docs v2_index with mapping"

curl $ESCREDENTIALS -s -XPUT $ESHOST/v2_index -H 'Content-Type: application/json' -d @scripts/es_index_mapping.json