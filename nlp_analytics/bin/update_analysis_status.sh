ESHOST="http://localhost:9200"
ESCREDENTIALS="-u elastic:passwordhere"

echo "Change analysis_status for all documents in index"

curl $ESCREDENTIALS -s -XPOST $ESHOST/index/_update_by_query?conflicts=proceed -H 'Content-Type: application/json' -d '
{
	"script": {
    	"source": "ctx._source[\"analysis_status\"] = \"_done\""
  	}
}'