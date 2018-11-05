#!/bin/bash

crr_dir=$(echo $PWD)

if [ "$1" = "index" ]
then
    ./change_fields.sh
fi

if [ "$1" = "add_host" ]
then
    cd scripts
    python3 get_config_fields.py
    cd ..
fi

if [ "$1" = "build" ]
then
    mvn clean package
fi

if [ "$1" = "build_libs" ]
then
    cd ../../../libs/storm_crawler
    mvn clean package install
    cd $crr_dir
fi

if [ "$1" = "inject" ]
then
    storm jar target/data-espresso-1.0-SNAPSHOT.jar  org.apache.storm.flux.Flux --local es-injector.flux --sleep 30000
fi

if [ "$1" = "crawl" ]
then
    storm jar target/data-espresso-1.0-SNAPSHOT.jar  org.apache.storm.flux.Flux --local es-crawler.flux --sleep 864000000
fi

if [ "$1" = "remote" ]
then
    storm jar target/data-espresso-1.0-SNAPSHOT.jar  org.apache.storm.flux.Flux --remote es-crawler.flux
fi
