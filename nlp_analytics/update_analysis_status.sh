ESHOST="http://localhost:9200"
ESCREDENTIALS="-u elastic:passwordhere"
index_name=$1
status_field_name=$2
status_done_value=$3

echo "Change $status_field_name field for to $status_done_value all documents in $index_name"

curl $ESCREDENTIALS -s -XPOST $ESHOST/$index_name/_update_by_query?conflicts=proceed -H 'Content-Type: application/json' -d '
{
	"script": {
    	"source": "ctx._source[\"'$status_field_name'\"] = \"'$status_done_value'\""
  	}
}'