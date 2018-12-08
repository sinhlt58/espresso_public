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

if [ "$1" = "local" ]
then
    storm jar target/nlp_analytics-1.0-SNAPSHOT.jar  org.apache.storm.flux.Flux --local analytics.yaml --sleep 864000000
fi

if [ "$1" = "remote" ]
then
    storm jar target/nlp_analytics-1.0-SNAPSHOT.jar  org.apache.storm.flux.Flux --remote analytics.yaml
fi