ESHOST="http://localhost:9200"
ESCREDENTIALS="-u elastic:passwordhere"

# deletes and recreates a analysis index with a bespoke schema

curl $ESCREDENTIALS -s -XDELETE "$ESHOST/sentiment/" >  /dev/null

echo "Deleted sentiment index"

echo "Creating sentiment index with mapping"

curl $ESCREDENTIALS -s -XPUT $ESHOST/sentiment -H 'Content-Type: application/json' -d '
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