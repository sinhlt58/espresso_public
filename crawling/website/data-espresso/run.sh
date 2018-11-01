#!/bin/bash

if [ "$1" = "index" ]
then
    ./change_fields.sh
fi

if [ "$1" = "build" ]
then
    mvn clean package
fi

if [ "$1" = "inject" ]
then
    storm jar target/data-espresso-1.0-SNAPSHOT.jar  org.apache.storm.flux.Flux --local es-injector.flux
fi

if [ "$1" = "crawl" ]
then
    storm jar target/data-espresso-1.0-SNAPSHOT.jar  org.apache.storm.flux.Flux --local es-crawler.flux --sleep 864000000
fi

if [ "$1" = "remote" ]
then
    storm jar target/data-espresso-1.0-SNAPSHOT.jar  org.apache.storm.flux.Flux --remote es-crawler.flux
fi