ESHOST="http://localhost:9200"
ESCREDENTIALS="-u elastic:passwordhere"

echo "Change analysis_status for all documents in analysis"

curl $ESCREDENTIALS -s -XPOST $ESHOST/v2_analysis/_update_by_query?conflicts=proceed -H 'Content-Type: application/json' -d '
{
	"script": {
    	"source": "ctx._source[\"analysis_status\"] = \"_done\""
  	}
}'