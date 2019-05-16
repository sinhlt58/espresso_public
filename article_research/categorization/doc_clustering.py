import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer, HashingVectorizer, TfidfTransformer
from sklearn.naive_bayes import MultinomialNB
from sklearn.svm import SVC, LinearSVC
from sklearn.linear_model import SGDClassifier
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import accuracy_score
from pyvi.ViTokenizer import tokenize as vi_tokenize
#import matplotlib.pyplot as plt
import io, sys, pickle

def load_data(path, is_vi=False):
	with io.open(path, "r", encoding="utf-8") as data_file:
		data = [line.split("\t") for line in data_file.readlines()]
	labels, titles, descriptions, full_texts = zip(*data)
	labels = list(labels)
	features = list(full_texts)
	return features, labels

def create_feature_extractor(count_mode):
	if(count_mode == "default"):
		module_counter = TfidfVectorizer(max_features=100000) #ngram_range=(2,3), 
		return module_counter, None
	elif(count_mode == "hash"):
		module_counter = HashingVectorizer(n_features=100000, ngram_range=(2, 3))
		module_extra = TfidfTransformer()
		return module_counter, module_extra
	else:
		raise ValueError("count_mode unacceptable: {:s}".format(count_mode))

def create_classifier(structure):
	if(structure == "naive_bayes"):
		module_classifier = MultinomialNB()
	elif(structure == "svm"):
		module_classifier = SVC(verbose=True)
	elif(structure == "linear_svm"):
		module_classifier = LinearSVC(verbose=10, max_iter=1000)
	elif(structure == "linear_sgd"):
		module_classifier = SGDClassifier(verbose=10)
	else:
		raise ValueError("structure unacceptable: {:s}".format(structure))
	return module_classifier

if __name__ == "__main__":
	mode, count_mode = sys.argv[1:3]
	train_features, train_labels = load_data("Data/espresso/article_v1/train.tsv")
	eval_features, eval_labels = load_data("Data/espresso/article_v1/dev.tsv")
	# convert related labels into linear_svc compatible
	labels = LabelEncoder().fit(train_labels)
	train_labels = labels.transform(train_labels)
	eval_labels = labels.transform(eval_labels)
	print("Data loaded and labels transformed. List labels: {}".format(labels.classes_))
	# use tf-idf to create ngram/vocab out of the features, and then fit it on multinomial Naive Bayes
	module_counter, module_extra = create_feature_extractor(count_mode)
	# fit and transform train, only transform eval
	X_train_tfidf = module_counter.fit_transform(train_features)
	if(module_extra is not None):
		X_train_tfidf = module_extra.fit_transform(X_train_tfidf)
	X_eval_tfidf = module_counter.transform(eval_features)
	if(module_extra is not None):
		X_eval_tfidf = module_extra.transform(X_eval_tfidf)
	if(mode == "svm" or mode == "linear_svm"):
		# also, svm apparently need scaling
		scaler = StandardScaler(with_mean=False)
		scaler.fit(X_train_tfidf)
		X_train_tfidf = scaler.transform(X_train_tfidf)
		X_eval_tfidf = scaler.transform(X_eval_tfidf)
		print("Scaling data for svm done.")
	print("Fit+transform features complete, shape: ", X_train_tfidf.shape)
	module_classifier = create_classifier(mode)
	module_classifier = module_classifier.fit(X_train_tfidf, train_labels)
	print("Train with labels complete.")
	# use the built model to perform on the test
	eval_predictions = module_classifier.predict(X_eval_tfidf)
	# calculate the accuracy using labels
	print("Prediction shape: ", np.shape(eval_predictions), np.shape(eval_labels))
	accuracy = np.mean(eval_predictions == eval_labels)
	print("Accuracy score(manual): ", accuracy)
	accuracy = accuracy_score(eval_labels, eval_predictions)
	print("Accuracy score(sklearn): ", accuracy)
	pickle_path = "Data/espresso/model_{:s}.pickle".format(mode)
	with io.open(pickle_path, "wb") as pickle_file:
		pickle.dump((labels, module_counter, module_classifier), pickle_file)
	pickle_data_path = "Data/espresso/data.pickle"
	with io.open(pickle_data_path, "wb") as pickle_file:
		pickle.dump( (X_train_tfidf, X_eval_tfidf) , pickle_file)
	print("")
