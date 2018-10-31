#!/bin/bash

cd mklab-socialmedia-abstractions
mvn install
cd ../mklab-stream-manager
mvn install
cd target
java -jar mklab-stream-manager-0.3-SNAPSHOT-with-dependencies.jar
