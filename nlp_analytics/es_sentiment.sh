ESHOST="http://localhost:9200"
ESCREDENTIALS="-u elastic:passwordhere"

# deletes and recreates a analysis index with a bespoke schema

curl $ESCREDENTIALS -s -XDELETE "$ESHOST/v2_sentiment/" >  /dev/null

echo "Deleted v2_sentiment index"

echo "Creating v2_sentiment index with mapping"

curl $ESCREDENTIALS -s -XPUT $ESHOST/v2_sentiment -H 'Content-Type: application/json' -d '
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
	}
}'