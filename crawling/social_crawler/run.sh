#!/bin/bash

crr_dir=$(echo $PWD)

if [ "$1" = "build" ]
then
    mvn clean package
fi

if [ "$1" = "index" ]
then
    ./es_index.sh
fi

if [ "$1" = "update_analysis_status" ]
then
    ./update_analysis_status.sh
fi

if [ "$1" = "local" ]
then
    storm jar target/social_crawler-1.0-SNAPSHOT.jar  org.apache.storm.flux.Flux --local es-crawl-fb.flux --sleep 864000000
fi

if [ "$1" = "remote" ]
then
    storm jar target/social_crawler-1.0-SNAPSHOT.jar  org.apache.storm.flux.Flux --remote es-crawl-fb.flux
fi