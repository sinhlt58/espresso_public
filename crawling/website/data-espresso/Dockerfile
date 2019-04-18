
FROM storm

WORKDIR /article_crawler

# copy over the built artifact from the maven image
COPY . /article_crawler

# set the startup command to run your binary
CMD storm jar target/data-espresso-1.0-SNAPSHOT.jar  org.apache.storm.flux.Flux --remote es-crawler-article.local.flux