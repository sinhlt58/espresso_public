from datetime import datetime
from elasticsearch import Elasticsearch
from datetime import datetime
import json
import io
import time
import utils

es = Elasticsearch("http://103.220.68.79:9200")

def export_article_research(from_date, to_date, domains, PREFIX=''):
    for domain in domains:
        should_domains = [domain]

        if domain == 'all':
            should_domains = domains

        should = [{"term": {"category.keyword": domain}} for domain in should_domains]

        body = {
            "query": {
                "bool": {
                    "must": [
                        {
                            "range": {
                                "google_date_published": {
                                    "gte": from_date,
                                    "lte": to_date
                                }
                            }
                        },
                        {
                            "bool": {
                                "should": should
                            }
                        }
                    ]
                }
            },
            "size": 10000
        }
        print ('Downloading...')
        es_res = es.search(index='article_index_v2', body=body, request_timeout=120)
        hits = es_res['hits']['hits']
        f = '{}data/by_domain/{}_{}_{}.json'.format(PREFIX, domain.replace(' ', '_'), from_date, to_date)
        print ('Exported: {} with {} records'.format(f, len(hits)))
        utils.write_json_data(f, hits)

        time.sleep(2)