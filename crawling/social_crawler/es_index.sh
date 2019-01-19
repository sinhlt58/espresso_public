ESHOST="http://localhost:9200"
ESCREDENTIALS="-u elastic:passwordhere"

# deletes and recreates a fb_status index with a bespoke schema

curl $ESCREDENTIALS -s -XDELETE "$ESHOST/fb_status/" >  /dev/null

echo "Deleted fb_status index"

# http://localhost:9200/fb_status/_mapping/status?pretty

echo "Creating fb_status index with mapping"

curl $ESCREDENTIALS -s -XPUT $ESHOST/fb_status -H 'Content-Type: application/json' -d '
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
		"_doc": {
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
				"node": {
					"type": "keyword"
				}
			}
		}
	}
}'

# deletes and recreates a doc index with a bespoke schema

curl $ESCREDENTIALS -s -XDELETE "$ESHOST/fb_index/" >  /dev/null

echo "Deleted docs fb_index"

echo "Creating docs fb_index with mapping"

curl $ESCREDENTIALS -s -XPUT $ESHOST/fb_index -H 'Content-Type: application/json' -d '
{
    "settings": {
        "index": {
            "number_of_shards": 10,
            "number_of_replicas": 0,
            "refresh_interval": "10s",
            "blocks": {
                "read_only_allow_delete": "false"
            }
        }
    }
}'