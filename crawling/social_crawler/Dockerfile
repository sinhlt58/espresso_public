FROM storm

WORKDIR /social_crawler

# copy over the built artifact from the maven image
COPY . /social_crawler

RUN ./run.sh setup; 
#RUN apt-get install curl; ./run.sh index; 

# set the startup command to run your binary
CMD storm jar target/social_crawler-1.0-SNAPSHOT.jar  org.apache.storm.flux.Flux --remote es-crawl-fb-cluster.flux