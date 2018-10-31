ESHOST="http://localhost:9200"
ESCREDENTIALS="-u elastic:passwordhere"

# deletes and recreates a status index with a bespoke schema

curl $ESCREDENTIALS -s -XDELETE "$ESHOST/status/" >  /dev/null

echo "Deleted status index"

# http://localhost:9200/status/_mapping/status?pretty

echo "Creating status index with mapping"

curl $ESCREDENTIALS -s -XPUT $ESHOST/status -H 'Content-Type: application/json' -d '
{
	"settings": {
		"index": {
			"number_of_shards": 10,
			"number_of_replicas": 1,
			"refresh_interval": "5s"
		}
	},
	"mappings": {
		"status": {
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

curl $ESCREDENTIALS -s -XDELETE "$ESHOST/metrics*/" >  /dev/null

echo ""
echo "Deleted metrics index"

echo "Creating metrics index with mapping"

# http://localhost:9200/metrics/_mapping/status?pretty
curl $ESCREDENTIALS -s -XPOST $ESHOST/_template/storm-metrics-template -H 'Content-Type: application/json' -d '
{
  "template": "metrics*",
  "settings": {
    "index": {
      "number_of_shards": 1,
      "refresh_interval": "30s"
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

curl $ESCREDENTIALS -s -XDELETE "$ESHOST/index*/" >  /dev/null

echo ""
echo "Deleted docs index"

echo "Creating docs index with mapping"

curl $ESCREDENTIALS -s -XPUT $ESHOST/index -H 'Content-Type: application/json' -d '
{
	"settings": {
		"index": {
			"number_of_shards": 5,
			"number_of_replicas": 1,
			"refresh_interval": "60s"
		}
	},
	"mappings": {
		"doc": {
			"_source": {
				"enabled": false
			},
			"properties": {
				"content": {
					"type": "text",
					"index": "true",
					"store": true
				},
				"host": {
					"type": "keyword",
					"index": "true",
					"store": true
				},
				"title": {
					"type": "text",
					"index": "true",
					"store": true
				},
				"url": {
					"type": "keyword",
					"index": "true",
					"store": true
				},
				"domain": {
					"type": "keyword",
					"index": "true",
					"store": true
				},
				"keywords": {
					"type": "text",
					"index": "true",
					"store": true
				},
				"description": {
					"type": "text",
					"index": "true",
					"store": true
				},
				"tieu_de": {
					"type": "text",
					"index": "true",
					"store": true
				},
				"gia": {
					"type": "text",
					"index": "true",
					"store": true
				},
				"quan_huyen": {
					"type": "text",
					"index": "true",
					"store": true
				},
				"so_phong": {
					"type": "text",
					"index": "true",
					"store": true
				},
				"dien_tich": {
					"type": "text",
					"index": "true",
					"store": true
				},
				"mieu_ta": {
					"type": "text",
					"index": "true",
					"store": true
				},
				"ngay_dang": {
					"type": "text",
					"index": "true",
					"store": true
				},
				"ngay_cap_nhat": {
					"type": "text",
					"index": "true",
					"store": true
				}
			}
		}
	}
}'

