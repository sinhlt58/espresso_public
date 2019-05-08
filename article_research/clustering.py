import json
from sklearn.feature_extraction.text import CountVectorizer
import numpy as np
import utils

class Custering:

    vectorizer = CountVectorizer(ngram_range=(1, 3))

    @classmethod
    def extract_feature(cls, file):
        with open(file, 'r', encoding='utf-8') as f:
            docs = json.load(f)

        print ('Num docs: {}'.format(len(docs)))
        keywords_tags = []
        doc_features = []
        doc_titles = []
        for doc in docs:
            source = doc['_source']
            if 'tags' in source:
                keys = source['tags'].split(',')                
            elif 'keywords' in source:
                keys = source['keywords'].split(',')
            else:
                keys = []
                break

            keys = list(map(lambda t: t.strip(), keys))
            keywords_tags += keys

            doc_features.append(keys)
            doc_titles.append(source['title'])
        
        cls.vectorizer.fit_transform(keywords_tags)
        print(len(cls.vectorizer.get_feature_names()))
        doc_features_vec = []

        debug_idx = 0
        for i, doc_feature in enumerate(doc_features):
            vecs = np.array(cls.vectorizer.transform(doc_feature).toarray())
            if i == debug_idx:
                print (vecs)
            doc_features_vec.append(np.sum(vecs, axis=0).tolist())

        doc_features_vec = np.array(doc_features_vec)
        mask = doc_features_vec[debug_idx] > 0
        print (doc_features_vec[debug_idx][mask])
        print (doc_features[debug_idx])
        print (doc_titles[debug_idx])

        clustering_data = np.array([
            doc_features_vec.tolist(),
            doc_titles
        ])

        f = 'data/clustering_{}'.format(file.split('/')[-1].split('.')[0])
        # utils.write_json_data(f, clustering_data)
        np.save(f, clustering_data)

        print ('Write features to file {}'.format(f))

    @classmethod
    def train(cls, feature_file):
        data = np.load(feature_file, allow_pickle=True)
        features_matrix = data[0]
        titles = data[1]

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description='Helper')
    parser.add_argument('--task', metavar='path', required=True,
                        help='Extract features')

    args = parser.parse_args()

    f = 'article_research_2019-05-01_2019-05-07'

    if args.task == 'ef':
        Custering.extract_feature('data/{}.json'.format(f))
    elif args.task == 'train':
        Custering.train('data/clustering_{}.npy'.format(f))