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
    storm jar target/nlp_analytics-1.0-SNAPSHOT.jar  org.apache.storm.flux.Flux --local analytics.local.yaml --sleep 864000000
fi

if [ "$1" = "remote" ]
then
    storm jar target/nlp_analytics-1.0-SNAPSHOT.jar  org.apache.storm.flux.Flux --remote analytics.yaml
fi

if [ "$1" = "nlp_index" ]
then
    ./es_sentiment.sh
fi

if [ "$1" = "nlp_update_sentiment_status" ]
then
    ./update_sentiment.sh
fi

if [ "$1" = "nlp_local" ]
then
    storm jar target/nlp_analytics-1.0-SNAPSHOT.jar  org.apache.storm.flux.Flux --local nlp.local.yaml --sleep 864000000
fi

if [ "$1" = "nlp_remote" ]
then
    storm jar target/nlp_analytics-1.0-SNAPSHOT.jar  org.apache.storm.flux.Flux --remote nlp.yaml
fi