name: "v1_3_fb_crawler"

includes:
  - resource: false
    file: "crawler-default.yaml"
    override: false

  - resource: false
    file: "crawler-conf.yaml"
    override: true

  - resource: false
    file: "es-conf.yaml"
    override: true

spouts:
  - id: "spout"
    className: "com.uet.crawling.social.elasticsearch.persistence.AggregationSpout"
    parallelism: 1

  - id: "brand"
    className: "com.uet.crawling.social.elasticsearch.persistence.AggregationBrandSpout"
    parallelism: 1

bolts:
  - id: "fetcher"
    className: "com.uet.crawling.social.bolt.FetcherBolt"
    parallelism: 1

  - id: "discover"
    className: "com.uet.crawling.social.bolt.NodesDiscoverBolt"
    parallelism: 1

  - id: "indexer"
    className: "com.uet.crawling.social.elasticsearch.bolt.IndexerBolt"
    parallelism: 1

  - id: "status"
    className: "com.uet.crawling.social.elasticsearch.persistence.StatusUpdaterBolt"
    parallelism: 1

  # uncomment if need delete Status.Error
  #- id: "deletion"
  #  className: "com.uet.crawling.social.elasticsearch.bolt.DeletionBolt"
  #  parallelism: 1

streams:
  - from: "spout"
    to: "fetcher"
    grouping:
      type: SHUFFLE
  
  - from: "brand"
    to: "status"
    grouping:
      type: SHUFFLE

  - from: "fetcher"
    to: "discover"
    grouping:
      type: LOCAL_OR_SHUFFLE

  - from: "discover"
    to: "indexer"
    grouping:
      type: LOCAL_OR_SHUFFLE

  - from: "indexer"
    to: "status"
    grouping:
      type: FIELDS
      args: ["node"]
      streamId: "status"

  - from: "discover"
    to: "status"
    grouping:
      type: FIELDS
      args: ["node"]
      streamId: "status"

  - from: "fetcher"
    to: "status"
    grouping:
      type: FIELDS
      args: ["node"]
      streamId: "status"
    
  # uncomment if need delete Status.Error
  #- from: "status"
  #  to: "deletion"
  #  grouping:
  #    type: FIELDS
  #    args: ["node"]
  #    streamId: "deletion"
