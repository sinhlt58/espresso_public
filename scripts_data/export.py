from datetime import datetime
from elasticsearch import Elasticsearch
from datetime import datetime
import json
import io

es = Elasticsearch("http://103.220.68.79:9200")

domain_rules = {
    'thoi_trang_nu': [
        'Thời Trang Nữ',
        'Fashion Girls'
    ],
    'food_kid': [
        'Thực phẩm bổ sung cho trẻ dưới 6 tháng tuổi',
        'Sữa công thức 0-24 tháng tuổi',
        'Sữa trên 24 tháng tuổi',
        'Thực phẩm cho bé từ 6 tháng tuổi',
        'Vitamin, thực phẩm bổ sung và đồ dùng cho mẹ',
        'Dinh dưỡng cho bé',
        'Mother & Baby Feeding'
    ],
    'motor_car': [
        'Ô tô - xe máy - xe đạp',
        'Ô Tô - Xe Máy - Xe Đạp',
        'Motors'
    ]
}

def write_json_data(path, data):
    with io.open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False)

def to_readable_date(ts):
    return datetime.utcfromtimestamp(ts/1000).strftime('%Y-%m-%d_%H:%M:%S')

def to_wildcard(rules):
    return [{'wildcard': {'parentBreadcrumb.keyword': '*{}*'.format(rule)}} for rule in rules]

def get_reviews_data(buckets):
    res = []
    for bucket in buckets:
        rate_count = 5*[0]
        review_data = {
            'content': bucket['key'],
            'count': bucket['doc_count'],
            'rate_count': rate_count,
            'most_rate': 5
        }
        for star_bucket in bucket['rate_count']['buckets']:
            rate_count[int(star_bucket['key']) - 1] = star_bucket['doc_count']
        review_data['most_rate'] = rate_count.index(max(rate_count)) + 1
        review_data['rate_count']

        res.append(review_data)
    return res

MAX_AGG = 30000
def export_by_domain(domain, stars, start_time, end_time, amout=5):
    should = to_wildcard(domain_rules[domain])
    stars_should = [{'term': {'rate': str(star)}} for star in stars]
    
    print ("Downloading data...")
    body = {
        "size": amout,
        "query": {
            "bool": {
                "must": [
                    {
                        "bool": {
                            "should": should
                        }
                    },
                    {
                        "term": {
                            "itemType.keyword": {
                                "value": "review"
                            }
                        }
                    },
                    {
                        "bool": {
                            "should": stars_should
                        }
                    },
                    {
                        "range": {
                            "crawlTime": {
                                "gte": start_time,
                                "lte": end_time
                            }
                        }
                    }
                ]
            }
        },
        "aggs": {
            "unique_reviews_num": {
                "cardinality": {
                    "field": "content.keyword"
                }
            },
            "unique_reviews_content": {
                "terms": {
                    "field": "content.keyword",
                    "size": MAX_AGG
                },
                "aggs": {
                    "rate_count": {
                        "terms": {
                            "field": "rate",
                            "size": 5
                        }
                    }
                }
            }
        }
    }
    # print ('Done downloading.')

    es_res = es.search(index='v2_analysis', body=body, request_timeout=120)
    es_res_agg = es_res['aggregations']

    start_date = to_readable_date(start_time)
    end_date = to_readable_date(end_time)
    res = {
        'Start date': start_date,
        'End date': end_date,
        'Total reviews': es_res['hits']['total'],
        'Total unique reviews': es_res_agg['unique_reviews_num']['value'],
        'Data': get_reviews_data(es_res_agg['unique_reviews_content']['buckets'])
    }

    f = '{}_reviews_{}_{}'.format(domain, start_date, end_date)
    write_json_data(f, res)
    print ('Exported to file: {}'.format(f))

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description='Helper')
    parser.add_argument('--domain', metavar='path', required=True,
                        help='The domain name in this list [thoi_trang_nu, food_kid]')
    parser.add_argument('--stars', metavar='path', required=True,
                        help='The stars in reviews')
    parser.add_argument('--start_time', metavar='path', required=True,
                        help='Start timestamp')
    parser.add_argument('--end_time', metavar='path', required=True,
                        help='End timestamp')
    args = parser.parse_args()

    stars = [int(star) for star in args.stars.split(',')]

    export_by_domain(args.domain, stars, int(args.start_time), int(args.end_time))