import json
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.cluster import MeanShift, DBSCAN, Birch
import numpy as np
import utils
import export
import pickle
import time
import pandas

PREFIX = '/media/sinhblack/Media1/works/article_research/'

class Custering:

    vectorizer = CountVectorizer(ngram_range=(1, 3))

    @classmethod
    def _extract_keys(cls, doc):
        source = doc['_source']

        if 'tags' in source:
            keys = source['tags'].split(',')                
        elif 'keywords' in source:
            keys = source['keywords'].split(',')
        else:
            keys = []

        # keys.append(source['title'])

        keys = list(map(lambda t: t.strip(), keys))
        
        return keys

    @classmethod
    def _doc_to_features(cls, doc, vectorizer):
        keys = cls._extract_keys(doc)
        vecs = np.array(vectorizer.transform(keys).toarray())
        features = np.sum(vecs, axis=0).tolist()

        return features

    @classmethod
    def _docs_to_features_vecs(cls, docs, vectorizer):
        vecs = []
        for doc in docs:
            vecs.append(cls._doc_to_features(doc, vectorizer))
        return vecs

    @classmethod
    def extract_feature(cls, file):
        with open(file, 'r', encoding='utf-8') as f:
            docs = json.load(f)

        print ('Num docs: {}'.format(len(docs)))
        keywords_tags = []

        for doc in docs:
            keys = cls._extract_keys(doc)
            keywords_tags += keys
        
        cls.vectorizer.fit_transform(keywords_tags)
        print(len(cls.vectorizer.get_feature_names()))
        doc_features_vec = []

        debug_idx = 0
        for doc in docs:
            feature_vec = cls._doc_to_features(doc, cls.vectorizer)
            doc_features_vec.append(feature_vec)

        doc_features_vec = np.array(doc_features_vec)
        mask = doc_features_vec[debug_idx] > 0
        print (doc_features_vec[debug_idx][mask])
        print (cls._extract_keys(docs[0]))

        fn = file.split('/')[-1].split('.')[0]

        f = '{}data/clustering_vectorizer_{}.pkl'.format(PREFIX, fn)
        pickle.dump(cls.vectorizer, open(f, 'wb'))

        print ('Write vectorizer to file {}'.format(fn))

    @classmethod
    def train(cls, from_date, to_date, domains, train_configs):
        vectorizer_file = '{}data/clustering_vectorizer_all_{}_{}.pkl'.format(PREFIX, from_date, to_date)
        vectorizer = pickle.load(open(vectorizer_file, 'rb'))

        # We train each domain with each algorithm
        # Total number of models = len(domains) * num_algorithm

        headers = ['Domain', 'Number doc', 'Algorithm', 'Time train (s)']
        frame_data = []

        for domain in domains:
            data_file = '{}data/by_domain/{}_{}_{}.json'.format(PREFIX, domain.replace(' ', '_'), from_date, to_date)
            with open(data_file, 'r', encoding='utf-8') as f:
                docs = json.load(f)
            X = np.array(cls._docs_to_features_vecs(docs, vectorizer))

            print ('Domain {}, X shape is {}'.format(domain, X.shape))

            for alg in train_configs['algorithms']:
                options = train_configs[alg]
                model = train_configs['class_map'][alg](**options)

                start_time = time.time()
                print ('Train domain {} with algorithm {}'.format(domain, alg))
                model.fit(X)
                duration = time.time() - start_time
                print ('Training took {} s'.format(duration))

                model_file_name = '{}data/models/{}_{}_{}_{}.pkl'.format(PREFIX, domain, from_date, to_date, alg)
                pickle.dump(model, open(model_file_name, 'wb'))
                print ('Saved model to file {}'.format(model_file_name))
                
                frame_data.append([domain, X.shape[0], alg, duration])

        frame_data = np.array(frame_data)
        df = pandas.DataFrame({
            header: frame_data[:, idx].tolist() for idx, header in enumerate(headers) 
        }, columns=headers)
        
        report_file = '{}data/report_{}_{}.csv'.format(PREFIX, from_date, to_date)
        df.to_csv(report_file, index=None, header=True, encoding='utf-8')
        print ('Write report to file {}'.format(report_file))

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description='Helper')
    parser.add_argument('--task', metavar='path', required=True,
                        help='Extract features')

    args = parser.parse_args()

    from_date = '2019-05-01'
    to_date = '2019-05-12'
    domains = [
        'Thế giới',
        'Thể thao',
        'Kinh doanh',
        'Xã hội',
        'Chính trị',
        'Giáo dục',
        'Pháp luật',
        'Khoa học',
        'all'
    ]
    train_configs = {
        'algorithms': ['mean_shift', 'dbscan'],
        # 'algorithms': ['birch'],
        'mean_shift': {
            'bandwidth': 8,
            'n_jobs': 4
        },
        'dbscan': {
            'eps': 8,
            'min_samples': 2,
            'n_jobs': 4
        },
        'birch': {
            'branching_factor': 40,
            'n_clusters': None,
            'threshold': 0.6,
            'compute_labels': True
        },
        'class_map': {
            'mean_shift': MeanShift,
            'dbscan': DBSCAN,
            'birch': Birch
        }
    }

    feature_file = 'all_{}_{}'.format(from_date, to_date)

    if args.task == 'ef':
        Custering.extract_feature('{}data/by_domain/{}.json'.format(PREFIX, feature_file))
    elif args.task == 'train':
        Custering.train(from_date, to_date, domains, train_configs)
    elif args.task == 'get_data':
        export.export_article_research(from_date, to_date, domains, PREFIX)