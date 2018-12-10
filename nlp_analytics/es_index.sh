ESHOST="http://localhost:9200"
ESCREDENTIALS="-u elastic:passwordhere"

# deletes and recreates a analysis index with a bespoke schema

curl $ESCREDENTIALS -s -XDELETE "$ESHOST/analysis/" >  /dev/null

echo "Deleted analysis index"

echo "Creating analysis index with mapping"

curl $ESCREDENTIALS -s -XPUT $ESHOST/analysis -H 'Content-Type: application/json' -d '
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