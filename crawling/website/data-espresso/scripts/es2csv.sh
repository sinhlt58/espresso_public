#!/bin/bash
rm -f index.json
elasticdump --input=http://localhost:9200/index --output=./index.json
python3 2csv.py
