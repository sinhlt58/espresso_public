name: "crawler"

includes:
    - resource: true
      file: "/crawler-default.yaml"
      override: false

    - resource: false
      file: "crawler-conf.yaml"
      override: true

    - resource: false
      file: "es-conf.yaml"
      override: true

spouts:
  - id: "spout"
    className: "com.uet.crawling.social.spout.AggregationSpout"
    parallelism: 1

bolts:
  - id: "fetcher"
    className: "com.uet.crawling.social.bolt.FetcherBolt"
    parallelism: 3

  # - id: "parse"
  #   className: "com.uet.crawling.social.NormalizerBolt"
  #   parallelism: 3

  # - id: "index"
  #   className: "com.uet.crawling.social.RemoveDuplicateBolt"
  #   parallelism: 3

  # - id: "status"
  #   className: "com.uet.crawling.social.IndexerBolt"
  #   parallelism: 3

streams:
  - from: "spout"
    to: "fetcher"
    grouping:
      type: SHUFFLE

  # - from: "fetcher"
  #   to: "parse"
  #   grouping:
  #     type: SHUFFLE

  # - from: "parse"
  #   to: "index"
  #   grouping:
  #     type: SHUFFLE

  # - from: "removeduplicate"
  #   to: "indexer"
  #   grouping:
  #     type: SHUFFLE

  # - from: "indexer"
  #   to: "status"
  #   grouping:
  #     type: SHUFFLE
