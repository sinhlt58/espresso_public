ESHOST="http://localhost:9200"
ESCREDENTIALS="-u elastic:passwordhere"
index_name=$1

# deletes and recreates a analysis index with a bespoke schema

curl $ESCREDENTIALS -s -XDELETE "$ESHOST/$index_name/" >  /dev/null

echo "Deleted $index_name index"

echo "Creating $index_name index with mapping"

curl $ESCREDENTIALS -s -XPUT $ESHOST/$index_name -H 'Content-Type: application/json' -d '
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