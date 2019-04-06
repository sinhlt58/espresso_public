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

if [ "$1" = "inject" ]
then
    cd scripts
    node index.js
    cd $crr_dir
fi

if [ "$1" = "local" ]
then
    storm jar target/social_crawler-1.0-SNAPSHOT.jar  org.apache.storm.flux.Flux --local es-crawl-fb-local.flux --sleep 864000000
fi

if [ "$1" = "remote" ]
then
    storm jar target/social_crawler-1.0-SNAPSHOT.jar  org.apache.storm.flux.Flux --remote es-crawl-fb.flux
fi

if [ "$1" = "cluster" ]
then
    storm jar target/social_crawler-1.0-SNAPSHOT.jar  org.apache.storm.flux.Flux --remote es-crawl-fb-cluster.flux
fi

if [ "$1" = "setup" ]
then
    mkdir -p /espresso_data
    echo "Create Folder /espresso_data"
    echo "Done create!"
fi

if [ "$1" = "remove" ]
then
    rm -f /espresso_data/timeLastGetBrand.db
fi

if [ "$1" = "docker_start" ]
then
    sudo docker-compose up --build -d
fi

if [ "$1" = "docker_submit" ]
then
    sudo docker-compose -f submit-topology.yml up --build
fi

if [ "$1" = "docker_supervisor" ]
then
    sudo docker-compose -f submit-topology.yml up --build
fi