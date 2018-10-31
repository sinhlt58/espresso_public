#!/bin/bash

root_dir=$(echo $PWD)

if [ "$1" = "libs" ]
then
    cd $root_dir/libs/storm_crawler
    mvn clean package install
fi

if [ "$1" = "crawl" ]
then
    cd $root_dir/crawling/website/data-espresso
    mvn clean package
fi
