#!/bin/bash

root_dir=$(echo $PWD)

if [ "$1" = "crawl" ]
then
    cd $root_dir/crawling/website/data-espresso
    curl -X DELETE 'http://localhost:9200/_all'
    ./ES_IndexInit.sh
    storm jar target/data-espresso-1.0-SNAPSHOT.jar  org.apache.storm.flux.Flux --local es-injector.flux --sleep 30000
    storm jar target/data-espresso-1.0-SNAPSHOT.jar  org.apache.storm.flux.Flux --local es-crawler.flux --sleep 86400000
fi
