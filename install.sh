#!/bin/bash

root_dir=$(echo $PWD)

cd $root_dir/libs/storm_crawler
mvn clean package install
cd $root_dir/app_server
mvn clean package
cd $root_dir/crawling/website/data-espresso
mvn clean package
cd $root_dir/crawling/website/puppeteer_server
npm install

