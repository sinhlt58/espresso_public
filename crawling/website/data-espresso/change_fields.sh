#!/bin/bash

cd scripts
# python3 get_config_fields.py
echo "done gen new field configs"
cd ..
./ES_IndexInit.sh
echo "done init new index"