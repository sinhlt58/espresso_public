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

echo "Change analysis_status for all documents in index"

curl $ESCREDENTIALS -s -XPOST $ESHOST/index/_update_by_query?conflicts=proceed -H 'Content-Type: application/json' -d '
{
	"script": {
    	"source": "ctx._source[\"analysis_status\"] = \"_done\""
  	}
}'