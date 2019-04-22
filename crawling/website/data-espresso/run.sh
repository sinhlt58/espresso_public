#!/bin/bash

crr_dir=$(echo $PWD)

if [ "$1" = "index" ]
then
    ./change_fields.sh
fi

if [ "$1" = "index_article" ]
then
    ./ES_Article_IndexInit.sh
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

if [ "$1" = "inject_article" ]
then
    storm jar target/data-espresso-1.0-SNAPSHOT.jar  org.apache.storm.flux.Flux --local es-injector-article.flux --sleep 30000
fi

if [ "$1" = "crawl" ]
then
    storm jar target/data-espresso-1.0-SNAPSHOT.jar  org.apache.storm.flux.Flux --local es-crawler.local.flux --sleep 864000000
fi

if [ "$1" = "local_remote" ]
then
    storm jar target/data-espresso-1.0-SNAPSHOT.jar  org.apache.storm.flux.Flux --remote es-crawler.local.flux
fi

if [ "$1" = "remote" ]
then
    storm jar target/data-espresso-1.0-SNAPSHOT.jar  org.apache.storm.flux.Flux --remote es-crawler.flux
fi

if [ "$1" = "remote_local" ]
then
    storm jar target/data-espresso-1.0-SNAPSHOT.jar  org.apache.storm.flux.Flux --local es-crawler.flux --sleep 86400000
fi

if [ "$1" = "cluster" ]
then
    storm jar target/data-espresso-1.0-SNAPSHOT.jar  org.apache.storm.flux.Flux --remote es-crawler.cluster.flux --sleep 86400000
fi

if [ "$1" = "article_local" ]
then
    storm jar target/data-espresso-1.0-SNAPSHOT.jar  org.apache.storm.flux.Flux --local es-crawler-article.local.flux --sleep 86400000
fi

if [ "$1" = "article_remote" ]
then
    storm jar target/data-espresso-1.0-SNAPSHOT.jar  org.apache.storm.flux.Flux --remote es-crawler-article.local.flux
fi

if [ "$1" = "submit_article" ]
then
    sudo docker-compose -f submit-article-topo.yml up --build
fi

if [ "$1" = "patch" ]
then
    cd ../../../scripts
    ./up_submodules.sh apply_patches
    cd $crr_dir
fi

if [ "$1" = "update_specs" ]
then
   cd ../../../scripts
    ./up_submodules.sh update_libs_spec_code
    cd $crr_dir
fi

mongo_host=localhost:27017/crawling_rules
if [ "$1" = "importMongo" ]
then
    cd ./scripts
    node initMongodb.js
    mongo $mongo_host domain.js
    mongo $mongo_host jsRender.js
    mongo $mongo_host legalUrl.js
    cd $crr_dir
fi
