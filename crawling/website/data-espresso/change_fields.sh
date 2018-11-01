#!/bin/bash

curl -X DELETE 'http://localhost:9200/_all'
echo "done deleting es databases"
cd scripts
python3 get_config_fields.py
echo "done gen new field configs"
cd ..
./ES_IndexInit.sh
echo "done init new index"