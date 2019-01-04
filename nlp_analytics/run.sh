#!/bin/bash

crr_dir=$(echo $PWD)

if [ "$1" = "build" ]
then
    mvn clean package
fi

# Analysis from crawling data START
if [ "$1" = "index" ]
then
    ./es_index.sh v2_analysis
fi

if [ "$1" = "reset_analysis_status" ]
then
    ./update_analysis_status.sh v2_index analysis_status _done
fi

if [ "$1" = "local" ]
then
    storm jar target/nlp_analytics-1.0-SNAPSHOT.jar  org.apache.storm.flux.Flux --local analytics.local.yaml --sleep 864000000
fi

if [ "$1" = "remote" ]
then
    storm jar target/nlp_analytics-1.0-SNAPSHOT.jar  org.apache.storm.flux.Flux --remote analytics.yaml
fi
# Analysis from crawling data END

# Sentiment nlp START
if [ "$1" = "sentiment_index" ]
then
    ./es_index.sh v2_sentiment
fi

if [ "$1" = "reset_sentiment_status" ]
then
    ./update_analysis_status.sh v2_analysis sentiment_status _done
fi

if [ "$1" = "sentiment_local" ]
then
    storm jar target/nlp_analytics-1.0-SNAPSHOT.jar  org.apache.storm.flux.Flux --local sentiment.local.yaml --sleep 864000000
fi

if [ "$1" = "sentiment_remote" ]
then
    storm jar target/nlp_analytics-1.0-SNAPSHOT.jar  org.apache.storm.flux.Flux --remote sentiment.yaml
fi
# Sentiment nlp END

# Vocabulary nlp START
if [ "$1" = "vocabulary_index" ]
then
    ./es_index.sh v2_vocabulary
fi

if [ "$1" = "reset_vocabulary_status" ]
then
    ./update_analysis_status.sh v2_analysis vocabulary_status _done
fi

if [ "$1" = "vocabulary_local" ]
then
    storm jar target/nlp_analytics-1.0-SNAPSHOT.jar  org.apache.storm.flux.Flux --local vocabulary.local.yaml --sleep 864000000
fi

if [ "$1" = "vocabulary_remote" ]
then
    storm jar target/nlp_analytics-1.0-SNAPSHOT.jar  org.apache.storm.flux.Flux --remote vocabulary.yaml
fi
# Vocabulary nlp END

if [ "$1" = "build_libs" ]
then
    cd ../libs/VnCoreNLP
    mvn clean package install
    cd $crr_dir
fi